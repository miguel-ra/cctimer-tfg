import { createUserWithEmailAndPassword } from "firebase/auth";

import { AuthRepository } from "models/auth/AuthRepository";
import * as firebase from "shared/firebase/app";
import { firebaseError2BusinessError } from "shared/firebase/errors";

class AuthRepositoryFirebase implements AuthRepository {
  async signup(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(firebase.auth, email, password);
    } catch (error) {
      throw firebaseError2BusinessError(error.code);
    }
  }
}

export default AuthRepositoryFirebase;
