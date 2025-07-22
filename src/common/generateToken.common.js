const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-strong-secret';
const JWT_EXPIRES_IN = '4h'; // Default token expiry

const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    algorithm: 'HS256', // Secure default
  });
};

module.exports = {
  generateToken, // Exporting for reuse
};
