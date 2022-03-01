import { ReactNode, useRef, useState } from "react";

import isTouchDevice from "shared/browser/isTouchDevice";
import useEventListener from "shared/hooks/useEventListener";
import {
  PopoverAnchorPosition,
  PopoverConfig,
  PopoverTransformPostion,
  usePopover,
} from "store/popoverContext";

import styles from "./Tooltip.module.scss";

type TooltipProps = {
  targetElement?: HTMLElement;
  label: string;
  delay?: number;
  children?: ReactNode;
  anchorPosition?: PopoverAnchorPosition;
  transformPosition?: PopoverTransformPostion;
} & Partial<PopoverConfig>;

function Tooltip({
  targetElement: targetElementProp,
  label,
  delay = 500,
  children,
  ...config
}: TooltipProps) {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(targetElementProp || null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const { isVisible, setPopover } = usePopover({
    anchorPosition: "right",
    offset: 10,
    ...config,
  });

  function setVisibleDelayed() {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    timeoutId.current = setTimeout(
      () => timeoutId.current && setPopover(targetElement, <span className={styles.tooltip}>{label}</span>),
      !isVisible ? delay : 0
    );
  }

  useEventListener(targetElement, "mouseenter", () => {
    if (!isTouchDevice()) {
      setVisibleDelayed();
    }
    setTargetElement(null);
  });

  useEventListener(targetElement, "mouseleave", () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  });

  return children ? <div ref={(childrenElement) => setTargetElement(childrenElement)}>{children}</div> : null;
}

export default Tooltip;
