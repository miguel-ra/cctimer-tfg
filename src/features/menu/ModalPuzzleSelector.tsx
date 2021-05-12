import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import theme from "styles/theme";
import { useModal } from "store/modalContext";
import Button from "components/button/Button";
import Typography from "components/typography/Typography";
import { ReactComponent as Cube2Icon } from "assets/icons/puzzles/cube2.svg";
import { ReactComponent as Cube3Icon } from "assets/icons/puzzles/cube3.svg";
import { ReactComponent as Cube4Icon } from "assets/icons/puzzles/cube4.svg";
import { ReactComponent as Cube5Icon } from "assets/icons/puzzles/cube5.svg";
import { ReactComponent as Cube6Icon } from "assets/icons/puzzles/cube6.svg";
import { ReactComponent as Cube7Icon } from "assets/icons/puzzles/cube7.svg";
import { ReactComponent as Cube8Icon } from "assets/icons/puzzles/cube8.svg";
import { ReactComponent as Cube9Icon } from "assets/icons/puzzles/cube9.svg";
import { ReactComponent as Cube10Icon } from "assets/icons/puzzles/cube10.svg";
import { ReactComponent as Cube11Icon } from "assets/icons/puzzles/cube11.svg";
import { ReactComponent as ClockIcon } from "assets/icons/puzzles/clock.svg";
import { ReactComponent as SquareIcon } from "assets/icons/puzzles/square.svg";
import { ReactComponent as SkewbIcon } from "assets/icons/puzzles/skewb.svg";
import { ReactComponent as MegaminxIcon } from "assets/icons/puzzles/megaminx.svg";
import { ReactComponent as GigaminxIcon } from "assets/icons/puzzles/gigaminx.svg";
import { ReactComponent as PyraminxIcon } from "assets/icons/puzzles/pyraminx.svg";

const puzzles = [
  {
    key: "cube2",
    label: "2x2 Cube",
    Icon: Cube2Icon,
  },
  {
    key: "cube3",
    label: "3x3 Cube",
    Icon: Cube3Icon,
  },
  {
    key: "cube4",
    label: "4x4 Cube",
    Icon: Cube4Icon,
  },
  {
    key: "cube5",
    label: "5x5 Cube",
    Icon: Cube5Icon,
  },
  {
    key: "cube6",
    label: "6x6 Cube",
    Icon: Cube6Icon,
  },
  {
    key: "cube7",
    label: "7x7 Cube",
    Icon: Cube7Icon,
  },
  {
    key: "cube8",
    label: "8x8 Cube",
    Icon: Cube8Icon,
  },
  {
    key: "cube9",
    label: "9x9 Cube",
    Icon: Cube9Icon,
  },
  {
    key: "cube10",
    label: "10x10 Cube",
    Icon: Cube10Icon,
  },
  {
    key: "cube11",
    label: "11x11 Cube",
    Icon: Cube11Icon,
  },
  {
    key: "clock",
    label: "Rubik's clock",
    Icon: ClockIcon,
  },
  {
    key: "square",
    label: "Square-1",
    Icon: SquareIcon,
  },
  {
    key: "skewb",
    label: "Skewb",
    Icon: SkewbIcon,
  },
  {
    key: "megaminx",
    label: "Megaminx",
    Icon: MegaminxIcon,
  },
  {
    key: "gigaminx",
    label: "Gigaminx",
    Icon: GigaminxIcon,
  },
  {
    key: "pyraminx",
    label: "Pyraminx",
    Icon: PyraminxIcon,
  },
];

const useStyles = createUseStyles({
  header: {
    display: "flex",
    padding: "1rem 1.5rem",
    alignItems: "center",
    justifyContent: "space-between",
    transition: ` border ${theme.transition.duration.colorMode} linear`,
    borderBottom: `1px solid ${theme.palette.border.primary}`,
  },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    overflow: "auto",
    [theme.breakpoints.up("sm")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
      marginBottom: 0,
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(6, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(8, 1fr)",
    },
    [theme.breakpoints.up("xl")]: {
      gridTemplateColumns: "repeat(11, 1fr)",
    },
  },
  item: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem 1rem",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "6px",
    cursor: "pointer",
    background: "none",
    color: theme.palette.text.primary,
    border: "none",
    appearance: "none",
    transition: "background 0.1s linear",
    "&:hover": {
      backgroundColor: theme.palette.border.primary,
    },
  },
  icon: {
    maxWidth: "80%",
    maxHeight: "80%",
    marginBottom: "1.5rem",
  },
});

function ModalPuzzleSelector() {
  const classes = useStyles();
  const { closeModal } = useModal();
  const { t } = useTranslation();

  return (
    <>
      <div className={classes.header}>
        <Typography variant="h6">{t("Add puzzle")}</Typography>
        <Button variant="contained" onClick={closeModal}>
          {t("Close")}
        </Button>
      </div>
      <div className={classes.content}>
        {puzzles.map(({ key, label, Icon }) => (
          <button key={key} className={classes.item}>
            <Icon className={classes.icon} />
            <Typography variant="body2" style={{ lineHeight: "1rem" }}>
              {label}
            </Typography>
          </button>
        ))}
      </div>
    </>
  );
}

export default ModalPuzzleSelector;
