import {
  Dispatch,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  useCallback,
} from "react";
import isTouchDevice from "shared/browser/isTouchDevice";
import useEventListener from "shared/hooks/useEventListener";

type PuzzleIconWrapperProps = {
  ["data-id"]: number;
  className: string;
  onClick: (event: MouseEvent) => void;
  timeoutId: MutableRefObject<NodeJS.Timeout | null>;
  showRemoveId: number | null;
  setShowRemoveId: Dispatch<React.SetStateAction<number | null>>;
  children: ReactNode;
};

function PuzzleIconWrapper({
  onClick,
  children,
  timeoutId,
  showRemoveId,
  setShowRemoveId,
  ...props
}: PuzzleIconWrapperProps) {
  const dataId = props?.["data-id"];

  const clickHandler = useCallback(
    (event: MouseEvent) => {
      const container = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-id]"
      );
      if (!container) {
        setShowRemoveId(null);
      }
    },
    [setShowRemoveId]
  );

  useEventListener(window, "click", clickHandler, showRemoveId === dataId);

  return (
    <div
      {...props}
      onMouseEnter={() => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        if (isTouchDevice()) {
          return;
        }
        timeoutId.current = setTimeout(() => {
          setShowRemoveId(dataId);
        }, 750);
      }}
      onMouseLeave={() => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        if (isTouchDevice()) {
          setShowRemoveId(null);
          return;
        }
        timeoutId.current = setTimeout(() => {
          setShowRemoveId(null);
        }, 500);
      }}
      onClick={(event: MouseEvent) => {
        if (isTouchDevice()) {
          timeoutId.current = setTimeout(() => {
            setShowRemoveId(dataId);
          }, 500);
        }
        onClick(event);
      }}
    >
      {children}
    </div>
  );
}

export default PuzzleIconWrapper;
