class NotImplementedError extends Error {
  constructor() {
    super();
    this.name = "NotImplemented";
    this.message = "Unknown error code";
  }
}

export default NotImplementedError;
