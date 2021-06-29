import { HTMLAttributes, ReactNode, useEffect, useRef, useState, memo } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

type PressableProps = {
  children: ReactNode;
  className?: string;
  onPointerDown?: (event: MouseEvent | TouchEvent) => void;
  onPointerUp?: (event: MouseEvent | TouchEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event?: KeyboardEvent) => void;
  bind?: () => void;
  listenOnWindow?: boolean;
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
  listenOnWindow,
  ...props
}: PressableProps) {
  const [pressed, setPressed] = useState(false);
  const domContainer = useRef<HTMLDivElement | null>(null);
  const pressedRef = useRef(pressed);
  const listenOnWindowRef = useRef(listenOnWindow);
  const onPointerDownRef = useRef(onPointerDown);
  const onPointerUpRef = useRef(onPointerUp);
  const onKeyDownRef = useRef(onKeyDown);
  const onKeyUpRef = useRef(onKeyUp);
  const classes = useStyles();

  useEffect(() => {
    listenOnWindowRef.current = listenOnWindow;
  }, [listenOnWindow]);

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
    pressedRef.current = pressed;
  }, [pressed]);

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
      setPressed(onKeyDownRef.current?.(event) || false);
    }
    function keyUpHandler(event: KeyboardEvent) {
      if (!pressedRef.current) {
        return;
      }
      onKeyUpRef.current?.(event);
      setPressed(false);
    }

    window.addEventListener("keydown", keyDownHandler, true);
    window.addEventListener("keyup", keyUpHandler);
    return () => {
      window.removeEventListener("keydown", keyDownHandler, true);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  useEffect(() => {
    if (!onPointerDownRef.current && !onPointerUpRef.current) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (listenOnWindowRef.current || domContainer.current?.contains(event.target as Node)) {
        event.preventDefault();
        setPressed(true);
        onPointerDownRef.current?.(event);
      }
    }
    function handlePointerUp(event: MouseEvent | TouchEvent) {
      if (pressedRef.current) {
        event.preventDefault();
        setPressed(false);
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
  }, []);

  return (
    <div
      tabIndex={0}
      {...bind?.()}
      ref={domContainer}
      className={clsx(classes.root, className, { pressed: pressed })}
      {...props}
    >
      {children}
    </div>
  );
}

export default memo(Pressable);
