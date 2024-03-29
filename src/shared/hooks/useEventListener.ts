import { useEffect, useRef, useState } from "react";

type UseEventListenerOptions = {
  attachListener?: boolean;
  useCapture?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventHandler = (event: any) => void;

function useEventListener(
  targetProp: Window | HTMLElement | null,
  eventNameProp: string | string[],
  handler: EventHandler,
  { attachListener = true, useCapture }: UseEventListenerOptions | undefined = {}
) {
  const [target, setTarget] = useState<Window | HTMLElement | null>(targetProp);
  const savedHandler = useRef<EventListener>();

  useEffect(() => {
    if (targetProp && targetProp !== target) {
      setTarget(targetProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetProp]);

  useEffect(() => {
    const eventNames = Array.isArray(eventNameProp) ? eventNameProp : [eventNameProp];
    if (!target || !target.addEventListener || !attachListener) {
      return;
    }
    if (savedHandler.current !== handler) {
      savedHandler.current = handler;
    }
    const eventListener = (event: Event) => {
      if (!!savedHandler?.current) {
        savedHandler.current(event);
      }
    };

    eventNames.forEach((eventName) => {
      target.addEventListener(eventName, eventListener, useCapture);
    });
    return () => {
      eventNames.forEach((eventName) => {
        target.removeEventListener(eventName, eventListener, useCapture);
      });
    };
  }, [eventNameProp, target, handler, attachListener, useCapture]);

  return { setTarget };
}

export default useEventListener;
