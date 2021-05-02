import { memo, lazy, Suspense } from "react";
import theme from "styles/theme";
import useMediaQuery from "shared/hooks/useMediaQuery";
import Spinner from "components/spinner/Spinner";
import Box from "components/flexboxgrid/Box";

function Layout() {
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  const SelectedLayout = lazy(() =>
    isSmall ? import("./LayoutMobile") : import("./LayoutDesktop")
  );

  return (
    <Suspense
      fallback={
        <Box minHeight="100%" placeContent="center" md={{ minHeight: "100%" }}>
          <Spinner />
        </Box>
      }
    >
      <SelectedLayout />
    </Suspense>
  );
}

export default memo(Layout);
