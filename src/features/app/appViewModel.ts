import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useScramble, useSelectedItem } from "features/timer/timerViewModel";
import { User } from "models/user/User";
import { useAuthRepository } from "repositories/auth/authRepository";
import { generateUseState, localStorageEffect } from "shared/recoil";

import { checkTimerPathname } from "../router/Router";

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
  const timerOpenRef = useRef(checkTimerPathname(location.pathname));
  const { resetScramble } = useScramble();
  const { resetSelectedItem } = useSelectedItem();
  const [, setUser] = useUserState();

  useEffect(() => {
    const timerOpen = checkTimerPathname(location.pathname);
    if (!timerOpen && timerOpenRef.current) {
      resetScramble();
      resetSelectedItem();
    }
    timerOpenRef.current = timerOpen;
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
