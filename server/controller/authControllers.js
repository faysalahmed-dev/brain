const db = require("../database.config");
const isEmail = require("validator/lib/isEmail");
const isLength = require("validator/lib/isLength");
const { comparePassword, hashPassword } = require("../utils/hashPassword");
const sendResponse = require("../utils/sendResponse");
const catchError = require("../utils/catchError");
const ErrorHandler = require("../utils/errorHandler");
const {
    createHash,
    passwordResetToken,
} = require("../utils/passwordResetToken");
const { authToken } = require("./factoryController");

exports.checkEmail_Password = (req, res, next) => {
    const { email, password } = req.body;
    if (
        !email ||
        !password ||
        !isEmail(email.trim()) ||
        !isLength(password.trim(), { min: 6 })
    ) {
        return next(
            new ErrorHandler("please cheack your email and password", 404),
        );
    }
    next();
};

exports.singin = catchError(async (req, res, next) => {
    let { email, password } = req.body;

    const user = await db
        .select("email", "password")
        .from("login")
        .where({ email: email.trim() });
    if (!user.length)
        return next(
            new ErrorHandler("no account found with this email address", 401),
        );

    const isPasswordMatch = await comparePassword(
        password.trim(),
        user[0].password,
    ); // return boolen value

    if (isPasswordMatch) {
        const userData = await db
            .select("*")
            .from("users")
            .where({ email: email.trim() });

        const token = await authToken(userData[0].id);
        return sendResponse(res, 200, { token, data: userData[0] });
    }
    sendResponse(res, 401, { message: "your email or password is incorrect" });
});

exports.register = catchError(async (req, res, next) => {
    const { name, password, email } = req.body;

    if (!name || !/[a-z ]+/i.test(name.trim())) {
        return next(new ErrorHandler("please check your name", 401));
    }

    const hashedPassword = await hashPassword(password.trim());
    db.transaction(trx => {
        trx.insert({
            email: email.trim().toLowerCase(),
            password: hashedPassword,
        })
            .into("login")
            .returning("email")
            .then(loginEamil => {
                return trx("users")
                    .returning("*")
                    .insert({
                        email: loginEamil[0].toLowerCase(),
                        name: name.trim(),
                    })
                    .then(async user => {
                        const token = await authToken(user[0].id);
                        return sendResponse(res, 201, {
                            token,
                            data: user[0],
                        });
                    })
                    .catch(next);
            })
            .then(trx.commit)
            .catch(err => {
                next(err);
                trx.rollback(err);
            });
    }).catch(next);
});

exports.forgetPassword = catchError(async (req, res, next) => {
    const { email } = req.body;
    if (!email || !isEmail(email.trim()))
        return next(
            new ErrorHandler("please provide valid email address"),
            400,
        );

    const userEamil = await db("login")
        .select("email")
        .where({ email });
    if (!userEamil.length)
        return next(
            new ErrorHandler("no user found with this email address", 400),
        );

    try {
        await db("login")
            .update({
                reset_token: passwordResetToken(createHash()),
                reset_token_expried: Date.now() + 20 * 60 * 1000, // 10 minite
            })
            .where({ email });
        sendResponse(res, 200, {
            message: "password reset token send to your email address.",
        });
    } catch {
        await db("login")
            .update({
                reset_token: null,
                reset_token_expried: null, // 10 minite
            })
            .where({ email });
        return next(
            new ErrorHandler(
                "There was an error to please try again later",
                500,
            ),
        );
    }
});
exports.resetPassword = catchError(async (req, res, next) => {
    const { resetToken } = req.params;
    if (!resetToken || resetToken.length < 50) {
        return next(new ErrorHandler("invalid token", 400));
    }

    const user = await db("login")
        .select("*")
        .where({
            reset_token: resetToken.trim(),
        });

    // if (!user.length || !user[0].reset_token_expried < Date.now()) {
    //   return next(new ErrorHandler("token is invalid and expried", 404));
    // }

    const { password } = req.body;
    if (!password || !isLength(password))
        return next(new ErrorHandler("check your password", 400));

    const hashedPassword = await hashPassword(password.trim());

    await db("login")
        .update({
            password: hashedPassword,
            reset_token: null,
            reset_token_expried: null,
            password_change_at: new Date(),
        })
        .where({ email: user[0].email });

    const token = await authToken(user[0].id);
    const userData = await db
        .select("*")
        .from("users")
        .where({ email: user[0].email });

    sendResponse(res, 200, {
        token,
        data: userData[0],
    });
});
