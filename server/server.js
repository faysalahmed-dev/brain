const express = require("express");
const fs = require("fs");
const bcryptjs = require("bcryptjs");
const cors = require("cors");

let data = JSON.parse(
  fs.readFileSync("./data/user.json", { encoding: "utf-8" }),
);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/singin", (req, res, next) => {
  const { email, password } = req.body;

  for (let user of data) {
    if (email === user.email) {
      bcryptjs.compare(password, user.password, (err, match) => {
        if (match) {
          return res.status(200).json({ message: "your logged in" });
        }
      });
    }
    res.status(400).json({ message: "your are not logged in" });
  }
});

app.post("/register", (req, res, next) => {
  const newData = [...data];
  bcryptjs.genSalt(12, (err, salt) => {
    bcryptjs.hash(req.body.password, salt, (err, hash) => {
      newData.push({
        ...req.body,
        id: (Math.random() * 5).toFixed(4),
        password: hash,
      });
      data = newData;
      fs.writeFile("./data/user.json", JSON.stringify(newData), err => {
        if (err) {
          res.status(400).json({
            message: err,
          });
        } else {
          res.status(200).json({ message: "account created" });
        }
      });
    });
  });
});
// get user
app.get("/profile/:id", (req, res, next) => {
  const { id } = req.params;
  for (let user of data) {
    if (user.id === id) {
      return res.status(200).json({ user });
    }
  }
  return res.status(400).json({ message: "user is not found" });
});

app.get("/", (req, res) => {
  res.status(200).json({
    user: data,
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
