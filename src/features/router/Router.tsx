import { lazy, LazyExoticComponent, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Location, Navigate, Route, Routes } from "react-router-dom";

import Spinner from "components/spinner/Spinner";
import Layout from "features/layout/Layout";

import AccountRedirect from "./AccountRedirect";

type LazyElementProps = {
  name?: string;
  Component: LazyExoticComponent<() => JSX.Element>;
};

const Login = lazy(() => import("features/auth/Login"));
const SignUp = lazy(() => import("features/auth/SignUp"));
const Timer = lazy(() => import("features/timer/Timer"));

const puzzlePath = "puzzle";
const puzzlePathnameRegex = new RegExp(`^\/[a-z]+\/?$|^\/[a-z]+\/${puzzlePath}`, "i");

function checkPuzzleLocation(location: Location) {
  return puzzlePathnameRegex.test(location.pathname);
}

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
        <Route path={puzzlePath}>
          <Route path=":puzzleId" element={<LazyElement Component={Timer} />} />
          <Route index element={<Navigate to={`/${i18n.language}`} replace />} />
        </Route>
        <Route
          path="login"
          element={
            <AccountRedirect>
              <LazyElement Component={Login} />
            </AccountRedirect>
          }
        />
        <Route
          path="signup"
          element={
            <AccountRedirect>
              <LazyElement Component={SignUp} />
            </AccountRedirect>
          }
        />
        <Route index element={<LazyElement Component={Timer} />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
}

export { checkPuzzleLocation };
export default Router;
