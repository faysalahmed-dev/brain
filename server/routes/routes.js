const { Router } = require("express");
const {
  singin,
  register,
  profile,
  imageEntriesCount,
  checkEmail_Password,
  resetPassword,
  forgetPassword,
  updateAccount,
  updatePassword,
  deleteAccount,
  logout,
  protectRoute,
  uploadUserPhoto,
  resizePhoto,
} = require("../controller/controller");
const { detectFace } = require("../controller/clarifaiController");

const router = Router();
// below route is for public
router.post("/singin", checkEmail_Password, singin);
router.post("/register", checkEmail_Password, register);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:resetToken", resetPassword);

// procted route
router.get("/account", protectRoute, profile);
router.delete("/delete-account", protectRoute, deleteAccount);
router.get("/logout", protectRoute, logout);
router.put("/image-entries", protectRoute, imageEntriesCount);
router.put(
  "/update-account",
  protectRoute,
  uploadUserPhoto,
  resizePhoto,
  updateAccount,
);
router.put("/update-password", protectRoute, updatePassword);
router.post("/detect-face", detectFace);
// router.get("/test", (req, res) => {
//   console.log(req.headers);
//   res.status(200).json({ status: "success" });
// });

module.exports = router;
