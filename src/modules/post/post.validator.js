// validators/postValidator.js
const { body } = require("express-validator");

const postValidationRules = {
  postTittle: () =>
    body("postTittle")
      .trim()
      .notEmpty()
      .withMessage("Post title is required")
      .isLength({ min: 3 })
      .withMessage("Post title must be at least 3 characters"),

  postDescription: () =>
    body("postDescription")
      .trim()
      .notEmpty()
      .withMessage("Post description is required")
      .isLength({ min: 10 })
      .withMessage("Post description must be at least 10 characters"),

  postLikeCount: () =>
    body("postLikeCount")
      .notEmpty()
      .withMessage("Post like count is required")
      .isIn([1, -1])
      .withMessage("Post like count must be either 1 (like) or -1 (dislike)"),
};

const generatePostValidator = (fields = []) => {
  return fields.map((field) => {
    if (postValidationRules[field]) {
      return postValidationRules[field]();
    } else {
      throw new Error(`Post validation rule for "${field}" is not defined`);
    }
  });
};

module.exports = { generatePostValidator };
