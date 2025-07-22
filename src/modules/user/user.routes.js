const express = require("express");

const userController = require("./user.controller");

const router = express.Router();

router.post("/", userController.createUser);
router.post("/auth", userController.autUser);

module.exports = router;
