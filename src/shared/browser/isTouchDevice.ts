/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    DocumentTouch: any;
  }
}

function isTouchDevice() {
  return (
    !!(
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        (window.DocumentTouch && typeof document !== "undefined" && document instanceof window.DocumentTouch))
    ) || !!(typeof navigator !== "undefined" && navigator.maxTouchPoints)
  );
}

export default isTouchDevice;
