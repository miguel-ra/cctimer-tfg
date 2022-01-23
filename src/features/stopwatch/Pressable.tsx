import clsx from "clsx";
import { HTMLAttributes, memo, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";

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
  className = "",
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
  const onPointerDownRef = useRef(onPointerDown);
  const onPointerUpRef = useRef(onPointerUp);
  const onKeyDownRef = useRef(onKeyDown);
  const onKeyUpRef = useRef(onKeyUp);
  const classes = useStyles();

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
    onPointerDownRef.current = onPointerDown;
  }, [onPointerDown]);

  useEffect(() => {
    onPointerUpRef.current = onPointerUp;
  }, [onPointerUp]);

  useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);

  useEffect(() => {
    onKeyUpRef.current = onKeyUp;
  }, [onKeyUp]);

  useEffect(() => {
    if (!onKeyDownRef.current && !onKeyUpRef.current) {
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
      const isPressed = onKeyDownRef.current?.(event) || false;
      setPressedAndRef(isPressed);
    }
    function keyUpHandler(event: KeyboardEvent) {
      if (!pressedRef.current) {
        return;
      }
      onKeyUpRef.current?.(event);
      setPressedAndRef(false);
    }

    window.addEventListener("keydown", keyDownHandler, true);
    window.addEventListener("keyup", keyUpHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler, true);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [setPressedAndRef]);

  useEffect(() => {
    if (!onPointerDownRef.current && !onPointerUpRef.current) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (preventOutsideClicksRef.current || domContainer.current?.contains(event.target as Node)) {
        event.preventDefault();
        setPressedAndRef(true);
        onPointerDownRef.current?.(event);
      }
    }
    function handlePointerUp(event: MouseEvent | TouchEvent) {
      if (pressedRef.current) {
        event.preventDefault();
        setPressedAndRef(false);
        onPointerUpRef.current?.(event);
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
  }, [setPressedAndRef]);

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
