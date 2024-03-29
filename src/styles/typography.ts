import { CSSProperties } from "react";

type TypographyKey =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

const fontFamily = '"Roboto", "Helvetica", "Segoe UI", "Oxygen", sans-serif, "Arial"';

type FontWeight = "light" | "regular" | "medium" | "bold";

const fontWeight: { [key in FontWeight]: number } = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

const caseAllCaps = {
  textTransform: "uppercase",
};

function buildVariant(
  fontWeight: number,
  fontSize: string,
  lineHeight: number | string,
  letterSpacing: number,
  casing?: Record<string, string>
) {
  return {
    fontFamily,
    fontWeight,
    fontSize,
    lineHeight,
    letterSpacing,
    ...casing,
  } as CSSProperties;
}

const typography: { [key in TypographyKey]: CSSProperties } = {
  h1: buildVariant(fontWeight.medium, "4.8rem", "5.6rem", -0.7),
  h2: buildVariant(fontWeight.medium, "3.2rem", "4rem", -0.5),
  h3: buildVariant(fontWeight.medium, "2.4rem", "3.2rem", 0),
  h4: buildVariant(fontWeight.medium, "2rem", "2.4rem", 0),
  h5: buildVariant(fontWeight.regular, "1.6rem", "2.4rem", 0),
  h6: buildVariant(fontWeight.regular, "1.4rem", "2rem", 0),
  subtitle1: buildVariant(fontWeight.regular, "1.6rem", 1.75, 0.15),
  subtitle2: buildVariant(fontWeight.medium, "1.4rem", 1.57, 0.1),
  body1: buildVariant(fontWeight.regular, "1.6rem", 1.5, 0.15),
  body2: buildVariant(fontWeight.regular, "1.4rem", 1.43, 0.15),
  button: buildVariant(fontWeight.regular, "1.4rem", 0, 0.4),
  caption: buildVariant(fontWeight.regular, "1.2rem", 1.4, 0.4, caseAllCaps),
  overline: buildVariant(fontWeight.regular, "1.2rem", 2.66, 1, caseAllCaps),
};

export type { TypographyKey, FontWeight };

export { fontFamily, fontWeight };

export default typography;
