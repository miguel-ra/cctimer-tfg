import { lazy, memo, Suspense } from "react";

import Spinner from "components/spinner/Spinner";

import { ScreenSize, useLayout } from "./layoutViewModel";

type LayoutComponent = React.LazyExoticComponent<() => JSX.Element>;

const layoutComponents: { [k in ScreenSize]: LayoutComponent } = {
  mobile: lazy(() => import("./LayoutMobile")),
  desktop: lazy(() => import("./LayoutDesktop")),
};

function Layout() {
  const { screenSize } = useLayout();
  const SelectedLayout = layoutComponents[screenSize];

  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <SelectedLayout />
    </Suspense>
  );
}

export default memo(Layout);
