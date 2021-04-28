import { memo, lazy, Suspense } from "react";
import breakpoints from "styles/breakpoints";
import useMediaQuery from "shared/hooks/useMediaQuery";
import Spinner from "components/spinner/Spinner";

function Layout() {
  const isSmall = useMediaQuery(breakpoints.down("md"));
  const SelectedLayout = lazy(() =>
    isSmall ? import("./LayoutMobile") : import("./LayoutDesktop")
  );

  return (
    <Suspense fallback={<Spinner />}>
      <SelectedLayout />
    </Suspense>
  );
}

export default memo(Layout);
