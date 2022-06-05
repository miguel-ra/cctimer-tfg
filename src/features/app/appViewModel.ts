import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useSelectedItem } from "features/router/routerViewModel";
import { useScramble } from "features/timer/timerViewModel";
import { User } from "models/user/User";
import { useAuthRepository } from "repositories/auth/authRepository";
import { generateUseState, localStorageEffect } from "shared/recoil";

import { checkPuzzleLocation } from "../router/Router";

type UserState = User | null;

const useUserState = generateUseState<UserState>({
  key: "app.user",
  default: null,
  effects_UNSTABLE: [localStorageEffect<UserState>("app.user")],
});

function useUser() {
  const [user] = useUserState();

  return { user };
}

function useApp() {
  const authRepository = useAuthRepository();
  const location = useLocation();
  const { resetScramble } = useScramble();
  const { resetSelectedItem } = useSelectedItem();
  const [, setUser] = useUserState();

  useEffect(() => {
    const isPuzzleLocation = checkPuzzleLocation(location);
    if (!isPuzzleLocation) {
      resetScramble();
      resetSelectedItem();
    }
  }, [location, resetScramble, resetSelectedItem]);

  useEffect(() => {
    const unsubscribe = authRepository.subscribe((authInfo) => {
      if (authInfo.uid) {
        setUser({ uid: authInfo.uid });
        return;
      }
      setUser(null);
    });

    return unsubscribe;
  }, [authRepository, setUser]);
}

export { useApp, useUser };
