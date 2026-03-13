const product = require("../models/productModel.js");
const ExpressError = require("../utils/ExpressError.js");
// const getProducts = async (req,res) => {
//     const products = await product.find();
//     // res.json(products);
//     res.send("hi this is products listings")
// };

module.exports.index = (async (req,res)=>{
    const products = await product.find();
    if(!products){
        throw new ExpressError(404,"product not found");
    }
     res.json(products)
});

module.exports.new = (async(req,res)=>{
    const newProduct = new product(req.body);
    await newProduct.save();
    res.json({ message: "Product saved successfully" });

});

module.exports.showProduct = (async(req,res)=> {
    const { id } = req.params;
    const item = await product.findById(id) ;
    res.json(item);
})

module.exports.updateProduct = (async(req,res)=> {
    const { id } = req.params;
   const updateProduct = await product.findByIdAndUpdate(id,{...req.body});
   console.log(updateProduct);
    res.json({ message: "Product saved successfully" });
});

module.exports.destroyProduct = (async(req,res)=> {
    const { id } = req.params;
    console.log(id);
    await product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" })
})
