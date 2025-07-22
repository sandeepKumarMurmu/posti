const fs = require("fs");
const path = require("path");

const paths = {
  userPath: path.join(__dirname, "../dataStore/user.json"),
  postPath: path.join(__dirname, "../dataStore/posr.json"),
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

module.exports = {
  readData,
  updateData
};
