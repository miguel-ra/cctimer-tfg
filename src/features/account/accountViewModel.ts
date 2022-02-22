import { useCallback } from "react";

import { useAuthRepository } from "repositories/auth/authRepository";

function useAccount() {
  const authRepository = useAuthRepository();

  const signup = useCallback(
    (email: string, password: string) => {
      authRepository.signup(email, password);
    },
    [authRepository]
  );

  return { signup };
}

export { useAccount };
