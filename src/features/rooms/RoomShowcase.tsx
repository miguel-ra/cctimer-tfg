import { useTranslation } from "react-i18next";

import Showcase from "components/showcase/Showcase";
import useNavigate from "shared/hooks/useNavigate";

import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";

type RoomShowcaseProps = {
  className?: string;
};

function RoomShowcase({ className }: RoomShowcaseProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Showcase className={className} title={t("Rooms")}>
      <Showcase.Button
        label={t("Join room")}
        onClick={() => {
          navigate("room/join");
        }}
      >
        <PlusIcon />
      </Showcase.Button>
    </Showcase>
  );
}

export default RoomShowcase;
