import { useLayout } from "features/layout/layoutViewModel";

import RoomTimerDesktop from "./desktop/RoomTimerDesktop";
import RoomTimerMobile from "./mobile/RoomTimerMobile";

function RoomTimer() {
  const { screenSize } = useLayout();
  const RoomTimerComponent = screenSize === "desktop" ? RoomTimerDesktop : RoomTimerMobile;

  return <RoomTimerComponent />;
}

export default RoomTimer;
