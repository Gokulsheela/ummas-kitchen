const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = require("../../schemas/address.schema");
const orderItemSchema = require("../../schemas/orderItem.schema");
const orderSchema = new Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref :"User"
    },
    orderItem :[orderItemSchema],
    // address:[addressSchema],

    paymentMethod: {
        type: String,
        enum: ["COD","ONLINE"],
        default: "COD"
    },
    paymentStatus : {
        type: String,
        enum: ["Pending","Paid","Failed"],
        default: "Pending"
    },
    orederStatus: {
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Packed",
            "Shipped",
            "Delivered",
            "Cancelled"
        ],
        default:"Pending"
    },
    totalAmount : Number,
    },{
        timestamps:true
    });

    module.exports = mongoose.model("Order",orderSchema);
