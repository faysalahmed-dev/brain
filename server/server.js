const dotenv = require("dotenv");
dotenv.config({ path: "./.env.development.local" });
const app = require("./app");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listen on port ${PORT}`);
});
