// validator.js
const { body, header } = require("express-validator");

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

const validationRules = {
  name: () =>
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .matches(nameRegex)
      .withMessage("Only letters and single spaces are allowed")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),

  userName: () =>
    body("userName")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isAlphanumeric()
      .withMessage("Username must be alphanumeric"),

  email: () =>
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),

  password: () =>
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword()
      .withMessage("Password must be strong"),

  gender: () =>
    body("gender")
      .notEmpty()
      .withMessage("Gender is required")
      .isIn(["M", "F", "O"])
      .withMessage("Gender must be M, F, or O"),

  deviceId: () =>
    header("x-device-id")
      .exists()
      .withMessage("x-device-id header is required")
      .bail()
      .isString()
      .withMessage("x-device-id must be a string")
      .bail()
      .notEmpty()
      .withMessage("x-device-id cannot be empty"),
};

const generateValidator = (fields = []) => {
  return fields.map((field) => {
    if (validationRules[field]) {
      return validationRules[field]();
    } else {
      throw new Error(`Validation rule for "${field}" is not defined`);
    }
  });
};

module.exports = { generateValidator };
