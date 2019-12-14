const jwt = require("jsonwebtoken");
const multer = require("multer");
const jimp = require("jimp");
const db = require("../database.config");
const isEmail = require("validator/lib/isEmail");
const isLength = require("validator/lib/isLength");
const isJWT = require("validator/lib/isJWT");
const { comparePassword, hashPassword } = require("../utils/hashPassword");
const sendResponse = require("../utils/sendResponse");
const catchError = require("../utils/catchError");
const ErrorHandler = require("../utils/errorHandler");
const {
  createHash,
  passwordResetToken,
} = require("../utils/passwordResetToken");
const { filterObject } = require("../utils/helper");
const { promisify } = require("util");

const authToken = id =>
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

exports.checkEmail_Password = (req, res, next) => {
  const { email, password } = req.body;
  if (
    !email ||
    !password ||
    !isEmail(email.trim()) ||
    !isLength(password.trim(), { min: 6 })
  ) {
    return next(new ErrorHandler("please cheack your email and password", 404));
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
    trx
      .insert({ email: email.trim().toLowerCase(), password: hashedPassword })
      .into("login")
      .returning("email")
      .then(async loginEamil => {
        return trx("users")
          .returning("*")
          .insert({ email: loginEamil[0].toLowerCase(), name: name.trim() })
          .then(async user => {
            const token = await authToken(user[0].id);
            return sendResponse(res, 201, {
              token,
              data: user[0],
            });
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  });
});

exports.profile = catchError(async (req, res, next) => {
  const { id } = req.user;
  if (!id)
    return next(
      new ErrorHandler("someting went wrong.please login again", 404),
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

exports.image = catchError(async (req, res) => {
  const { id } = req.user;
  const userEntries = await db("users")
    .select("*")
    .increment("entries", 1)
    .where({ id })
    .returning("*");
  sendResponse(res, 200, { data: userEntries[0] });
});

exports.forgetPassword = catchError(async (req, res, next) => {
  const { email } = req.body;
  if (!email || !isEmail(email.trim()))
    return next(new ErrorHandler("please provide valid email address"), 400);

  const userEamil = await db("login")
    .select("email")
    .where({ email });
  if (!userEamil.length)
    return next(new ErrorHandler("no user found with this email address", 400));

  try {
    await db("login")
      .update({
        reset_token: passwordResetToken(createHash()),
        reset_token_expried: Date.now() + 20 * 60 * 1000, // 10 minite
      })
      .where({ email });
    sendResponse(res, 200, { message: "check your email address" });
  } catch {
    await db("login")
      .update({
        reset_token: null,
        reset_token_expried: null, // 10 minite
      })
      .where({ email });
    return next(
      new ErrorHandler("There was an error to please try again later", 500),
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
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

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
    return next(new ErrorHandler("user no longer exist with this token", 401));
  }
  const val = await db("login")
    .select("password_change_at")
    .where({ email: currentUser[0].email });
  // 4) check if user chenge password after token was issued
  if (iat < parseInt(val[0].password_change_at.getTime() / 1000)) {
    return next(
      new ErrorHandler("User Recently Change Password Please Login Again", 401),
    );
  }
  req.user = currentUser[0];
  console.log(currentUser[0]);
  next();
};

exports.updateAccount = catchError(async (req, res, next) => {
  const { id } = req.user;
  if (req.body.password)
    return next(new ErrorHandler("this route is not for update password", 404));

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
  console.log("update password");
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
      new ErrorHandler("new password is does not match to old password", 400),
    );
  }

  const hashedPassword = await hashPassword(newPassword.trim());

  await db("login")
    .update({ password: hashedPassword, password_change_at: new Date() })
    .where({ email });

  const token = await authToken(id);
  sendResponse(res, 200, { token, data: req.user });
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, callBack) => {
  if (file.mimetype.startsWith("image")) {
    callBack(null, true);
  } else {
    callBack(
      new ErrorHandler("Not an image ! please upload only image file", 400),
      false,
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizePhoto = catchError(async (req, res, next) => {
  if (!req.file) return next();

  const [, ext] = req.file.mimetype.split("/");

  req.file.filename = `user-${req.user.id}-${Date.now()}.${ext}`;

  const userPhoto = await jimp.read(req.file.buffer);
  userPhoto.resize(400, 400).quality(80);
  await userPhoto.writeAsync(`public/img/${req.file.filename}`);
  next();
});
