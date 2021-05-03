import React, {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

type PressableProps = {
  children: ReactNode;
  className?: string;
  onPointerDown?: (event: MouseEvent | TouchEvent) => void;
  onPointerUp?: (event: MouseEvent | TouchEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  bind?: () => void;
  listenOnWindow?: boolean;
} & HTMLAttributes<HTMLElement>;

const useStyles = createUseStyles({
  root: {
    userSelect: "none",
    cursor: "pointer",
    WebkitTapHighlightColor: "transparent",
    transition: "tranlate 0.1s linear",
  },
  pressed: {
    transform: "scale(0.95)",
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
  listenOnWindow,
  ...props
}: PressableProps) {
  const [pressed, setPressed] = useState(false);
  const domContainer = useRef<HTMLDivElement | null>(null);
  const pressedRef = useRef(pressed);
  const listenOnWindowRef = useRef(listenOnWindow);
  const classes = useStyles();

  useEffect(() => {
    listenOnWindowRef.current = listenOnWindow;
  }, [listenOnWindow]);

  useEffect(() => {
    pressedRef.current = pressed;
  }, [pressed]);

  useEffect(() => {
    if (!onKeyDown && !onKeyUp) {
      return;
    }

    function keyDownHandler(event: KeyboardEvent) {
      if (document.activeElement !== document.body || event.repeat) {
        return;
      }
      setPressed(onKeyDown?.(event) || false);
    }
    function keyUpHandler(event: KeyboardEvent) {
      if (document.activeElement !== document.body) {
        return;
      }
      onKeyUp?.(event);
      setPressed(false);
    }

    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, [onKeyDown, onKeyUp]);

  useLayoutEffect(() => {
    if (!onPointerDown && !onPointerUp) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (
        listenOnWindowRef.current ||
        domContainer.current?.contains(event.target as Node)
      ) {
        event.preventDefault();
        setPressed(true);
        onPointerDown?.(event);
      }
    }
    function handlePointerUp(event: MouseEvent | TouchEvent) {
      if (pressedRef.current) {
        event.preventDefault();
        setPressed(false);
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
  }, [onPointerDown, onPointerUp]);

  return (
    <div
      {...bind?.()}
      ref={domContainer}
      className={clsx(classes.root, className, { [classes.pressed]: pressed })}
      {...props}
    >
      {children}
    </div>
  );
}

export default React.memo(Pressable);