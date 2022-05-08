import { child, Database, get, getDatabase, ref, set } from "firebase/database";
import merge from "lodash/merge";

import { initialSettings, Settings } from "models/settings/Settings";
import { SettingsRepository } from "models/settings/SettingsRepository";
import firebase from "shared/firebase";

class SettingsRepositoryFirebase implements SettingsRepository {
  private db: Database;

  constructor() {
    this.db = getDatabase();
  }

  async getAll() {
    const settingsPath = `/users/${firebase.auth.currentUser?.uid}/settings`;
    let storedSettings = {};

    const settingsSnapshot = await get(child(ref(this.db), settingsPath));

    if (settingsSnapshot.exists()) {
      storedSettings = settingsSnapshot.val();
    }

    return merge({}, initialSettings, storedSettings);
  }

  async update<C extends keyof Settings, S extends keyof Settings[C], V extends Settings[C][S]>(
    category: C,
    setting: S,
    value: V
  ) {
    const settingsPath = `/users/${firebase.auth.currentUser?.uid}/settings/${category}/${setting}`;
    const prevSettings = await this.getAll();
    let newSettings = {};

    await set(ref(this.db, settingsPath), value);

    newSettings = {
      ...prevSettings,
      [category]: {
        ...prevSettings?.[category],
        [setting]: value,
      },
    };

    return merge({}, initialSettings, newSettings);
  }
}

export default SettingsRepositoryFirebase;
