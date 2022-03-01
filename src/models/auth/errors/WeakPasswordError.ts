class WeakPasswordError extends Error {
  constructor() {
    super();
    this.name = "WeakPassword";
    this.message = "Password is too weak";
  }
}

export default WeakPasswordError;
