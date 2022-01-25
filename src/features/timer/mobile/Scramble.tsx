import ScrambleShowcase from "components/scramble/ScrambleShowcase";

import { useTimer, useTimerSelectedItem } from "../timerViewModel";

function Scramble() {
  const { scramble } = useTimer();
  const { selectedItem } = useTimerSelectedItem();

  return <ScrambleShowcase puzzleKey={selectedItem?.key} scramble={scramble} />;
}

export default Scramble;
