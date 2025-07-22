// globalResponseHelper.js

const send = (res, httpStatus, message, data = null) => {
  const isSuccess = httpStatus >= 200 && httpStatus < 300;

  const responseBody = {
    status: isSuccess ? "success" : "failed",
    message,
    data,
  };

  return res.status(httpStatus).json(responseBody);
};

const GlobalResponseHelper = {
  send,

  ok: (res, message, data = null) => send(res, 200, message, data),
  created: (res, message, data = null) => send(res, 201, message, data),

  badRequest: (res, message, data = null) => send(res, 400, message, data),

  notFound: (res, message = "Resource not found") => send(res, 404, message),

  error: (res, message = "Something went wrong") => send(res, 500, message),

  unauthorized: (res, message = "Unauthorized") => send(res, 401, message),
  forbiden: (res, message = "Unauthorized") => send(res, 403, message),
};

module.exports = { GlobalResponseHelper, send };
