const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//category Schema


//_-_-_-_-_-> SHARED SUB SCHEMAS_-_-_-_-_-_-_-_-_-

// -_-_-_-_-_-_- PRODUCT SCHEMA _-_-_-_-_-_-_

//-_-_-_-_-_-_- PRODUCT VARIENT SCHEMA -_-_-_-_-_-_


//_-_-_-_-_ Review Schema _-_-_-_-_-_-_


/// Indexex

// PRODUCT INDEXS



// -------------------PRODUCT VARIENT INDEX -------------

 //-----------REVIEW INDEX------
 

 //--------MODELS------

 const Category = mongoose.model("Category",categorySchema);
 const Product  = mongoose.model("Product",productSchema);
 const ProductVarient = mongoose.model("ProdcutVarient", productVarientSchema);
 const Review = mongoose.model("Review",reviewSchema);

 //-------EXPORTS----------
 module.exports = {
    Category,
    Product,
    ProductVarient,
    Review
 };