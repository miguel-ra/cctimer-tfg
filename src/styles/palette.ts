import get from "lodash/get";
import colors, { PaletteColor } from "./colors";

function getColor(paletteColor?: PaletteColor, fallbackColor?: string) {
  let colorPalette;

  if (paletteColor) {
    colorPalette = get(colors, paletteColor);
  }

  if (!colorPalette) {
    return fallbackColor;
  }

  return typeof colorPalette === "string" ? colorPalette : colorPalette?.main;
}

const palette = {
  colors,
  getColor,
  background: {
    primary: "var(--palette-background-primary)",
    secondary: "var(--palette-background-secondary)",
  },
  text: {
    primary: "var(--palette-text-primary)",
    secondary: "var(--palette-text-secondary)",
  },
  border: {
    primary: "var(--palette-border-primary)",
    secondary: "var(--palette-border-secondary)",
  },
};

export default palette;
