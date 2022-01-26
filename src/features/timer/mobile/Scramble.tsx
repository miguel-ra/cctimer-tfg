import ScrambleShowcase from "components/scramble/ScrambleShowcase";

import { useScramble, useTimerSelectedItem } from "../timerViewModel";

function Scramble() {
  const { scramble } = useScramble();
  const { selectedItem } = useTimerSelectedItem();

  return <ScrambleShowcase puzzleKey={selectedItem?.key} scramble={scramble} />;
}

export default Scramble;
