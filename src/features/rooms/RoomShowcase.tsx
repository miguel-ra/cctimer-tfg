import { useTranslation } from "react-i18next";

import Showcase from "components/showcase/Showcase";

import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";

type RoomShowcaseProps = {
  className?: string;
};

function RoomShowcase({ className }: RoomShowcaseProps) {
  const { t } = useTranslation();

  return (
    <Showcase className={className} title={t("Rooms")}>
      <Showcase.Button
        label={t("Add room")}
        onClick={() => {
          console.log("test");
        }}
      >
        <PlusIcon />
      </Showcase.Button>
    </Showcase>
  );
}

export default RoomShowcase;
