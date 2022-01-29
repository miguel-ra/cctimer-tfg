import clsx from "clsx";
import { HTMLAttributes, memo, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

import { useScramble, useSelectedItem } from "features/timer/timerViewModel";

type PressableProps = {
  children: ReactNode;
  className?: string;
  onPointerDown?: (event: MouseEvent | TouchEvent) => void;
  onPointerUp?: (event: MouseEvent | TouchEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => boolean;
  onKeyUp?: (event?: KeyboardEvent) => boolean;
  bind?: () => void;
  preventOutsideClicks?: boolean;
} & HTMLAttributes<HTMLElement>;

const useStyles = createUseStyles({
  root: {
    userSelect: "none",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
  },
});

function Pressable({
  children,
  className,
  onPointerDown,
  onPointerUp,
  onKeyDown,
  onKeyUp,
  bind,
  preventOutsideClicks,
  ...props
}: PressableProps) {
  const [pressed, setPressed] = useState(false);
  const pressedRef = useRef(pressed);
  const domContainer = useRef<HTMLDivElement | null>(null);
  const preventOutsideClicksRef = useRef(preventOutsideClicks);
  const classes = useStyles();
  const { scramble } = useScramble();
  const { selectedItem } = useSelectedItem();

  const loading = !selectedItem || !scramble.puzzleKey;

  // State is used to force a render and ref to avoid adding/removing the listeners everytime that it changes
  // I do not use a useEffect to update the ref because in slow machines if a user stoped and started fast it would cause unexpected behaviours
  const setPressedAndRef = useCallback((value) => {
    setPressed(value);
    pressedRef.current = value;
  }, []);

  useEffect(() => {
    preventOutsideClicksRef.current = preventOutsideClicks;
  }, [preventOutsideClicks]);

  useEffect(() => {
    if (loading || (!onKeyDown && !onKeyUp)) {
      return;
    }

    function keyDownHandler(event: KeyboardEvent) {
      if (window.location.hash) {
        return;
      }
      const activeElement = document.activeElement as HTMLElement;
      if (event.repeat || ![document.body, domContainer.current].includes(activeElement)) {
        if (document.body.classList.contains("mousedown") && event.key === " ") {
          activeElement.blur();
          event.preventDefault();
          event.stopPropagation();
        } else {
          return;
        }
      }
      const isPressed = onKeyDown?.(event) || false;
      setPressedAndRef(isPressed);
    }

    function keyUpHandler(event: KeyboardEvent) {
      if (!pressedRef.current) {
        return;
      }
      onKeyUp?.(event);
      setPressedAndRef(false);
    }

    window.addEventListener("keydown", keyDownHandler, true);
    window.addEventListener("keyup", keyUpHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler, true);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [loading, onKeyDown, onKeyUp, setPressedAndRef]);

  useEffect(() => {
    if (loading || (!onPointerDown && !onPointerUp)) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (preventOutsideClicksRef.current || domContainer.current?.contains(event.target as Node)) {
        event.preventDefault();
        setPressedAndRef(true);
        onPointerDown?.(event);
      }
    }

    function handlePointerUp(event: MouseEvent | TouchEvent) {
      if (pressedRef.current) {
        event.preventDefault();
        setPressedAndRef(false);
        onPointerUp?.(event);
      }
    }

    window.addEventListener("touchstart", handlePointerDown);
    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("touchend", handlePointerUp);
    window.addEventListener("mouseup", handlePointerUp);
    return () => {
      window.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("touchend", handlePointerUp);
      window.removeEventListener("mouseup", handlePointerUp);
    };
  }, [loading, onPointerDown, onPointerUp, setPressedAndRef]);

  return (
    <div
      tabIndex={0}
      {...bind?.()}
      ref={domContainer}
      className={clsx(classes.root, className, { pressed })}
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(Pressable);
