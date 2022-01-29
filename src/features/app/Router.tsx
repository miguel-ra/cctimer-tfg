import { lazy, LazyExoticComponent, Suspense } from "react";
import { useTranslation } from "react-i18next";
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
  const { i18n } = useTranslation();

  return (
    <Routes>
      <Route path="/:lang" element={<Layout />}>
        <Route path="puzzle">
          <Route path=":puzzleId" element={<LazyElement Component={Timer} />} />
          <Route index element={<Navigate to={`/${i18n.language}`} replace />} />
        </Route>
        <Route path="login" element={<LazyElement Component={Login} />} />
        <Route index element={<LazyElement Component={Timer} />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
}

export default Router;
