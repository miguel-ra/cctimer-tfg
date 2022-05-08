import { createUseStyles } from "react-jss";

import { PaletteColor } from "styles/colors";
import theme from "styles/theme";

type UseStylesProps = {
  adornmentColor?: PaletteColor;
};

const useStyles = createUseStyles({
  root: {
    display: "flex",
    position: "relative",
    minHeight: "3rem",
    backgroundColor: theme.palette.background.primary,
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    boxShadow: `0 0 0 ${theme.shape.borderWitdh} ${theme.palette.border.primary}`,
    opacity: 0.95,
    willChange: "opacity",
    transition: `box-shadow ${theme.transition.duration.colorMode} linear, background ${theme.transition.duration.colorMode} linear`,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "0.5rem",
      height: "100%",
      backgroundColor: ({ adornmentColor }: UseStylesProps) =>
        adornmentColor ? theme.palette.getColor(adornmentColor) : "",
    },
  },
  icon: {
    marginLeft: "1.5rem",
    width: "38px",
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "1rem 1.5rem",
  },
  buttons: {
    position: "relative",
    zIndex: 1,
    borderLeft: `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`,
    transition: `border ${theme.transition.duration.colorMode} linear`,
    display: "flex",
    flexDirection: "column",
    "body & > *": {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      flex: 1,
    },
  },
});

export default useStyles;
