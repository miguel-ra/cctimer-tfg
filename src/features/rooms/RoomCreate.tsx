import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import Input from "components/input/Input";
import Link from "components/link/Link";
// import LoadingDots from "components/loading-dots/LoadingDots";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import { roomJoinPathname } from "features/router/pathnames";
import useForm from "shared/form/useForm";

import { useCreateRoom } from "./createRoomViewModel";
import styles from "./RoomCreate.module.scss";

type Inputs = {
  nickname: string;
};

function RoomCreate() {
  const { t } = useTranslation();
  const { registerWithErrors, handleSubmit, clearErrors } = useForm<Inputs>();
  const { createRoom, loading } = useCreateRoom();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    clearErrors();
    createRoom(data.nickname);
  };

  return (
    <section className={styles.roomCreate}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" secondary>
          {t("Create room")}
        </Typography>
        <Spacer h={1} />
        <Typography variant="body1" secondary>
          {/* {t("Share the room code to your friends")} */}
          {t("To create a room, first choose a nickname")}
        </Typography>
        <Spacer h={1} />
        {/* <Typography variant="h2" secondary>
          - - - - - -
        </Typography> */}
        <Spacer h={1} />
        <Input
          {...registerWithErrors("nickname", {
            required: "What is your nickname?",
            minLength: { value: 3, message: t("A nickname must have at least 3 characters") },
          })}
          size="large"
          placeholder={t("Nickname")}
        />
        {/* <Spacer h={1} />
        <Typography variant="body1">
          {t("Creating room")} &nbsp;
          {t("Waiting users")} &nbsp;
          <LoadingDots />
        </Typography> */}
        <Spacer h={2} />
        <Button type="submit" size="large" variant="contained" center color="blue" loading={loading}>
          {t("Create")}
        </Button>
        <Spacer h={3} />
        <Box>
          {t("Do you have a room code?")} &nbsp;<Link to={roomJoinPathname}>{t("Join a room")}</Link>
        </Box>
      </form>
    </section>
  );
}

export default RoomCreate;
