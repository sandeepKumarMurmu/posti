require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const apiResponse = require("../../common/apiResponse.common");
const handelStorage = require("../../common/handelStorage.common");

const POST_PATH = process.env.POST_FILE_LOCATION;
const USER_PATH = process.env.USER_FILE_LOCATION;

function getPostService(req, res) {
  try {
    const data = handelStorage.readData(POST_PATH);
    return apiResponse.GlobalResponseHelper.ok(res, "Post data fetched.", data);
  } catch (error) {
    console.log("err : ", error);
    return apiResponse.GlobalResponseHelper.error(
      res,
      "Internal Server Error."
    );
  }
}

function createPostService(req, res) {
  try {
    const { postDescription = "", postTittle = "" } = req.body;
    const { userId } = req.user;

    const data = handelStorage.readData(POST_PATH);

    const postPayload = {
      userId,
      postId: `post-${uuidv4()}`,
      postTittle,
      postDescription,
      postLikeCount: 0,
      postDisLikeCount: 0,
    };

    data.push(postPayload);

    handelStorage.updateData(POST_PATH, data);

    return apiResponse.GlobalResponseHelper.created(res, "Post created.", []);
  } catch (error) {
    return apiResponse.GlobalResponseHelper.error(
      res,
      "Internal Server Error."
    );
  }
}

function getPostByPostId(req, res) {
  try {
    const { id = "" } = req.params;

    const postData = handelStorage.findDataBySpecificField(
      POST_PATH,
      "postId",
      id
    );

    if (!postData) {
      return apiResponse.GlobalResponseHelper.notFound(res, "No post found.");
    }

    const userData = handelStorage.findDataBySpecificField(
      USER_PATH,
      "userId",
      postData.item.userId
    );

    if (!userData) {
      return apiResponse.GlobalResponseHelper.notFound(res, "No data found");
    }

    const finalData = {
      userId: userData.item.userId,
      userName: userData.item.userName,
      postId: postData.item.postId,
      postTittle: postData.item.postTittle,
      postDescription: postData.item.postDescription,
      postLikeCount: postData.item.postLikeCount,
      postDisLikeCount: postData.item.postDisLikeCount,
    };
    return apiResponse.GlobalResponseHelper.created(
      res,
      "Post fetched",
      finalData
    );
  } catch (error) {
    return apiResponse.GlobalResponseHelper.error(
      res,
      "Internal Server Error."
    );
  }
}

function updatePostByPostId(req, res) {
  try {
    const { id = "" } = req.params;
    const { postLikeCount = 0 } = req.body;

    const postData = handelStorage.findDataBySpecificField(
      POST_PATH,
      "postId",
      id
    );

    if (!postData) {
      return apiResponse.GlobalResponseHelper.notFound(res, "No post found.");
    }

    const updateObj = {};
    if (postLikeCount > 0) {
      updateObj.postLikeCount = +postData.item.postLikeCount + 1;
    } else {
      updateObj.postDisLikeCount = +postData.item.postDisLikeCount - 1;
    }

    const updatedData = handelStorage.updateByField(
      POST_PATH,
      "postId",
      id,
      updateObj
    );

    if (!updatedData) {
      return apiResponse.GlobalResponseHelper.badRequest(
        res,
        "Unable to update data."
      );
    }
    return apiResponse.GlobalResponseHelper.created(res, "Post Updated", []);
  } catch (error) {
    return apiResponse.GlobalResponseHelper.error(
      res,
      "Internal Server Error."
    );
  }
}

function deletePostByPostId(req, res) {
  try {
    const { id = "" } = req.params;

    const postData = handelStorage.deleteByField(
      POST_PATH,
      "postId",
      id
    );

    if (!postData) {
      return apiResponse.GlobalResponseHelper.badRequest(res, "Unable to delete post.");
    }
    
    return apiResponse.GlobalResponseHelper.created(res, "Post Deleted.", []);
  } catch (error) {
    return apiResponse.GlobalResponseHelper.error(
      res,
      "Internal Server Error."
    );
  }
}


module.exports = {
  getPostService,
  createPostService,
  getPostByPostId,
  updatePostByPostId,
  deletePostByPostId
};
