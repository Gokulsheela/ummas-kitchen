const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "User",
        required: true
    },
    fullName:String,
    phone:String,
    address:String,
    city:String,
    state:String,
    postalCode:String,
    country:String
})