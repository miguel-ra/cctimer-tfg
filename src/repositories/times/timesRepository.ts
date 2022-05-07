import { useEffect, useState } from "react";

import { TimesRepository } from "models/times/TimesRepository";
import { useAuthRepository } from "repositories/auth/authRepository";
import firebase from "shared/firebase";

import TimesRepositoryFirebase from "./TimesRepositoryFirebase";
import TimesRepositoryInMemory from "./TimesRepositoryInMemory";

const timesRepositoryFirebase = new TimesRepositoryFirebase();
const timesRepositoryInMemory = new TimesRepositoryInMemory();

function getRepository(userId?: string) {
  if (userId) {
    return timesRepositoryFirebase;
  }
  return timesRepositoryInMemory;
}

function useTimesRepository() {
  const authRepository = useAuthRepository();
  const [timesRepository, setTimesRepository] = useState<TimesRepository>(
    getRepository(firebase.auth.currentUser?.uid)
  );

  useEffect(() => {
    const unsuscribe = authRepository.subscribe((authInfo) => {
      setTimesRepository(getRepository(authInfo.uid));
    });
    return unsuscribe;
  }, [authRepository]);

  return timesRepository;
}

export { useTimesRepository };
