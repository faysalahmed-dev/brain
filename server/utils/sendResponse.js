module.exports = (res, statusCode, data) => {
  res.cookie("token", data.token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    /**
     * req.headers['x-forwarded-porto'] only for heroku
     *  req.secure is build in express
     */
    //secure: req.secure || req.headers["x-forwarded-porto"] === "https",
  });
  res.status(statusCode).json({
    status: statusCode < 400 ? "success" : "fail",
    ...data,
  });
};
