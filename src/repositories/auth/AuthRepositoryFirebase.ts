import { createUserWithEmailAndPassword } from "firebase/auth";

import { AuthRepository } from "models/auth/AuthRepository";
import * as firebase from "shared/firebase/app";

class AuthRepositoryFirebase implements AuthRepository {
  async signup(email: string, password: string) {
    createUserWithEmailAndPassword(firebase.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log("OK", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log("FAIL", errorCode, errorMessage);
      });

    return;
  }
}

export default AuthRepositoryFirebase;
