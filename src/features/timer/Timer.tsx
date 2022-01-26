import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useLayout } from "features/layout/layoutContext";
import { usePuzzlesRepository } from "repositories/puzzles/puzzlesRepository";
import useNavigate from "shared/hooks/useNavigate";

import TimerDesktop from "./desktop/TimerDesktop";
import TimerMobile from "./mobile/TimerMobile";
import { useTimer } from "./timerViewModel";

function Timer() {
  const { layout } = useLayout();
  const navigate = useNavigate();
  const { puzzleId } = useParams();
  const puzzlesRepository = usePuzzlesRepository();
  const {
    config: { selectedItem },
    setConfig,
    refreshScramble,
  } = useTimer();
  const TimerComponet = layout === "desktop" ? TimerDesktop : TimerMobile;

  useEffect(() => {
    refreshScramble();
  }, [refreshScramble]);

  useEffect(() => {
    if (Number(puzzleId) === selectedItem?.id) {
      return;
    }

    async function checkPuzzleId() {
      let userPuzzle;

      if (puzzleId) {
        userPuzzle = await puzzlesRepository.findById(Number(puzzleId));
        if (!userPuzzle) {
          navigate("/", { replace: true });
          return;
        }
      } else {
        const userPuzzles = await puzzlesRepository.getAll();
        if (!userPuzzles || !userPuzzles.length) {
          return;
        }
        userPuzzle = userPuzzles[0];
      }

      if (userPuzzle) {
        setConfig({
          selectedItem: {
            ...userPuzzle,
            type: "puzzle",
          },
        });
      }
    }

    checkPuzzleId();
  }, [navigate, puzzleId, puzzlesRepository, selectedItem?.id, setConfig]);

  return <TimerComponet />;
}

export default Timer;
