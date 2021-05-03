import {
  cloneElement,
  createContext,
  lazy,
  ReactElement,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import useEventListener from "shared/hooks/useEventListener";
import { ColorModeKey } from "./colorModeContext";

type PopoverAnchorPosition = "top" | "right" | "bottom" | "left";
type PopoverTransformPostion = "start" | "center" | "end";

type PopoverConfig = {
  anchorPosition: PopoverAnchorPosition;
  transformPosition: PopoverTransformPostion;
  appearance: ColorModeKey;
  showArrow: boolean;
  hideOnLeave: boolean;
  offset: number;
};

type PopoverState = {
  isVisible: boolean;
  setPopover: (
    target?: HTMLElement | null,
    element?: ReactElement,
    config?: PopoverConfig
  ) => void;
  popoverConfig: PopoverConfig;
};

type PopoverProviderProps = {
  children: ReactNode;
};

const Popover = lazy(() => import("components/popover/Popover"));

const PopoverContext = createContext<PopoverState | null>(null);

const containerId = "root-popover";

const initialConfig: PopoverConfig = {
  anchorPosition: "right",
  transformPosition: "center",
  appearance: "light",
  showArrow: false,
  hideOnLeave: true,
  offset: 10,
};

function usePopover(config?: Partial<PopoverConfig>) {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error("usePopover must be used within the PopoverContext");
  }
  return {
    ...context,
    setPopover: (targetElement?: HTMLElement | null, element?: ReactElement) =>
      context.setPopover(targetElement, element, {
        ...initialConfig,
        ...config,
      }),
  };
}

function computePopoverPosition(triggerRect: DOMRect, config: PopoverConfig) {
  if (!triggerRect) {
    return {};
  }
  const { pageXOffset, pageYOffset } = window;
  const offset = config.offset || 0;
  let left, top;

  if (config.anchorPosition === "top") {
    top = triggerRect.top - offset + pageYOffset;
    left = triggerRect.left + triggerRect.width / 2 - pageYOffset;
  } else if (config.anchorPosition === "right") {
    top = triggerRect.top + triggerRect.height / 2 - pageYOffset;
    left = triggerRect.right + offset + pageXOffset;
  } else if (config.anchorPosition === "bottom") {
    top = triggerRect.bottom + offset + pageYOffset;
    left = triggerRect.left + triggerRect.width / 2 - pageYOffset;
  } else if (config.anchorPosition === "left") {
    top = triggerRect.top + triggerRect.height / 2 - pageYOffset;
    left = triggerRect.left - offset + pageXOffset;
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
  };
}

function PopoverProvider({ children }: PopoverProviderProps) {
  const tooltipRef = useRef<HTMLElement | null>(null);
  const [content, setContent] = useState<ReactElement | null>(null);
  const [popoverConfig, setPopoverConfig] = useState<PopoverConfig>(
    initialConfig
  );

  const { setTarget: setTransitionEndTarget } = useEventListener(
    null,
    "transitionend",
    (event: TransitionEvent) => {
      if (
        event.propertyName === "opacity" &&
        tooltipRef.current?.style.opacity === "0"
      ) {
        setContent(null);
      }
    }
  );

  const { setTarget: setMouseLeaveTarget } = useEventListener(
    null,
    "mouseleave",
    () => {
      if (content && popoverConfig.hideOnLeave) {
        setPopover();
      }
    }
  );

  const setPopover = useCallback(
    (
      targetElement?: HTMLElement | null,
      element?: ReactElement,
      config?: PopoverConfig
    ) => {
      if (!targetElement || !element) {
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = "0";
        }
        return;
      }
      if (config) {
        setPopoverConfig({ ...initialConfig, ...config });
      }
      setContent(
        cloneElement(element, {
          ref: (contentElement: HTMLElement) => {
            if (!contentElement) {
              return;
            }
            tooltipRef.current = contentElement.parentElement;
            setTransitionEndTarget(tooltipRef.current);
            setMouseLeaveTarget(targetElement);
            const targetRect = targetElement?.getBoundingClientRect();
            Object.assign(tooltipRef.current?.style, {
              opacity: 1,
              ...computePopoverPosition(targetRect, {
                ...initialConfig,
                ...config,
              }),
            });
          },
        })
      );
    },
    [setMouseLeaveTarget, setTransitionEndTarget]
  );

  return (
    <PopoverContext.Provider
      value={{ isVisible: !!content, setPopover, popoverConfig }}
    >
      <Suspense fallback={null}>
        {content && <Popover containerId={containerId}>{content}</Popover>}
      </Suspense>
      {children}
    </PopoverContext.Provider>
  );
}

export type { PopoverConfig, PopoverAnchorPosition, PopoverTransformPostion };

export { PopoverProvider, usePopover };
