const { validationResult } = require("express-validator");
const { GlobalResponseHelper } = require("../apiResponse.common");

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formatted = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));
    return GlobalResponseHelper.badRequest(res, "Invalid input.", {
      formatted,
    });
  }

  next();
};

module.exports = handleValidation;
