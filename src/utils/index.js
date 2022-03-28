export default class Response {
  static success(res, status = 200, message = "successful", data = {}) {
    return res.status(status).send({
      status,
      message,
      data,
    });
  }

  static error(
    res,
    status = 500,
    message = "internalserver error",
    error = {}
  ) {
    return res.status(status).send({
      status,
      message,
      error,
    });
  }
}
