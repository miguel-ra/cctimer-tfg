import {
  Dispatch,
  HTMLAttributes,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useCallback,
} from "react";
import isTouchDevice from "shared/browser/isTouchDevice";
import useEventListener from "shared/hooks/useEventListener";

type PuzzleIconWrapperProps = {
  ["data-id"]: number;
  className?: string;
  onClick: (event: MouseEvent) => void;
  timeoutId: MutableRefObject<NodeJS.Timeout | null>;
  showDeleteId: number | null;
  setShowDeleteId: Dispatch<SetStateAction<number | null>>;
  onSelect: () => void;
  onDelete: () => void;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function PuzzleIconWrapper({
  onClick,
  children,
  timeoutId,
  showDeleteId,
  setShowDeleteId,
  onSelect,
  onDelete,
  ...props
}: PuzzleIconWrapperProps) {
  const dataId = props?.["data-id"];

  const clickHandler = useCallback(
    (event: MouseEvent) => {
      const container = (event.target as HTMLElement).closest<HTMLElement>("[data-id]");
      if (!container) {
        setShowDeleteId(null);
      }
    },
    [setShowDeleteId]
  );

  useEventListener(window, "click", clickHandler, { attachListener: showDeleteId === dataId });

  return (
    <div
      {...props}
      tabIndex={0}
      role="button"
      onMouseEnter={() => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        if (isTouchDevice()) {
          return;
        }
        timeoutId.current = setTimeout(() => {
          setShowDeleteId(dataId);
        }, 500);
      }}
      onMouseLeave={() => {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
        if (isTouchDevice()) {
          setShowDeleteId(null);
          return;
        }
        timeoutId.current = setTimeout(() => {
          setShowDeleteId(null);
        }, 500);
      }}
      onMouseDown={(event: MouseEvent) => {
        if (isTouchDevice()) {
          timeoutId.current = setTimeout(() => {
            setShowDeleteId(dataId);
          }, 500);
        }
        onClick(event);
        event.preventDefault();
      }}
      onKeyDown={(event) => {
        const element = event.target as HTMLElement;

        if (["Enter", " "].includes(event.key)) {
          if (element.dataset.action === "delete") {
            return onDelete();
          }
          return onSelect();
        }

        if (event.key === "Delete") {
          onDelete();
        }
      }}
      onFocus={() => {
        setShowDeleteId(dataId);
      }}
    >
      {children}
    </div>
  );
}

export default PuzzleIconWrapper;
