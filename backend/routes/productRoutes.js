const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const controller=require("../controllers/productController.js");
const authController= require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.get("/products",(controller.index));
router.post("/product/new",protect,wrapAsync(controller.new));
router.get("/product/:id",wrapAsync(controller.showProduct));
router.put("/product/:id/update",protect,wrapAsync(controller.updateProduct));
router.delete("/product/:id",protect,wrapAsync(controller.destroyProduct));

module.exports = router;