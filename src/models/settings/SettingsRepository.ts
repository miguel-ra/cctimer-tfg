import { Settings } from "./Settings";

export interface SettingsRepository {
  getAll(): Promise<Settings>;
  update<C extends keyof Settings, S extends keyof Settings[C], V extends Settings[C][S]>(
    category: C,
    setting: S,
    value: V
  ): Promise<Settings>;
}
