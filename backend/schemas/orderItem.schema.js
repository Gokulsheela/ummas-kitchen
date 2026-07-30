 const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItem = new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    variantId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"productVariant"
    },

    title: String,
    thumbnail:String,

    sku: String,
    color: String,
    size: Number,
    
    cartQuantity:Number,

    price:{
        original: Number,
        sale: Number,
        currency: String
    },
    subtotal : Number
});