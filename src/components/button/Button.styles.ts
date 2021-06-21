import { ButtonHTMLAttributes } from "react";
import { createUseStyles } from "react-jss";
import { Color, PaletteColor } from "styles/colors";
import theme from "styles/theme";

type UseStylesProps = {
  fullWidth: boolean;
  center: boolean;
  color: Color | "currentColor";
  size: "medium" | "large";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const useStyles = createUseStyles<any, UseStylesProps>({
  button: {
    ...theme.typography.button,
    border: "none",
    margin: 0,
    background: "none",
    width: ({ fullWidth }) => (fullWidth ? "100%" : "auto"),
    display: "flex",
    justifyContent: ({ center }) => (center ? "center" : "flex-start"),
    alignItems: "center",
    gap: "1.5rem",
    color: theme.palette.text.primary,
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    transition: `color ${theme.transition.duration.colorMode} linear, opacity 0.2s ease-in-out, background 0.2s linear`,
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    padding: ({ size }) => (size === "large" ? "1rem 1.5rem" : "0.5rem 1rem"),
    height: ({ size }) => (size === "large" ? "3.9rem" : "2.75rem"),
    fontSize: ({ size }) => (size === "large" ? "1.6rem" : theme.typography.button.fontSize),
    willChange: "color, opacity",
  },
  icon: {
    width: "2rem",
    opacity: "0.9",
  },
  text: {
    willChange: "opacity",
    "&:not([disabled])": {
      "@media (hover: hover)": {
        "&:hover, &:focus": { opacity: 0.5 },
      },
      "@media (hover: none)": {
        "&:active": { opacity: 0.5 },
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
        "@media (hover: hover)": {
          "&:hover, &:focus": { backgroundPositionX: "0%" },
        },
        "@media (hover: none)": {
          "&:active": { backgroundPositionX: "0%" },
        },
      },
    };
  },
  outlined: {
    boxShadow: ({ color }) =>
      `inset 0 0 0 ${theme.shape.borderWitdh} ${
        color !== "currentColor"
          ? theme.palette.getColor(`${color}.main` as PaletteColor)
          : theme.palette.border.primary
      }`,
    transition: ({ color }) =>
      `color ${theme.transition.duration.colorMode} linear, background 0.2s linear ${
        color === "currentColor" ? `box-shadow ${theme.transition.duration.colorMode} linear` : ""
      }`,
    "&:not([disabled])": {
      "@media (hover: hover)": {
        "&:hover, &:focus": {
          backgroundColor: theme.palette.border.primary,
        },
      },
      "@media (hover: none)": {
        "&:active": {
          backgroundColor: theme.palette.border.primary,
        },
      },
    },
  },
});

export default useStyles;
