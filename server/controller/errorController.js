const catchError = require("../utils/catchError");

const sendErrorDev = () => {};
const sendErrorPro = (err, req, res, next) => {
  sendResponse(res, err.statusCode, { message: err.message });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
  //sendErrorPro(err, req, res, next);
};
