import { lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Spinner from "components/spinner/Spinner";
import Layout from "features/layout/Layout";

const Login = lazy(() => import("features/account/Login"));
const Timer = lazy(() => import("features/timer/Timer"));

type LazyElementProps = {
  Component: LazyExoticComponent<() => JSX.Element>;
};

function LazyElement({ Component }: LazyElementProps) {
  return (
    <Suspense fallback={<Spinner fullscreen />}>
      <Component />
    </Suspense>
  );
}

function Router() {
  return (
    <Routes>
      <Route path="/:lang" element={<Layout />}>
        <Route path="puzzle/:puzzleId" element={<LazyElement Component={Timer} />} />
        <Route path="login" element={<LazyElement Component={Login} />} />
        <Route index element={<Navigate to="puzzle/12" />} />
      </Route>
    </Routes>
  );
}

export default Router;
