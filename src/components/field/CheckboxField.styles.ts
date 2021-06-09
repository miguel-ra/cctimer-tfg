import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  wrapper: {
    "&&": {
      gap: 0,
    },
    "& $label, & $input": {
      cursor: "pointer",
      userSelect: "none",
    },
    "& $input:focus + $label:before": {
      outline: "5px auto -webkit-focus-ring-color",
      ".mousedown &": {
        outline: "0",
      },
    },
    "& $input:not(:checked) + $label:after": {
      opacity: 0,
      transform: "scale(0.5)",
    },
    "& $input:checked + $label:after": {
      opacity: 1,
      transform: "scale(1)",
    },
  },
  label: {
    "&:before": {
      content: "''",
      position: "absolute",
      right: "0",
      top: "0",
      width: "16px",
      height: "16px",
      border: "1px solid var(--palette-border-primary)",
      borderRadius: theme.shape.borderRadius,
      background: theme.palette.colors.white.main,
      transition: `border ${theme.transition.duration.colorMode} linear`,
    },
    "&:after": {
      content: "''",
      width: "10px",
      height: "10px",
      background: `linear-gradient(to bottom right, ${theme.palette.colors.blue.light}, ${theme.palette.colors.blue.main})`,
      position: "absolute",
      top: "4px",
      right: "4px",
      borderRadius: theme.shape.borderRadius / 2,
      transition: "opacity 0.2s ease, transform 0.2s ease",
    },
  },
  input: {
    /* visually-hidden */
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  },
});

export default useStyles;
