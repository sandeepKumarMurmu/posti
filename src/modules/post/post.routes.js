const express = require("express");

const verifyToken = require("../../common/middelware/verifyToken.middleware");
const postController = require("./post.controller");

const router = express.Router();

router.get("/", verifyToken, postController.getPost);
router.post("/", verifyToken, postController.createPost);
router.get("/:id", verifyToken, postController.getPostById);
router.put("/:id", verifyToken, postController.updatePostById);
router.delete("/:id", verifyToken, postController.deletePostById);

module.exports = router;
