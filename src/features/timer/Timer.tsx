import { useLayout } from "features/layout/layoutContext";

import TimerDesktop from "./desktop/TimerDesktop";
import TimerMobile from "./mobile/TimerMobile";
import { TimerProvider } from "./timerViewModel";

function Timer() {
  const { layout } = useLayout();
  const TimerComponet = layout === "desktop" ? TimerDesktop : TimerMobile;

  return (
    <TimerProvider>
      <TimerComponet />
    </TimerProvider>
  );
}

export default Timer;
