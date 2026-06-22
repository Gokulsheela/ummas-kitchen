const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const priceSchema = new Schema(
    {
        original: {
            type: Number,
            required:  true,
            min: 0
        },
        sale: {
            type: Number,
            min:0
        },
        currency: {
            type: String,
            default:"INR",
            uppercase: true
        },
    },
    {
        _id: false
    }
);