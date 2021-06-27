type Color = "black" | "white" | "blue" | "green" | "yellow" | "orange" | "red" | "purple" | "pink" | "grey";
type Palette = "main" | "light" | "dark" | "darker" | "contrastText";
type PaletteColor =
  | Color
  | {
      [C in Color]: { [P in Palette]: `${C}.${P}` };
    }[Color][Palette];

const colors = {
  black: {
    main: "var(--colors-black-main)",
    contrastText: "var(--colors-black-contrastText)",
  },
  white: {
    main: "var(--colors-white-main)",
    contrastText: "var(--colors-white-contrastText)",
  },
  blue: {
    light: "var(--colors-blue-light)",
    main: "var(--colors-blue-main)",
  },
  green: {
    main: "var(--colors-green-main)",
    dark: "var(--colors-green-dark)",
    contrastText: "var(--colors-black-contrastText)",
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
  },
  purple: {
    main: "var(--colors-purple-main)",
  },
  pink: {
    main: "var(--colors-pink-main)",
  },
  grey: {
    main: "var(--colors-grey-main)",
  },
} as { [key in Color]: { [key in Palette]: string } };

export type { Color, PaletteColor };

export default colors;
