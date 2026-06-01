const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const authController= require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/signup",wrapAsync(authController.createSignupUser));
router.post("/login",wrapAsync(authController.loginUser));
router.post("/refresh",wrapAsync(authController.refreshToken));
router.post("/logut",wrapAsync(authController.logoutUser));
router.get("/me",protect,wrapAsync(authController.getCurrentUser));
module.exports = router;