const path = require("path");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const compression = require("compression");
const morgan = require("morgan");
const rateLimiter = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const ErrorHandler = require("./utils/errorHandler");
const globalErrorController = require("./controller/errorController");

const route = require("./routes/routes");

const app = express();
app.enable("trust proxy");
app.use(helmet());
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const limiter = rateLimiter({
    windowMs: 60 * 60 * 1000,
    max: 100,
    message: "Too many request from this ip. please try again in an hour ",
});
app.use(limiter);
app.use(xss());
app.use(compression());
// only for development not for production
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    app.use((req, res, next) => {
        console.log(req.headers);
        next();
    });
}
app.use("/api/v1/", route);

app.all("*", (req, res, next) => {
    next(
        new ErrorHandler(`can't find ${req.originalUrl} in the server !`, 404),
    );
});

app.use(globalErrorController);

module.exports = app;
