const express = require("express");
const router = express.Router();
const  { getProducts, getProductById } = require("../controllers/productController.js");

router.get("/products", getProducts);
router.get("/:id", getProductById);

module.exports = router;