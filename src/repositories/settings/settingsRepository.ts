import { useEffect, useState } from "react";

import { SettingsRepository } from "models/settings/SettingsRepository";
import { useAuthRepository } from "repositories/auth/authRepository";
import firebase from "shared/firebase";

import SettingsRepositoryFirebase from "./SettingsRepositoryFirebase";
import SettingsRepositoryInMemory from "./SettingsRepositoryInMemory";

const settingsRepositoryFirebase = new SettingsRepositoryFirebase();
const settingsRepositoryInMemory = new SettingsRepositoryInMemory();

function getRepository(userId?: string) {
  if (userId) {
    return settingsRepositoryFirebase;
  }
  return settingsRepositoryInMemory;
}

function useSettingsRepository() {
  const authRepository = useAuthRepository();
  const [settingsRepository, setSettingsRepository] = useState<SettingsRepository>(
    getRepository(firebase.auth.currentUser?.uid)
  );

  useEffect(() => {
    const unsuscribe = authRepository.subscribe((authInfo) => {
      setSettingsRepository(getRepository(authInfo.uid));
    });
    return unsuscribe;
  }, [authRepository]);

  return settingsRepository;
}

export { useSettingsRepository };
