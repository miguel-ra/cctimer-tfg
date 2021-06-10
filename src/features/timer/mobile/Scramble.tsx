import ScrambleShowcase from "components/scramble/ScrambleShowcase";
import { useMenu } from "store/menuContext";
import { useTimer } from "../timerViewModel";

function Scramble() {
  const { scramble } = useTimer();
  const { selectedItem } = useMenu();

  return <ScrambleShowcase puzzleKey={selectedItem?.key} scramble={scramble} />;
}

export default Scramble;
