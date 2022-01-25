import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLayout } from "features/layout/layoutContext";
import { PuzzleKey } from "models/puzzles/Puzzle";

import TimerDesktop from "./desktop/TimerDesktop";
import TimerMobile from "./mobile/TimerMobile";
import { SelelecteItemType, useTimer } from "./timerViewModel";

function Timer() {
  const { layout } = useLayout();
  const { puzzleId } = useParams();
  const {
    config: { selectedItem },
    setConfig,
  } = useTimer();
  const TimerComponet = layout === "desktop" ? TimerDesktop : TimerMobile;

  useEffect(() => {
    // TODO: check if valid puzzleId
    console.log(puzzleId);

    const selectedItem = {
      id: 0,
      key: "cube3" as PuzzleKey,
      type: "puzzle" as SelelecteItemType,
    };

    // if (selectedItem === null) {
    //   navigate(`puzzle/${puzzles[0].id}`);
    // }

    // If cube not exits => redirect => /

    // setConfig({ selectedItem });
  }, [puzzleId, setConfig]);

  console.log(selectedItem);

  return <TimerComponet />;
}

export default Timer;
