import { createUseStyles } from "react-jss";

import theme from "styles/theme";

type UseStylesProps = {
  width?: string;
};

const useStyles = createUseStyles({
  wrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    "&.small": {
      "& $select": {
        fontSize: "1.4rem",
        height: "3.2rem",
        paddingRight: "3.6rem",
      },
    },
    "&:focus-within": {
      "& $select": {
        borderColor: theme.palette.border.secondary,
      },
      "& $sufix": {
        color: theme.palette.text.secondary,
      },
    },
  },
  select: {
    cursor: "pointer",
    fontSize: ["100%", "var(--geist-form-font)"],
    font: "inherit",
    outline: "none",
    appearance: "none",
    height: "4rem",
    lineHeight: "2rem",
    textRendering: "auto",
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    border: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    background: theme.palette.background.secondary,
    color: theme.palette.text.secondary,
    padding: "0 1.2rem",
    paddingRight: "3.6rem",
    transition: theme.transition.generate(["border-color", "color", "background"]),
    minWidth: ({ width }: UseStylesProps) => (width ? width : undefined),
  },
  sufix: {
    display: "inline-flex",
    position: "absolute",
    pointerEvents: "none",
    color: theme.palette.text.primary,
    transition: theme.transition.generate(["color"]),
    right: "1.2rem",
  },
});

export default useStyles;
