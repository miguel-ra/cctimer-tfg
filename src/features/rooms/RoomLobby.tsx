import { useTranslation } from "react-i18next";

import LoadingDots from "components/loading-dots/LoadingDots";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import { RoomId, RoomStatus } from "models/rooms/Room";

import styles from "./RoomLobby.module.scss";

type RoomLobbyProps = {
  roomId?: RoomId;
  roomStatus: RoomStatus;
};

const lobbyMessages: { [key in RoomStatus]: string } = {
  // t("Creating room")
  [RoomStatus.Creating]: "Creating room",
  // t("Connecting to the room")
  [RoomStatus.Loading]: "Connecting to the room",
  // t("Waiting users")
  [RoomStatus.WaitingUsers]: "Waiting users",
  // t("Loading timer")
  [RoomStatus.Ready]: "Loading timer",
};

function RoomLobby({ roomId, roomStatus }: RoomLobbyProps) {
  const { t } = useTranslation();

  return (
    <section className={styles.roomLobby}>
      <Typography variant="h2" secondary>
        {t(lobbyMessages[roomStatus])}
        &nbsp;
        <LoadingDots />
      </Typography>
      <Spacer h={2} />
      <Typography variant="subtitle1" secondary>
        {t("Share the room code with your friends")}: <strong>{roomId}</strong>
      </Typography>
    </section>
  );
}

export default RoomLobby;
