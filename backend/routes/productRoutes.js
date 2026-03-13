const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const controller=require("../controllers/productController.js");

router.get("/products",wrapAsync(controller.index) );
router.post("/product/new",wrapAsync(controller.new));
router.get("/product/:id",wrapAsync(controller.showProduct));
router.put("/product/:id/update",wrapAsync(controller.updateProduct));
router.delete("/product/:id",wrapAsync(controller.destroyProduct));

module.exports = router;