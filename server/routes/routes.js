const { Router } = require("express");
const {
    profile,
    imageEntriesCount,
    updateAccount,
    updatePassword,
    deleteAccount,
    logout,
    protectRoute,
} = require("../controller/userController");
const {
    singin,
    register,
    checkEmail_Password,
    resetPassword,
    forgetPassword,
} = require("../controller/authControllers");
const {
    resizePhoto,
    uploadUserPhoto,
} = require("../controller/factoryController");
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
