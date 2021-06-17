import { ButtonHTMLAttributes } from "react";
import { createUseStyles } from "react-jss";
import { Color, PaletteColor } from "styles/colors";
import theme from "styles/theme";

type UseStylesProps = {
  fullWidth: boolean;
  color: Color;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const useStyles = createUseStyles<any, UseStylesProps>({
  button: {
    ...theme.typography.button,
    border: "none",
    margin: 0,
    padding: "0.5rem 1rem",
    background: "none",
    width: ({ fullWidth }) => (fullWidth ? "100%" : "auto"),
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    color: theme.palette.text.primary,
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    transition: `color ${theme.transition.duration.colorMode} linear, opacity 0.2s ease-in-out, background 0.2s linear`,
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    height: "2.75rem",
    willChange: "color, opacity",
  },
  icon: {
    width: "2rem",
    opacity: "0.9",
  },
  text: {
    willChange: "opacity",
    "&:not([disabled])": {
      "&:hover, body:not(.mousedown) &:focus": {
        opacity: 0.5,
      },
    },
  },
  contained: ({ color }) => {
    const baseColor = theme.palette.getColor(`${color}.main` as PaletteColor);
    const lightColor = theme.palette.getColor(`${color}.light` as PaletteColor, baseColor);
    return {
      background: `linear-gradient(to bottom right, ${lightColor} 0%, ${baseColor} 50%, ${baseColor} 100%)`,
      backgroundSize: "200%",
      backgroundPositionX: "100%",
      color: theme.palette.colors.white.main,
      transition: `color ${theme.transition.duration.colorMode} linear, background-position-x 0.2s ease-in-out`,
      "&:not([disabled])": {
        "&:hover, body:not(.mousedown) &:focus": {
          backgroundPositionX: "0%",
        },
      },
    };
  },
  outlined: {
    boxShadow: ({ color }) => `inset 0 0 0 2px ${theme.palette.getColor(`${color}.main` as PaletteColor)}`,
    "&:not([disabled])": {
      "&:hover, body:not(.mousedown) &:focus": {
        backgroundColor: theme.palette.border.primary,
      },
    },
  },
});

export default useStyles;
