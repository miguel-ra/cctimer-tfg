import merge from "lodash/merge";
import { initialSettings, Settings } from "models/settings/Settings";
import { SettingsRepository } from "models/settings/SettingsRepository";

class SettingsRepositoryInMemory implements SettingsRepository {
  serialize = JSON.stringify;
  deserialize = JSON.parse;
  storageKey = "settings";

  private getLocalStorageItem() {
    const valueInLocalStorage = window.localStorage.getItem(this.storageKey);
    let data;
    if (valueInLocalStorage) {
      data = this.deserialize(valueInLocalStorage);
    }
    return data;
  }

  private setLocalStorageItem(settings: Settings) {
    window.localStorage.setItem(this.storageKey, this.serialize(settings));
  }

  async getAll() {
    const storedSettings = this.getLocalStorageItem();
    if (!storedSettings) {
      return;
    }
    return merge({}, initialSettings, storedSettings);
  }

  async update<C extends keyof Settings, S extends keyof Settings[C], V extends Settings[C][S]>(
    category: C,
    setting: S,
    value: V
  ) {
    const prevSettings = await this.getAll();
    const newSettings = {
      ...prevSettings,
      [category]: {
        ...prevSettings?.[category],
        [setting]: value,
      },
    };
    this.setLocalStorageItem(newSettings);
    return merge({}, initialSettings, newSettings);
  }
}

export default SettingsRepositoryInMemory;
