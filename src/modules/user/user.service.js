require("dotenv").config();
const USER_FILE_LOCATION = process.env.USER_FILE_LOCATION;

const { v4: uuidv4 } = require("uuid");
const apiResponse = require("../../common/apiResponse.common");
const handelPassword = require("../../common/password.common");
const handelToken = require("../../common/generateToken.common");
const handelDataStore = require("../../common/handelStorage.common");

async function create(req, res) {
  try {
    const { name, userName, email, password, gender } = req.body;
    const deviceId = req.headers["x-device-id"];

    if (
      !name?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !gender?.trim() ||
      !userName?.trim()
    ) {
      return apiResponse.GlobalResponseHelper.badRequest(
        res,
        "Any of the mendatory field is missing"
      );
    }

    const existingData = handelDataStore.readData(USER_FILE_LOCATION);

    // check if email or username existing
    const isExisting = isUserAvailable(existingData, email, userName);

    if (!isExisting) {
      return apiResponse.GlobalResponseHelper.badRequest(
        res,
        "Please try with different email/user name."
      );
    }

    const payload = {
      userId: uuidv4(),
      userName,
      userEmail: email,
      userFullName: name,
      userGender: gender,
      userPassword: await handelPassword.hashPassword(password),
      userDeviceId: deviceId,
    };

    existingData.push(payload);

    handelDataStore.updateData(USER_FILE_LOCATION, existingData);
    const tokenPayload = {
      userId: payload.userId,
      deviceId: payload.userDeviceId,
    };

    const token = handelToken.generateToken(tokenPayload);

    res.setHeader("Authorization", `Bearer ${token}`);

    return apiResponse.GlobalResponseHelper.created(
      res,
      "User created successfully.",
      []
    );
  } catch (error) {
    console.log(error);
    return apiResponse.GlobalResponseHelper.error(res, "Internal Server Error");
  }
}

async function authenticateUser(req, res) {
  try {
    const { userName = "", password = "" } = req.body;
    const deviceId = req.headers["x-device-id"] ?? "";

    if (!userName || !password || !deviceId)
      return apiResponse.GlobalResponseHelper.badRequest(
        res,
        "Invalida input provided"
      );
    const userDb = handelDataStore.readData(USER_FILE_LOCATION);

    const isUserExisting = findUserByUsername(userDb, userName, "userName");

    console.log("data : ", isUserExisting);
    if (!isUserExisting) {
      return apiResponse.GlobalResponseHelper.unauthorized(
        res,
        "Invalid credentials provided."
      );
    }

    const comparePassword = await handelPassword.verifyPassword(
      password,
      isUserExisting.user.userPassword
    );

    if (!comparePassword) {
      return apiResponse.GlobalResponseHelper.unauthorized(
        res,
        "Invalid credentials provided."
      );
    }

    if (isUserExisting.user.deviceId !== deviceId) {
      userDb[isUserExisting.index].deviceId = deviceId;
      handelDataStore.updateData(USER_FILE_LOCATION, userDb);
    }

    const tokenPayload = {
      deviceId,
      userId: isUserExisting.user.userId,
    };

    const token = handelToken.generateToken(tokenPayload);

    res.setHeader("Authorization", `Bearer ${token}`);

    return apiResponse.GlobalResponseHelper.ok(res, "Login successfull.");
  } catch (error) {
    console.log("error : ", error);
    return apiResponse.GlobalResponseHelper.error(res, "Internal server error");
  }
}

function isUserAvailable(users, email, username) {
  return !users.some(
    (user) => user.userEmail === email || user.userName === username
  );
}

function findUserByUsername(data = [], val = "", key = "") {
  if (!Array.isArray(data) || !val.trim()) return null;

  const index = data.findIndex((user) => user[key] === val);
  if (index === -1) return null;

  return {
    user: data[index],
    index,
  };
}

module.exports = { create, authenticateUser };
