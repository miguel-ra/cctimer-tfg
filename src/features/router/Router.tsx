import { lazy, LazyExoticComponent, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Location, Navigate, Route, Routes } from "react-router-dom";

import Spinner from "components/spinner/Spinner";
import Layout from "features/layout/Layout";
import { SelectedItemType } from "models/router/Router";

import AccountRedirect from "./AccountRedirect";
import { useSelectedItem } from "./routerViewModel";

type LazyElementProps = {
  name?: string;
  selectedItemType?: SelectedItemType;
  Component: LazyExoticComponent<() => JSX.Element>;
};

const Login = lazy(() => import("features/auth/Login"));
const SignUp = lazy(() => import("features/auth/SignUp"));
const Timer = lazy(() => import("features/timer/Timer"));
const Room = lazy(() => import("features/rooms/Room"));
const RoomCreate = lazy(() => import("features/rooms/RoomCreate"));
const RoomJoin = lazy(() => import("features/rooms/RoomJoin"));

const puzzlePath = "puzzle";
const puzzlePathnameRegex = new RegExp(`^\/[a-z]+\/?$|^\/[a-z]+\/${puzzlePath}`, "i");

function checkPuzzleLocation(location: Location) {
  return puzzlePathnameRegex.test(location.pathname);
}

function LazyElement({ selectedItemType, Component }: LazyElementProps) {
  const { checkAndRedirect } = useSelectedItem();

  useEffect(() => {
    if (selectedItemType) {
      checkAndRedirect(selectedItemType);
    }
  }, [checkAndRedirect, selectedItemType]);

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
          <Route
            path=":puzzleId"
            element={<LazyElement selectedItemType={SelectedItemType.Puzzle} Component={Timer} />}
          />
          <Route index element={<Navigate to={`/${i18n.language}`} replace />} />
        </Route>
        <Route path="room">
          <Route
            path=":roomId"
            element={<LazyElement selectedItemType={SelectedItemType.Room} Component={Room} />}
          />
          <Route path="create" element={<LazyElement Component={RoomCreate} />} />
          <Route path="join" element={<LazyElement Component={RoomJoin} />} />
          <Route index element={<Navigate to="join" replace />} />
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
        <Route index element={<LazyElement selectedItemType={SelectedItemType.Puzzle} Component={Timer} />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
}

export { checkPuzzleLocation };
export default Router;
