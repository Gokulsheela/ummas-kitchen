const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const controller=require("../controllers/productController.js");
const authController= require("../controllers/authController.js");
const cartController = require("../controllers/cartController.js");
const { protect } = require("../middleware/authMiddleware.js");
const uploadImage = require("../middleware/imageUpload.js");

router.get("/products",(controller.index));
router.get("/category",(controller.getCategory));
router.post("/cart",protect,(cartController.addToCart));

router.post("/newProductCategory",
    uploadImage.fields([
        {name: "thumbnail",maxCount:1},
    ]),(controller.newProductCategory));
router.post("/product/new",protect,
    uploadImage.fields([
        {name: "thumbnail",maxCount:1},
        {name: "gallery", maxCount:10}
    ]),wrapAsync(controller.new));

router.post("/admin/productVariant/new",wrapAsync(controller.createProductVariant));

router.get("/product/:id",wrapAsync(controller.showProduct));
router.put("/product/:id/update",protect,wrapAsync(controller.updateProduct));
router.delete("/product/:id",protect,wrapAsync(controller.destroyProduct));

module.exports = router;