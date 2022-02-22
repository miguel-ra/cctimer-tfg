import { useState } from "react";

import { AuthRepository } from "models/auth/AuthRepository";

import AuthRepositoryFirebase from "./AuthRepositoryFirebase";

const authRepositoryFirebase = new AuthRepositoryFirebase();

function useAuthRepository() {
  const [authRepository] = useState<AuthRepository>(authRepositoryFirebase);

  return authRepository;
}

export { useAuthRepository };
