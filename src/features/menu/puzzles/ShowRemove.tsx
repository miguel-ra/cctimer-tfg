import { MouseEvent, ReactNode, useCallback, useRef, useState } from "react";
import isTouchDevice from "shared/browser/isTouchDevice";
import useEventListener from "shared/hooks/useEventListener";

type ShowRemoveProps = {
  ["data-id"]: Number;
  className: string;
  onClick: (event: MouseEvent) => void;
  children: (obj: { showRemove: boolean }) => ReactNode;
};

function ShowRemove({ children, onClick, ...props }: ShowRemoveProps) {
  const [showRemove, setShowRemove] = useState(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const dataId = props?.["data-id"];

  const clickHandler = useCallback(
    (event: MouseEvent) => {
      const iconContainer = (event.target as HTMLElement).closest<HTMLElement>(
        "[data-id]"
      );
      if (!iconContainer || Number(iconContainer.dataset.id) !== dataId) {
        setShowRemove(false);
      }
    },
    [dataId]
  );

  useEventListener(window, "click", clickHandler, showRemove);

  return (
    <div
      {...props}
      onMouseEnter={() => {
        if (isTouchDevice()) {
          return;
        }
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
          setShowRemove(true);
        }, 750);
      }}
      onMouseLeave={() => {
        if (isTouchDevice()) {
          return;
        }
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
          setShowRemove(false);
        }, 500);
      }}
      onClick={(event: MouseEvent) => {
        if (isTouchDevice()) {
          setTimeout(() => {
            setShowRemove(true);
          }, 500);
        }
        onClick(event);
      }}
    >
      {children({ showRemove })}
    </div>
  );
}

export default ShowRemove;
