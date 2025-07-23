const postService = require("./post.service");
const { generatePostValidator } = require("./post.validator");
const bodyValidationResult = require("../../common/middelware/bodyValidatio.middlewar");

const getPost = [postService.getPostService];

const createPost = [
  generatePostValidator(["postTittle", "postDescription"]),
  bodyValidationResult,
  postService.createPostService,
];
const getPostById = [postService.getPostByPostId];

const updatePostById = [
  generatePostValidator(["postLikeCount"]),
  bodyValidationResult,
  postService.updatePostByPostId,
];

const deletePostById = [postService.deletePostByPostId];

module.exports = {
  getPost,
  createPost,
  getPostById,
  updatePostById,
  deletePostById
};
