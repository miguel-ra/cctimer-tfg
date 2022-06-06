import Typography from "components/typography/Typography";

import { ReactComponent as CheckIcon } from "assets/icons/check.svg";

import { useRoomTimer } from "./roomTimerContext";
import styles from "./UserList.module.scss";

function UserList() {
  const { users } = useRoomTimer();

  return (
    <div className={styles.userList}>
      {users?.map((user) => (
        <div key={user} className={styles.userCard}>
          <CheckIcon />
          <div className={styles.user}>
            <Typography variant="body1" secondary>
              {user}
            </Typography>
            <Typography variant="body2">Ready!</Typography>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
