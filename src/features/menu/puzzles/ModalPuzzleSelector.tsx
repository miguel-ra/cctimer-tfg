import { useTranslation } from "react-i18next";
import { useModal } from "store/modalContext";
import Typography from "components/typography/Typography";
import { PuzzleKey, puzzlesData } from "models/puzzles/Puzzle";
import useStyles from "./ModalPuzzleSelector.styles";
import ModalHeader from "components/modal/ModalHeader";
import ModalBody from "components/modal/ModalBody";

type ModalPuzzleSelectorProps = {
  onAddPuzzle: (key: PuzzleKey) => Promise<void>;
};

function ModalPuzzleSelector({ onAddPuzzle }: ModalPuzzleSelectorProps) {
  const classes = useStyles();
  const { closeModal } = useModal();
  const { t } = useTranslation();

  function handleAddPuzzle(key: PuzzleKey) {
    onAddPuzzle(key).then(() => {
      closeModal();
    });
  }

  return (
    <>
      <ModalHeader>{t("Add puzzle")}</ModalHeader>
      <ModalBody>
        <div
          className={classes.content}
          onClick={(event) => {
            const key = (event.target as HTMLElement).closest("button")?.dataset.key as PuzzleKey;
            if (key) {
              handleAddPuzzle(key);
            }
          }}
        >
          {(Object.keys(puzzlesData) as PuzzleKey[]).map((key) => {
            const { label, Icon } = puzzlesData[key];
            return (
              <button key={key} className={classes.item} data-key={key}>
                <Icon className={classes.icon} />
                <Typography variant="body2" style={{ lineHeight: "1.5rem" }}>
                  {t(label)}
                </Typography>
              </button>
            );
          })}
        </div>
      </ModalBody>
    </>
  );
}

export default ModalPuzzleSelector;
