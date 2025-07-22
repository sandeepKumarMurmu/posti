const userService = require("./user.service");

const { generateValidator } = require("./user.validator");
const bodyValidationResult = require("../../common/middelware/bodyValidatio.middlewar");

const createUser = [
  generateValidator([
    "name",
    "userName",
    "email",
    "password",
    "gender",
    "deviceId",
  ]),
  bodyValidationResult,
  userService.create,
];

const autUser = [
  generateValidator(["userName", "password", "deviceId"]),
  bodyValidationResult,
  userService.authenticateUser,
];

module.exports = { createUser, autUser };
