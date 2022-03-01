import EmailInUserError from "models/auth/errors/EmailnUseError";
import NotImplementedError from "models/auth/errors/NotImplementedError";
import WeakPasswordError from "models/auth/errors/WeakPasswordError";

const EMAIL_IN_USE = "auth/email-already-in-use";
const WEAK_PASSWORD = "auth/weak-password";

function firebaseError2BusinessError(errorCode: string) {
  const errorCodes2Error: { [key in string]: Error } = {
    [EMAIL_IN_USE]: new EmailInUserError(),
    [WEAK_PASSWORD]: new WeakPasswordError(),
  };

  return errorCodes2Error?.[errorCode] ?? new NotImplementedError();
}

export { firebaseError2BusinessError };
