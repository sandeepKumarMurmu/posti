require("dotenv").config();
const jwt = require("jsonwebtoken");
const apiResponse = require("../apiResponse.common");
const handelStorage = require("../handelStorage.common");

const USER_PATH = process.env.USER_FILE_LOCATION;
const SECRET = process.env.JWT_SECRET;
const ALGORITHM = process.env.JWT_ALGO || "HS256"; // fallback to HS256

// ✅ Middleware to verify JWT token using specified algorithm
function verifyToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  const deviceId = req.headers["x-device-id"];

  if (!token) {
    return apiResponse.GlobalResponseHelper.unauthorized(
      res,
      "No token provided"
    );
  }

  try {
    if (!SECRET) throw new Error("JWT secret not set in environment");

    const decoded = jwt.verify(token, SECRET, { algorithms: ALGORITHM });

    const data = handelStorage.findDataBySpecificField(
      USER_PATH,
      "userId",
      decoded.userId
    );

    if (!data || deviceId !== decoded.deviceId) {
      return apiResponse.GlobalResponseHelper.notFound(res, "Please Login again.");
    }

    req.user = decoded; // Attach decoded payload to request object
    next();
  } catch (err) {
    console.log("errro : ",err)
    return apiResponse.GlobalResponseHelper.unauthorized(
      res,
      "Invalid or expired token"
    );
  }
}

module.exports = verifyToken;
