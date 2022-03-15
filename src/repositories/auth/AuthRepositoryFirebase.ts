import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { AuthInfo } from "models/auth/Auth";
import { AuthRepository } from "models/auth/AuthRepository";
import * as firebase from "shared/firebase/app";
import { firebaseError2BusinessError } from "shared/firebase/errors";

class AuthRepositoryFirebase implements AuthRepository {
  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(firebase.auth, email, password);
    } catch (error) {
      throw firebaseError2BusinessError(error.code);
    }
  }

  async signup(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(firebase.auth, email, password);
    } catch (error) {
      throw firebaseError2BusinessError(error.code);
    }
  }

  async logout() {
    try {
      await signOut(firebase.auth);
    } catch (error) {
      throw firebaseError2BusinessError(error.code);
    }
  }

  subscribe(notify: (authInfo: AuthInfo) => void) {
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      notify({ uid: user?.uid });
    });

    return unsubscribe;
  }
}

export default AuthRepositoryFirebase;
