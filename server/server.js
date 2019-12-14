const dotenv = require("dotenv");

process.on("uncaughtException", err => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
  }
  process.exit(1);
});

dotenv.config({ path: "./.env.development.local" });
const app = require("./app");

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});

process.on("unhandledRejection", err => {
  if (process.env.NODE_ENV === "development") {
    console.log(err);
    console.log("Unhandled Rejection Shutting Down...");
  }
  server.close(() => process.exit(1));
});
