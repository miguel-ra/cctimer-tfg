import clsx from "clsx";
import PropTypes from "prop-types";
import { cloneElement, ReactElement } from "react";

import Portal from "components/portal/Portal";
import useEventListener from "shared/hooks/useEventListener";
import { usePopover } from "store/popoverContext";

import useStyles from "./Popover.styles";

type PopoverProps = {
  containerId: string;
  children: ReactElement;
};

function Popover({ containerId, children }: PopoverProps) {
  const { popoverConfig, setPopover } = usePopover();
  const classes = useStyles({
    anchorPosition: popoverConfig.anchorPosition,
    transformPosition: popoverConfig.transformPosition,
  });

  useEventListener(window, "keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      setPopover();
    }
  });

  useEventListener(window, "resize", () => {
    setPopover();
  });

  useEventListener(window, "blur", () => {
    setPopover();
  });

  return (
    <Portal containerId={containerId}>
      {!popoverConfig.hideOnLeave && <div className={classes.overlay} onClick={() => setPopover()} />}
      <div className={classes.container}>
        {cloneElement(children, {
          className: clsx(children.props.className, classes.popover, classes.position, {
            [classes.arrow]: popoverConfig.showArrow,
          }),
        })}
      </div>
    </Portal>
  );
}

Popover.porpTypes = {
  containerId: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Popover;
