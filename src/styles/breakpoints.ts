type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl";

const values: { [key in BreakpointKey]: number } = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const keys = Object.keys(values) as BreakpointKey[];

const unit = "px";

function up(key: BreakpointKey) {
  const value = typeof values[key] === "number" ? values[key] : key;
  return `@media (min-width:${value}${unit})`;
}

function down(key: BreakpointKey) {
  const value = typeof values[key] === "number" ? values[key] : key;
  return `@media (max-width:${value}${unit})`;
}

function between(start: BreakpointKey, end: BreakpointKey) {
  const endIndex = keys.indexOf(end);

  return (
    `@media (min-width:${
      typeof values[start] === "number" ? values[start] : start
    }${unit}) and ` +
    `(max-width:${
      endIndex !== -1 && typeof values[keys[endIndex]] === "number"
        ? values[keys[endIndex]]
        : end
    }${unit})`
  );
}

function only(key: BreakpointKey) {
  if (keys.indexOf(key) + 1 < keys.length) {
    return between(key, keys[keys.indexOf(key) + 1]);
  }

  return up(key);
}

function width(key: BreakpointKey) {
  return values[key];
}

const breakpoints = {
  values,
  keys,
  unit,
  up,
  down,
  between,
  only,
  width,
};

export { values as breakpointsValues, keys as breakpointsKeys };

export default breakpoints;
