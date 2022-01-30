type Color = "black" | "white" | "blue" | "green" | "yellow" | "orange" | "red" | "purple" | "pink" | "gray";
type Palette = "main" | "light" | "dark" | "darker" | "contrastText";
type PaletteColor =
  | Color
  | {
      [C in Color]: { [P in Palette]: `${C}.${P}` };
    }[Color][Palette];

const colors = {
  black: {
    light: "var(--colors-black-light)",
    main: "var(--colors-black-main)",
    contrastText: "var(--colors-white-main)",
  },
  white: {
    main: "var(--colors-white-main)",
    dark: "var(--colors-white-dark)",
    darker: "var(--colors-white-darker)",
    contrastText: "var(--colors-gray-light)",
  },
  blue: {
    light: "var(--colors-blue-light)",
    main: "var(--colors-blue-main)",
    contrastText: "var(--colors-white-main)",
  },
  green: {
    main: "var(--colors-green-main)",
    dark: "var(--colors-green-dark)",
    contrastText: "var(--colors-white-main)",
  },
  yellow: {
    light: "var(--colors-yellow-light)",
    main: "var(--colors-yellow-main)",
    dark: "var(--colors-yellow-dark)",
    darker: "var(--colors-yellow-darker)",
  },
  orange: {
    main: "var(--colors-orange-main)",
  },
  red: {
    light: "var(--colors-red-light)",
    main: "var(--colors-red-main)",
    contrastText: "var(--colors-white-main)",
  },
  purple: {
    main: "var(--colors-purple-main)",
  },
  pink: {
    main: "var(--colors-pink-main)",
  },
  gray: {
    light: "var(--colors-gray-light)",
    main: "var(--colors-gray-main)",
    dark: "var(--colors-gray-dark)",
    darker: "var(--colors-gray-darker)",
  },
} as { [key in Color]: { [key in Palette]: string } };

export type { Color, PaletteColor };

export default colors;
