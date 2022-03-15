import useMediaQuery from "shared/hooks/useMediaQuery";
import breakpoints from "styles/breakpoints";

type ScreenSize = "mobile" | "desktop";

function useLayout() {
  const isSmall = useMediaQuery(breakpoints.down("md"));
  const screenSize: ScreenSize = isSmall ? "mobile" : "desktop";

  return {
    screenSize,
  };
}

export type { ScreenSize };
export { useLayout };
