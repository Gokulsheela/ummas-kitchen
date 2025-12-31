const product = require("../models/productModel.js");
// const getProducts = async (req,res) => {
//     const products = await product.find();
//     // res.json(products);
//     res.send("hi this is products listings")
// };

module.exports.index = (async (req,res)=>{
    const products = await product.find();
     res.json(products)
});

const getProductById = async (req,res) => {
    const product = await product.findById(req.params.id);
    res.json(product);
};

