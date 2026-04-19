const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const controller=require("../controllers/productController.js");
const authController= require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.get("/products",wrapAsync(controller.index) );
router.post("/product/new",protect,wrapAsync(controller.new));
router.get("/product/:id",wrapAsync(controller.showProduct));
router.put("/product/:id/update",wrapAsync(controller.updateProduct));
router.delete("/product/:id",wrapAsync(controller.destroyProduct));

// router.post("/signup",wrapAsync(authController.createSignupUser));
// router.post("/login",wrapAsync(authController.loginUser));
// router.post("/refresh",wrapAsync(authController.refreshToken));
module.exports = router;