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

const fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

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
  lineHeight: number,
  letterSpacing: number,
  casing?: object
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
  h1: buildVariant(fontWeight.light, "9.6rem", 1.167, -1.5),
  h2: buildVariant(fontWeight.light, "6rem", 1.2, -0.5),
  h3: buildVariant(fontWeight.regular, "4.8rem", 1.167, 0),
  h4: buildVariant(fontWeight.regular, "3.4rem", 1.235, 0.25),
  h5: buildVariant(fontWeight.regular, "2.4rem", 1.334, 0),
  h6: buildVariant(fontWeight.regular, "2rem", 1.6, 0.15),
  subtitle1: buildVariant(fontWeight.regular, "1.6rem", 1.75, 0.15),
  subtitle2: buildVariant(fontWeight.medium, "1.4rem", 1.57, 0.1),
  body1: buildVariant(fontWeight.regular, "1.6rem", 1.5, 0.15),
  body2: buildVariant(fontWeight.regular, "1.4rem", 1.43, 0.15),
  button: buildVariant(fontWeight.medium, "1.4rem", 1.75, 0.4, caseAllCaps),
  caption: buildVariant(fontWeight.regular, "1.2rem", 1.66, 0.4),
  overline: buildVariant(fontWeight.regular, "1.2rem", 2.66, 1, caseAllCaps),
};

export type { TypographyKey, FontWeight };

export { fontWeight };

export default typography;
