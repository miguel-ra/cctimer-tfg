import { lazy, memo, Suspense } from "react";

import Box from "components/flexboxgrid/Box";
import Spinner from "components/spinner/Spinner";
import useMediaQuery from "shared/hooks/useMediaQuery";
import breakpoints from "styles/breakpoints";

function Layout() {
  const isSmall = useMediaQuery(breakpoints.down("md"));
  const SelectedLayout = lazy(() => (isSmall ? import("./LayoutMobile") : import("./LayoutDesktop")));

  return (
    <Suspense
      fallback={
        <Box minHeight="100%" placeContent="center">
          <Spinner />
        </Box>
      }
    >
      <SelectedLayout />
    </Suspense>
  );
}

export default memo(Layout);
