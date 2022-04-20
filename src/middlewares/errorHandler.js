import ApiError from "../utils/errorClass.js";

const defaultErrorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found`;
    error = new ApiError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = new ApiError(message, 400);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    // map over the error and return error response
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ApiError(message, 400);
  }

    // Mongoose validation error
    if (err.name === "JsonWebTokenError") {
      // map over the error and return error response
      const message = "Authentication Error"
      error = new ApiError(message, 400);
    }

      // Mongoose validation error
      if (err.name === "TokenExpiredError") {
        // map over the error and return error response
        const message = "Authentication Error"
        error = new ApiError(message, 400);
      }

  console.log("err", err);
  console.log("error", error);

  res.status(error.statusCode || 500).send({
    success: false,
    error: error.message || "Server Error",
  });
};

export default defaultErrorHandler;
