import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Button from "components/button/Button";
import Box from "components/flexboxgrid/Box";
import Input from "components/input/Input";
import Link from "components/link/Link";
import Spacer from "components/spacer/Spacer";
import Typography from "components/typography/Typography";
import { roomCreatePathname } from "features/router/pathnames";
import { RoomId } from "models/rooms/Room";
import useForm from "shared/form/useForm";

import { useJoinRoom, ViewErrors } from "./joinRoomViewModel";
import styles from "./RoomJoin.module.scss";

type Inputs = {
  code: RoomId;
  nickname: string;
};

function RoomJoin() {
  const { t } = useTranslation();
  const { registerWithErrors, handleSubmit, clearErrors, setError } = useForm<Inputs>();
  const { joinRoom, errors } = useJoinRoom();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    clearErrors();
    joinRoom(data.nickname, data.code);
  };

  useEffect(() => {
    const entries = Object.entries(errors) as [keyof ViewErrors, string][];
    for (const [name, message] of entries) {
      setError(name, {
        type: "manual",
        message,
      });
    }
  }, [errors, setError]);

  return (
    <section className={styles.roomJoin}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h1" secondary>
          {t("Join room")}
        </Typography>
        <Spacer h={1} />
        <Typography variant="body1" secondary>
          {t("Enter the invitation code to join an existing room.")}
        </Typography>
        <Spacer h={2} />
        <Input
          {...registerWithErrors("nickname", {
            required: "What is your nickname?",
            minLength: { value: 3, message: t("A nickname must have at least 3 characters") },
          })}
          size="large"
          placeholder={t("Nickname")}
        />
        <Spacer h={1} />
        <Input
          {...registerWithErrors("code", {
            required: "What is the room code?",
            minLength: { value: 3, message: t("A room code must have 3 characters") },
          })}
          size="large"
          placeholder={t("Room code")}
        />
        <Spacer h={2} />
        <Button type="submit" size="large" variant="contained" center color="blue" loading={false}>
          {t("Join")}
        </Button>
        <Spacer h={3} />
        <Box justifyContent="center">
          {t("Don't have room code?")} &nbsp;<Link to={roomCreatePathname}>{t("Create a room")}</Link>
        </Box>
      </form>
    </section>
  );
}

export default RoomJoin;
