const jwt = require("jsonwebtoken");
const db = require("../database.config");
const isLength = require("validator/lib/isLength");
const isJWT = require("validator/lib/isJWT");
const { comparePassword, hashPassword } = require("../utils/hashPassword");
const sendResponse = require("../utils/sendResponse");
const catchError = require("../utils/catchError");
const ErrorHandler = require("../utils/errorHandler");
const { filterObject } = require("../utils/helper");
const { promisify } = require("util");
const { authToken } = require("./factoryController");

exports.profile = catchError(async (req, res, next) => {
    const { id } = req.user;
    if (!id)
        return next(
            new ErrorHandler("someting went wrong.please login again", 401),
        );

    const user = await db
        .select("*")
        .from("users")
        .where({ id });
    if (user.length) {
        return sendResponse(res, 200, { data: user[0] });
    }
    sendResponse(res, 200, { message: "no such as user found" });
});

exports.imageEntriesCount = catchError(async (req, res) => {
    const { id } = req.user;
    const userEntries = await db("users")
        .select("*")
        .increment("entries", 1)
        .where({ id })
        .returning("*");
    sendResponse(res, 200, { data: userEntries[0] });
});

// this api is for update eamil and name
/**note :not for password */
exports.deleteAccount = catchError(async (req, res, next) => {
    const { email } = req.user;
    await db("login")
        .update({ active: false })
        .where({ email });

    sendResponse(res, 204, { message: "success" });
});
exports.logout = (req, res, next) => {
    res.cookie("token", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
};

exports.protectRoute = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
        token = authorization.split(" ")[1];
    }
    // else if (req.cookies.token) {
    //   token = req.cookies.token;
    // }

    if (!token || !isJWT(token)) {
        return next(
            new ErrorHandler(
                "you are not logged in! please login or create new Account",
                401,
            ),
        );
    }

    const { id, iat } = await promisify(jwt.verify)(
        token,
        process.env.JWT_PRIVATE_KEY,
    );

    const currentUser = await db("users")
        .select("*")
        .where({ id });
    if (!currentUser.length) {
        return next(
            new ErrorHandler("user no longer exist with this token", 401),
        );
    }
    const val = await db("login")
        .select("password_change_at")
        .where({ email: currentUser[0].email });
    // 4) check if user chenge password after token was issued
    if (iat < parseInt(val[0].password_change_at.getTime() / 1000)) {
        return next(
            new ErrorHandler(
                "User Recently Change Password Please Login Again",
                401,
            ),
        );
    }
    req.user = currentUser[0];
    // console.log(currentUser[0]);
    next();
};

exports.updateAccount = catchError(async (req, res, next) => {
    const { id } = req.user;
    if (req.body.password)
        return next(
            new ErrorHandler("this route is not for update password", 406),
        );

    const field = ["name"];
    const fileterOutObj = filterObject(req.body, field);
    if (req.file) fileterOutObj.photo = req.file.filename;

    const updatedUser = await db("users")
        .update(fileterOutObj)
        .where({ id })
        .returning("*");
    sendResponse(res, 200, { data: updatedUser[0] });
});

exports.updatePassword = catchError(async (req, res, next) => {
    const { password, newPassword } = req.body;
    if (
        !password ||
        !newPassword ||
        !isLength(password) ||
        !isLength(newPassword)
    ) {
        return next(new ErrorHandler("check your password", 400));
    }

    const { email, id } = req.user;
    const userOldPassword = await db("login")
        .select("password")
        .where({ email });
    //2 check new password is match old password
    const isPasswordMatch = await comparePassword(
        password.trim(),
        userOldPassword[0].password,
    );

    if (!isPasswordMatch) {
        return next(
            new ErrorHandler(
                "new password is does not match to old password",
                400,
            ),
        );
    }

    const hashedPassword = await hashPassword(newPassword.trim());

    await db("login")
        .update({ password: hashedPassword, password_change_at: new Date() })
        .where({ email });

    const token = await authToken(id);
    sendResponse(res, 200, { token, data: req.user });
});
