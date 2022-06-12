import UserList from "../../UserList";

import styles from "./Users.module.scss";

function Users() {
  return (
    <div className={styles.users}>
      <UserList />
    </div>
  );
}

export default Users;
