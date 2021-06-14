import { CSSProperties } from "react";
import { createUseStyles } from "react-jss";
import { PopoverAnchorPosition, PopoverTransformPostion } from "store/popoverContext";
import theme from "styles/theme";

type UseStylesProps = {
  anchorPosition: PopoverAnchorPosition;
  transformPosition: PopoverTransformPostion;
};

const positions: {
  [key in PopoverAnchorPosition]: {
    start: string;
    center: string;
    end: string;
  };
} = {
  top: {
    start: "translate(-2rem, -100%)",
    center: "translate(-50%, -100%)",
    end: "translate(calc(-100% + 2rem), -100%)",
  },
  right: {
    start: "translateY(-2rem)",
    center: "translateY(-50%)",
    end: "translateY(calc(-100% + 2rem))",
  },
  bottom: {
    start: "translateX(-2rem)",
    center: "translateX(-50%)",
    end: "translateX(calc(-100% + 2rem))",
  },
  left: {
    start: "translate(-100%, -2rem)",
    center: "translate(-100%, -50%)",
    end: "translate(-100%, calc(-100% + 2rem))",
  },
};

const arrow: {
  [position in PopoverAnchorPosition]?: { [name: string]: CSSProperties };
} = {
  right: {
    background: {
      top: "50%",
      left: "-7px",
      marginTop: "-8px",
      borderWidth: "8px 8px 8px 0",
      borderColor: "transparent var(--background-color) transparent transparent",
    },
    border: {
      borderRightColor: "var(--border-color)",
      left: "-8px",
    },
  },
  top: {
    background: {
      bottom: "-7px",
      left: "50%",
      marginLeft: "-8px",
      borderWidth: "8px 8px 0 8px",
      borderColor: "var(--background-color) transparent transparent transparent",
    },
    border: {
      borderTopColor: "var(--border-color)",
      bottom: "-8px",
    },
  },
};

const useStyles = createUseStyles<any, UseStylesProps>({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: "1",
  },
  container: {
    position: "fixed",
    height: 0,
    overflow: "visible",
    pointerEvents: "none",
    userSelect: "none",
    cursor: "default",
    opacity: 0,
    willChange: "top, left, opacity",
    transition: "top 0.25s ease-in-out, left 0.25s ease-in-out, opacity 0.25s linear",
  },
  popover: {
    "--background-color": theme.palette.colors.white.main,
    "--border-color": "transparent",
    "--color": theme.palette.colors.white.contrastText,
    display: "block",
    fontSize: "1.4rem",
    color: "var(--color)",
    padding: "0.5rem 1rem",
    border: `${theme.shape.borderWitdh} solid var(--border-color)`,
    backgroundColor: "var(--background-color)",
    borderRadius: theme.shape.borderRadius,
    willChange: "transform",
  },
  position: ({ anchorPosition, transformPosition }) => ({
    transform: positions[anchorPosition][transformPosition],
  }),
  dark: {
    "--background-color": theme.palette.colors.white.contrastText,
    "--color": theme.palette.colors.white.main,
    "--border-color": "transparent",
    'body[data-color-mode="dark"] &': {
      "--border-color": theme.palette.border.primary,
    },
  },
  arrow: ({ anchorPosition }) => ({
    "&:after, &:before": {
      content: '""',
      position: "absolute",
      borderStyle: "solid",
      ...arrow[anchorPosition]?.background,
    },
    "&:before": {
      ...arrow[anchorPosition]?.border,
    },
  }),
});

export default useStyles;
