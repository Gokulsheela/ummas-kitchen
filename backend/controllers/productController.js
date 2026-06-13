const product2 = require("../models/product/product.model.js");
const catagory = require("../models/product/category.model.js");
const product = require("../models/product/product.model.js");
const ExpressError = require("../utils/ExpressError.js");
const getProducts = async (req,res) => {
    const products = await product.find();
    // res.json(products);
    res.send("hi this is products listings")
};

module.exports.index = (async (req,res)=>{
    const products = await product.find();
   
     res.status(200).json({
        success:true,
        data:products
     });
});

module.exports.new = (async(req,res)=>{
    console.log("req.file:", req.file);
console.log("req.files:", req.files);
console.log("content-type:", req.headers["content-type"]);

    const thumbnail = req.files.thumbnail?.[0]
            ? {
                url: `/uploads/${req.files.thumbnail[0].filename}`,
            altText: req.body.title || ""
            } : null ;

    const gallery = req.files.gallery?.map(file => ({
        url: `/uploads/${file.filename}`,
        altText: req.body.title || ""
    })) || [];

    const newProduct = new product({
        ...req.body,
        thumbnail,
        gallery
    });
    console.log(newProduct);
   await newProduct.save();
  
    res.status(201).json({ 
        sucess: true,
        message: "Product saved successfully" });

});

module.exports.showProduct = (async(req,res)=> {
    const { id } = req.params;
    const item = await product.findById(id) ;
    if(!item){
        throw new ExpressError(404,"Product Not Found");
    }
    res.status(200).json({
        sucess : true,
        data : item
    });
})

module.exports.updateProduct = (async(req,res)=> {
    const { id } = req.params;
   const updateProduct = await product.findByIdAndUpdate(id,{...req.body});

   if(!updateProduct){
    throw new ExpressError(404,"Product Not Found");
   }

    res.status(200).json({ 
        sucess : true,
        message: "Product saved successfully" });
});

module.exports.destroyProduct = (async(req,res)=> {
    const { id } = req.params;
   const deleted = await product.findByIdAndDelete(id);
   if(!deleted){
    throw new ExpressError(404,"Product NOt Found");
   }
    res.json({ message: "Product deleted successfully" })
})
