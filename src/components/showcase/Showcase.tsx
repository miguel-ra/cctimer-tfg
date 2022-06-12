import clsx from "clsx";
import React, { KeyboardEvent, useRef, useState } from "react";

import Typography from "components/typography/Typography";
import isTouchDevice from "shared/browser/isTouchDevice";

import styles from "./Showcase.module.scss";
import ShowcaseButton from "./ShowcaseButton";
import ShowcaseIcon from "./ShowcaseIcon";

type ShowcaseProps = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  className?: string;
};

function Showcase({ title, children, className }: ShowcaseProps) {
  const [showDeleteIndex, setShowDeleteIndex] = useState<number | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className={clsx(styles.showcase, className)}>
      <Typography className={styles.title} variant="h6">
        {title}
      </Typography>
      <nav>
        <ul className={styles.items}>
          {React.Children.map(children, (child, index) => {
            if (child.type.displayName === "ShowcaseIcon") {
              const { onSelect, onDelete, ...childProps } = child.props;

              const canDelete =
                onDelete &&
                (isTouchDevice()
                  ? showDeleteIndex === index || childProps.isSelected
                  : showDeleteIndex === index);

              return (
                <li>
                  {React.cloneElement(
                    { ...child, props: childProps },
                    {
                      canDelete,
                      onMouseEnter: () => {
                        if (timeoutId.current) {
                          clearTimeout(timeoutId.current);
                        }
                        if (isTouchDevice()) {
                          return;
                        }
                        timeoutId.current = setTimeout(() => {
                          setShowDeleteIndex(index);
                        }, 500);
                      },
                      onMouseLeave: () => {
                        if (timeoutId.current) {
                          clearTimeout(timeoutId.current);
                        }
                        if (isTouchDevice()) {
                          setShowDeleteIndex(null);
                          return;
                        }
                        timeoutId.current = setTimeout(() => {
                          setShowDeleteIndex(null);
                        }, 500);
                      },
                      onMouseDown: (event: MouseEvent) => {
                        const shouldDelete = !!(event.target as HTMLElement).closest<HTMLElement>(
                          '[data-action="delete"]'
                        );
                        if (isTouchDevice()) {
                          timeoutId.current = setTimeout(() => {
                            setShowDeleteIndex(index);
                          }, 500);
                        }

                        if (shouldDelete) {
                          onDelete();
                        } else {
                          onSelect();
                        }

                        event.preventDefault();
                      },
                      onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
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
                      },
                      onFocus: () => {
                        setShowDeleteIndex(index);
                      },
                    }
                  )}
                </li>
              );
            }
            return <li>{child}</li>;
          })}
        </ul>
      </nav>
    </div>
  );
}

Showcase.Icon = ShowcaseIcon;
Showcase.Button = ShowcaseButton;

export default Showcase;
