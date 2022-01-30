import { ButtonHTMLAttributes } from "react";
import { createUseStyles } from "react-jss";

import { Color, PaletteColor } from "styles/colors";
import theme from "styles/theme";

type UseStylesProps = {
  fullWidth: boolean;
  width?: string;
  center: boolean;
  color: Color | "currentColor";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const useStyles = createUseStyles({
  button: {
    ...theme.typography.button,
    border: "none",
    margin: 0,
    background: "none",
    width: ({ fullWidth }: UseStylesProps) => (fullWidth ? "100%" : "auto"),
    minWidth: ({ width }: UseStylesProps) => (width ? width : undefined),
    display: "flex",
    justifyContent: ({ center }: UseStylesProps) => (center ? "center" : "flex-start"),
    alignItems: "center",
    color: theme.palette.text.primary,
    cursor: "pointer",
    borderRadius: theme.shape.borderRadius,
    userSelect: "none",
    padding: "0 1.2rem",
    height: "4rem",
    fontSize: "1.4rem",
    transition: `${theme.transition.generate(["color", "background", "box-shadow"])}, opacity 0.1s ease `,
    "&.small": {
      height: "3.2rem",
      fontSize: "1.4rem",
    },
    "&.large": {
      height: "4.8rem",
      fontSize: "1.6rem",
    },
    "&.square": {
      padding: 0,
      width: "4rem",
      height: "4rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "& svg": {
        width: "2rem",
        height: "2rem",
      },
      "&.small": {
        width: "3.2rem",
        height: "3.2rem",
        "& svg": {
          width: "1.8rem",
          height: "1.8rem",
        },
      },
      "&.large": {
        width: "4.8rem",
        height: "4.8rem",
        "& svg": {
          width: "2.4rem",
          height: "2.4rem",
        },
      },
    },
  },
  prefix: {
    display: "flex",
    marginRight: "1.2rem",
    "& svg": {
      verticalAlign: "top",
      width: "2rem",
      height: "2rem",
    },
  },
  ghost: {
    color: theme.palette.text.secondary,
    outline: 0,
    "&:hover": {
      backgroundColor: theme.palette.border.primary,
    },
    "&:active": {
      opacity: 0.6,
    },
    "body:not(.mousedown) &:focus": {
      "&.small": {
        boxShadow: `0 0 0 1px ${theme.palette.background.secondary}, 0 0 0 3px ${theme.palette.border.secondary}`,
      },
      boxShadow: `0 0 0 2px ${theme.palette.background.secondary}, 0 0 0 4px ${theme.palette.border.secondary}`,
      zIndex: 1,
    },
  },
  contained: ({ color }: UseStylesProps) => {
    let accentColor = theme.palette.text.secondary;
    let textColor = theme.palette.background.secondary;
    let activeBackgroundColor = theme.palette.border.primary;

    if (color !== "currentColor") {
      accentColor = theme.palette.getColor(`${color}.main` as PaletteColor);
      textColor = theme.palette.getColor(
        `${color}.contrastText` as PaletteColor,
        theme.palette.text.secondary
      );
      activeBackgroundColor = theme.palette.background.primary;
    }

    return {
      boxShadow: `inset 0 0 0 ${theme.shape.borderWitdh} ${accentColor}`,
      background: accentColor,
      color: textColor,
      outline: 0,
      "@media (hover: hover)": {
        "&:hover": {
          background: theme.palette.background.primary,
          color: accentColor,
        },
      },
      "&:active": {
        background: activeBackgroundColor,
        color: accentColor,
        opacity: 0.6,
      },
      "body:not(.mousedown) &:focus": {
        "&.small": {
          boxShadow: `0 0 0 1px ${theme.palette.background.secondary}, 0 0 0 3px ${accentColor}`,
          height: "3.2rem",
          fontSize: "1.4rem",
        },
        boxShadow: `0 0 0 2px ${theme.palette.background.secondary}, 0 0 0 4px ${accentColor}`,
        zIndex: 1,
        "&:hover, &:active": {
          boxShadow: "none",
          zIndex: 0,
        },
      },
    };
  },
  outlined: ({ color }: UseStylesProps) => {
    let borderColor = theme.palette.border.primary;
    const textColor = theme.palette.text.secondary;
    let activeTextColor = theme.palette.text.secondary;

    if (color !== "currentColor") {
      activeTextColor = theme.palette.getColor(`${color}.main` as PaletteColor);
      borderColor = activeTextColor;
    }

    return {
      boxShadow: `inset 0 0 0 ${theme.shape.borderWitdh} ${borderColor}`,
      color: textColor,
      outline: 0,
      "&:active": {
        opacity: 0.6,
      },
      "@media (hover: hover)": {
        "&:hover, body:not(.mousedown) &:focus": {
          color: activeTextColor,
          boxShadow: `inset 0 0 0 ${theme.shape.borderWitdh} ${activeTextColor}`,
        },
      },
    };
  },
});

export default useStyles;
