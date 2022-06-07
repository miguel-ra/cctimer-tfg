import { useTranslation } from "react-i18next";

import Typography from "components/typography/Typography";
import { StopwatchStatus } from "models/timer/stopwatch";
import { TimePenalty } from "models/times/Time";
import { millisecondsToClock, millisecondsToSeconds } from "shared/format/number";
import { elapsedTimeWithPenaltyCompact } from "shared/format/puzzleTime";
import { useSettings } from "store/settingsContext";

import { ReactComponent as CheckIcon } from "assets/icons/check.svg";
import { ReactComponent as ClockIcon } from "assets/icons/clock.svg";

import { useRoomTimer } from "./roomTimerContext";
import styles from "./UserList.module.scss";

function displayTime({
  status,
  elapsedTime,
  remainingTime,
  penalty,
}: {
  status: StopwatchStatus;
  elapsedTime: number;
  remainingTime: number;
  penalty: TimePenalty;
}) {
  return (
    <>
      {status === StopwatchStatus.Idle && elapsedTimeWithPenaltyCompact(elapsedTime, penalty)}
      {status === StopwatchStatus.Inspection && millisecondsToSeconds(remainingTime) + 1}
      {status === StopwatchStatus.PlusTwo && "+2"}
      {status === StopwatchStatus.Dnf && "DNF"}
      {status === StopwatchStatus.Running && millisecondsToClock(elapsedTime)}
    </>
  );
}

function UserList() {
  const { t } = useTranslation();
  const { users, usersStatus } = useRoomTimer();
  const { settings } = useSettings();

  const inspectionTime = settings.inspection.time * 1000;

  return (
    <div className={styles.userList}>
      {users?.map((user) => {
        const userStatus = usersStatus?.[user];
        const Icon = userStatus?.status === StopwatchStatus.Idle ? CheckIcon : ClockIcon;
        return (
          <div key={user} className={styles.userCard}>
            <Icon />
            <div className={styles.user}>
              <Typography variant="body1" secondary>
                {user}
              </Typography>
              <Typography variant="body2">
                {userStatus?.status === undefined ||
                (userStatus?.status === StopwatchStatus.Idle && userStatus.time?.elapsedTime === 0)
                  ? t("Ready!")
                  : displayTime({
                      status: userStatus?.status || StopwatchStatus.Idle,
                      elapsedTime: userStatus.time?.elapsedTime || 0,
                      remainingTime: inspectionTime - (userStatus.time?.elapsedTime || 0),
                      penalty: userStatus.time?.penalty || TimePenalty.NoPenalty,
                    })}
              </Typography>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UserList;
