import { useEffect, useState } from "react";

import { PuzzlesRepository } from "models/puzzles/PuzzlesRepository";
import { useAuthRepository } from "repositories/auth/authRepository";
import * as firebase from "shared/firebase/app";

import PuzzlesRepositoryFirebase from "./PuzzlesRepositoryFirebase";
import PuzzlesRepositoryInMemory from "./PuzzlesRepositoryInMemory";

const puzzlesRepositoryFirebase = new PuzzlesRepositoryFirebase();
const puzzlesRepositoryInMemory = new PuzzlesRepositoryInMemory();

function getRepository(userId?: string) {
  if (userId) {
    return puzzlesRepositoryFirebase;
  }
  return puzzlesRepositoryInMemory;
}

function usePuzzlesRepository() {
  const authRepository = useAuthRepository();
  const [puzzlesRepository, setPuzzlesRepository] = useState<PuzzlesRepository>(
    getRepository(firebase.auth.currentUser?.uid)
  );

  useEffect(() => {
    const unsuscribe = authRepository.subscribe((authInfo) => {
      setPuzzlesRepository(getRepository(authInfo.uid));
    });
    return unsuscribe;
  }, [authRepository, puzzlesRepository]);

  return puzzlesRepository;
}

export { usePuzzlesRepository };
