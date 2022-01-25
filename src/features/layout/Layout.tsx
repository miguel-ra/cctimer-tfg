import { lazy, memo, Suspense } from "react";

import Box from "components/flexboxgrid/Box";
import Spinner from "components/spinner/Spinner";
import useMediaQuery from "shared/hooks/useMediaQuery";
import breakpoints from "styles/breakpoints";

import { LayoutProvider, LayoutValue } from "./layoutContext";

type LayoutComponent = React.LazyExoticComponent<() => JSX.Element>;

const layoutComponents: { [k in LayoutValue]: LayoutComponent } = {
  mobile: lazy(() => import("./LayoutMobile")),
  desktop: lazy(() => import("./LayoutDesktop")),
};

function Layout() {
  const isSmall = useMediaQuery(breakpoints.down("md"));
  const layout: LayoutValue = isSmall ? "mobile" : "desktop";
  const SelectedLayout = layoutComponents[layout];

  return (
    <LayoutProvider layout={isSmall ? "mobile" : "desktop"}>
      <Suspense
        fallback={
          <Box minHeight="100%" placeContent="center">
            <Spinner />
          </Box>
        }
      >
        <SelectedLayout />
      </Suspense>
    </LayoutProvider>
  );
}

export default memo(Layout);
