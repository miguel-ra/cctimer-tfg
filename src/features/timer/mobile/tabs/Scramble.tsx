import ScrambleShowcase from "components/scramble/ScrambleShowcase";

import { useScramble, useSelectedItem } from "../../timerViewModel";

function Scramble() {
  const { scramble } = useScramble();
  const { selectedItem } = useSelectedItem();

  return <ScrambleShowcase puzzleKey={selectedItem?.key} scramble={scramble} />;
}

export default Scramble;
