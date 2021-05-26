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
  return `@media (min-width:${values[key]}${unit})`;
}

function down(key: BreakpointKey) {
  return `@media (max-width:${values[key]}${unit})`;
}

function between(start: BreakpointKey, end: BreakpointKey) {
  return `@media (min-width:${values[start]}${unit}) and (max-width:${values[end]}${unit})`;
}

function only(key: BreakpointKey) {
  if (keys.indexOf(key) + 1 < keys.length) {
    return between(key, keys[keys.indexOf(key) + 1]);
  }

  return up(key);
}

function value(key: BreakpointKey) {
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
  value,
};

export type { BreakpointKey };

export { values as breakpointsValues, keys as breakpointsKeys };

export default breakpoints;
