const fs = require("fs");
const path = require("path");

const paths = {
  userPath: path.join(__dirname, "../dataStore/user.json"),
  postPath: path.join(__dirname, "../dataStore/post.json"),
};

// ✅ Read data from JSON file
function readData(type = "") {
  if (!type?.trim() || !paths[type]) {
    throw new Error("No data file found for given type.");
  }

  try {
    if (!fs.existsSync(paths[type])) {
      throw new Error("Data file does not exist.");
    }

    const raw = fs.readFileSync(paths[type], "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("Failed to read data:", err.message);
    throw new Error("Internal server error while reading data.");
  }
}

// ✅ Append new data to JSON file
function updateData(type = "", updated = []) {
  if (!type?.trim() || !paths[type]) {
    throw new Error("Invalid file type.");
  }

  try {
    fs.writeFileSync(paths[type], JSON.stringify(updated, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Failed to update data:", err.message);
    throw new Error("Internal server error while updating data.");
  }
}

function findDataBySpecificField(path = "", key = "", value) {
  if (!path || !key) {
    throw new Error("Invalid parameter or storage selected.");
  }

  try {
    const data = readData(path);
    if (!Array.isArray(data)) {
      throw new Error("No data found.");
    }

    const index = data.findIndex((item) => item[key] === value);
    if (index === -1) return null;

    return {
      item: data[index],
      index,
    };
  } catch (error) {
    throw new Error(error?.message || "Unable to find data.");
  }
}

function updateByField(
  type = "",
  matchKey = "",
  matchValue = "",
  updateFields = {}
) {
  if (!type || !matchKey || !matchValue || typeof updateFields !== "object") {
    throw new Error("Invalid parameters.");
  }

  const data = readData(type);
  const index = data.findIndex((item) => item[matchKey] === matchValue);
  if (index === -1) return false;

  data[index] = {
    ...data[index],
    ...updateFields,
  };

  updateData(type, data);
  return true;
}

function deleteByField(type = "", matchKey = "", matchValue = "") {
  if (!type || !matchKey || !matchValue) {
    throw new Error("Invalid parameters.");
  }

  const data = readData(type);
  const index = data.findIndex((item) => item[matchKey] === matchValue);
  if (index === -1) return false;

  data.splice(index, 1); // remove the matched item
  updateData(type, data);
  return true;
}


module.exports = {
  readData,
  updateData,
  findDataBySpecificField,
  updateByField,
  deleteByField
};
