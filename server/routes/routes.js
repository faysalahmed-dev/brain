const { Router } = require("express");

const {
  singin,
  register,
  profile,
  image,
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

const router = Router();
// below route is for public
router.post("/singin", checkEmail_Password, singin);
router.post("/register", checkEmail_Password, register);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:resetToken", resetPassword);

// procted route
router.use(protectRoute);
router.get("/account", profile);
router.delete("/delete-account", deleteAccount);
router.get("/logout", logout);
router.put("/image", image);
router.put("/update-account", uploadUserPhoto, resizePhoto, updateAccount);
router.put("/update-password", updatePassword);

module.exports = router;
