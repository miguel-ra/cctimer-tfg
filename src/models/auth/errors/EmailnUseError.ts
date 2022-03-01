class EmailInUserError extends Error {
  constructor() {
    super();
    this.name = "EmailInUser";
    this.message = "Email already in use";
  }
}

export default EmailInUserError;
