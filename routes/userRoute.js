const express = require("express");
const router = express.Router();
const {registerUser, loginUser, logoutUser, forgetPassword,resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser} = require("../controllers/userController");
const { isAuthenticatedUser,isAutherisedRoles } = require("../middleware/auth");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forget").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,isAutherisedRoles("admin"),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser,isAutherisedRoles("admin"),getSingleUser)

module.exports = router;