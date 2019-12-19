const Clarifai = require("clarifai");
const catchError = require("../utils/catchError");
const ErrorHandler = require("../utils/errorHandler");
const { runImage } = require("../utils/testImage");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY,
});

exports.detectFace = catchError(async (req, res, next) => {
  const { input } = req.body;
  runImage(input, async validStatus => {
    if (!input || validStatus === "error")
      return next(new ErrorHandler("please provide image address", 400));
    if (validStatus === "timeout")
      return next(new ErrorHandler("timeout please try again", 401));
    try {
      const respose = await app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        input,
      );
      res.status(200).json(respose);
    } catch {
      res.status(400).json({ status: "fail", message: "someting went wrong" });
    }
  });
});
