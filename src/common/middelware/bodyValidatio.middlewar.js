// Import validationResult to extract validation errors from express-validator
const { validationResult } = require("express-validator");

// Import a global response helper to send consistent API responses
const { GlobalResponseHelper } = require("../apiResponse.common");

// Middleware to handle validation results for request body and params
const handleValidation = (req, res, next) => {
  const errors = validationResult(req); // Extract validation errors from the request

  if (!errors.isEmpty()) {
    // If there are validation errors
    const formatted = errors.array().map((err) => ({
      // Map errors into a clean format
      field: err.param, // The field that failed validation
      message: err.msg, // The corresponding error message
    }));
    return GlobalResponseHelper.badRequest(res, "Invalid input.", {
      // Send a 400 Bad Request with formatted errors
      formatted,
    });
  }

  next(); // If no validation errors, move to the next middleware or controller
};

// Export the middleware for use in routes
module.exports = handleValidation;
