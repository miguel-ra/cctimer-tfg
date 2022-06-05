class NicknameInUseError extends Error {
  constructor() {
    super();
    this.name = "NicknameInUse";
    this.message = "Nickname already in use";
  }
}

export default NicknameInUseError;
