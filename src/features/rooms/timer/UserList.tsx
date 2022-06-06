import { useRoomTimer } from "./roomTimerContext";
import styles from "./UserList.module.scss";

function UserList() {
  const { users } = useRoomTimer();

  return (
    <div className={styles.userList}>
      {users?.map((user) => (
        <div key={user} className={styles.userCard}>
          {user}
        </div>
      ))}
    </div>
  );
}

export default UserList;
