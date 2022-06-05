import ScrambleShowcase from "components/scramble/ScrambleShowcase";
import { useSelectedItem } from "features/router/routerViewModel";

import { useScramble } from "../../timerViewModel";

function Scramble() {
  const { scramble } = useScramble();
  const { selectedItem } = useSelectedItem();

  return <ScrambleShowcase puzzleKey={selectedItem?.key} scramble={scramble} />;
}

export default Scramble;
