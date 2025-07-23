require("dotenv").config();

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-strong-secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "4h"; // Default token expiry
const JWT_ALGO = process.env.JWT_ALGO;

const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    algorithm: JWT_ALGO, // Secure default
  });
};

module.exports = {
  generateToken, // Exporting for reuse
};
