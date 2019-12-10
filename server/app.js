const express = require("express");
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./database.config");
const isEmail = require("validator/lib/isEmail");
const isLength = require("validator/lib/isLength");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// only for development not for production
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use((req, res, next) => {
    //console.log(req.user);
    next();
  });
}

const sendRes = (res, message) => {
  res.status(500).json({
    status: "error",
    message,
  });
};

app.post("/singin", (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "please provide eamil address and password",
    });
  } else if (!isEmail(email)) {
    return res.status(400).json({
      status: "fail",
      message: "invalid email address",
    });
  } else if (!isLength(password, { min: 6 })) {
    return res.status(400).json({
      status: "fail",
      message: "password must be more then 6 charcaters",
    });
  } else {
    db.select("email", "password")
      .from("login")
      .where({ email })
      .then(user => {
        if (!user.length)
          return res
            .status(404)
            .json({ message: "no account found with this email address" });
        bcryptjs.compare(password, user[0].password, (err, match) => {
          if (err) return sendRes(res, "someting went wrong...");
          if (match) {
            db.select("*")
              .from("users")
              .where({ email })
              .then(userData => {
                res.status(200).json({
                  status: "success",
                  data: userData[0],
                });
              });
          } else {
            res
              .status(200)
              .json({ status: "fail", message: "incorrect password" });
          }
        });
      });
  }
});

app.post("/register", (req, res, next) => {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "please provide name,email and password",
    });
  } else if (!/[a-z ]+/i.test(name)) {
    return res.status(400).json({
      status: "fail",
      message: "name only contain alpa value",
    });
  } else if (!isEmail(email)) {
    return res.status(400).json({
      status: "fail",
      message: "enter valid email address",
    });
  } else if (!isLength(password, { min: 6 })) {
    return res.status(400).json({
      status: "fail",
      message: "password must be more then 6 characters",
    });
  } else {
    bcryptjs.genSalt(12, (err, salt) => {
      if (err) return sendRes(res, "someting went wrong...");
      bcryptjs.hash(password, salt, (err, hash) => {
        if (err) return sendRes(res, "someting went wrong...");
        db.transaction(trx => {
          trx
            .insert({ email, password: hash })
            .into("login")
            .returning("email")
            .then(async () => {
              const user = await db("users").insert({ email, name }, "*");
              res.status(500).json({
                status: "success",
                data: user[0],
              });
            })
            .then(trx.commit)
            .catch(trx.rollback);
        }).catch(() => {
          res.status(404).json({
            status: "error",
            message: "some thing went wrong. unable to register",
          });
        });
      });
    });
  }
});
// get user
app.get("/profile/:id", async (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 36) {
    return res.status(404).json({
      status: "fail",
      message: "please provide valid id",
    });
  }
  try {
    const user = await db
      .select("*")
      .from("users")
      .where({ id });
    if (user.length) {
      res.status(200).json({
        status: "success",
        data: user[0],
      });
    } else {
      res.status(203).json({
        status: "success",
        message: "no such as user found",
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: "some thing went wrong..",
    });
  }
});

app.put("/image", async (req, res) => {
  const { id } = req.body;
  try {
    const userEntries = await db("users")
      .select("*")
      .increment("entries", 1)
      .where({ id })
      .returning("*");
    res.status(200).json({
      status: "success",
      data: userEntries[0],
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "some thing went wrong...",
    });
  }
});

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then(user => {
      res.status(200).json({
        status: "success",
        data: user,
      });
    });
});

module.exports = app;
