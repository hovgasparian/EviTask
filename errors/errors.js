const ErrorMessages = {
  NOT_FOUND: "Doesn't found",
  WRONG_STEP: "Something wrong happened",
};

class Errors {
  static notFound(res, message = ErrorMessages.NOT_FOUND) {
    res.json({
      status: "fail",
      message: message,
    });
  }
  static wrongStep(res, message = ErrorMessages.WRONG_STEP) {
    res.json({
      status: "fail",
      message: message,
    });
  }
}

module.exports = {
  Errors,
  ErrorMessages,
};
