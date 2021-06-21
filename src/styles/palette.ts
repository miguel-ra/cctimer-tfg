import get from "lodash/get";
import colors, { PaletteColor } from "./colors";

function getColor(paletteColor?: PaletteColor, fallbackColor?: string) {
  const colorPalette = get(colors, paletteColor as any);

  if (!colorPalette) {
    return fallbackColor;
  }

  return typeof colorPalette === "string" ? colorPalette : colorPalette?.main;
}

const palette = {
  colors,
  getColor,
  background: {
    default: "var(--palette-background-default)",
    paper: "var(--palette-background-paper)",
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
