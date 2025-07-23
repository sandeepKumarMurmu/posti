const express = require("express");

const userRoutes = require("../modules/user/user.routes");
const postRoutes = require("../modules/post/post.routes");

const app = express();

app.use("/user", userRoutes);
app.use("/post", postRoutes);

module.exports = app;
