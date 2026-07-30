const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const cartController = require("../controllers/cartController.js");
const { protect } = require("../middleware/authMiddleware.js");

console.log("----------inside the cartRoute");

router.post("/addCart",protect,wrapAsync(cartController.addToCart));
router.get("/",protect,wrapAsync(cartController.showCartItem));
router.delete("/:id",protect,wrapAsync(cartController.deleteCartItem));
router.put("/:id",protect,wrapAsync(cartController.updateCartQuantity));

router.post("/checkout",protect,wrapAsync(cartController.checkout));
module.exports =router;