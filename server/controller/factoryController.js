const jwt = require("jsonwebtoken");
const multer = require("multer");
const jimp = require("jimp");
const catchError = require("../utils/catchError");
const ErrorHandler = require("../utils/errorHandler");

exports.authToken = id =>
    new Promise((resolve, reject) => {
        jwt.sign(
            { id },
            process.env.JWT_PRIVATE_KEY,
            {
                expiresIn: process.env.EXPIRES_IN,
            },
            (err, token) => {
                if (err) reject(err);
                else resolve(token);
            },
        );
    });

exports.resizePhoto = catchError(async (req, res, next) => {
    if (!req.file) return next();

    const [, ext] = req.file.mimetype.split("/");

    req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;

    const userPhoto = await jimp.read(req.file.buffer);
    userPhoto.resize(400, 400).quality(80);
    await userPhoto.writeAsync(`public/img/${req.file.filename}`);
    next();
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, callBack) => {
    if (file.mimetype.startsWith("image")) {
        callBack(null, true);
    } else {
        callBack(
            new ErrorHandler(
                "Not an image ! please upload only image file",
                400,
            ),
            false,
        );
    }
};

const upload = multer({
    storage,
    fileFilter,
});

exports.uploadUserPhoto = upload.single("photo");
