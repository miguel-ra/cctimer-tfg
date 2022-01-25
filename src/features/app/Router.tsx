import { Route, Routes } from "react-router-dom";

import Login from "features/account/Login";
import Layout from "features/layout/Layout";
import Timer from "features/timer/Timer";

{
  /* <Route path="puzzle/:puzzleId" element={<Timer />} />
<Route path="login" element={<Login />} />
<Route index element={<Navigate to="puzzle/12" />} /> */
}

function Router() {
  return (
    <Routes>
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Timer />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default Router;
