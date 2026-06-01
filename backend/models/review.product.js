const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    {
        productId:{
            type: Schema.Types.ObjectId,
            ref:" product",
         required: true,
         index: true
        },
         userId: {
            type: Schema.Types.ObjectId,
            ref:"User",
            requird: true,
         },
         rating: {
            type: Number,
            required: true,
            min:1,
            max:2
         },
         comment: {
            type: String,
            required: true,
            trim: true
         },
         isVerifiedPurchase: {
            type: Boolean,
            default: false
         },      
    },
    {
        timestamps: true,
        versionKey: false
    }
   
);

const review = mongoose.model("review",reviewSchema);

reviewSchema.index({ productId: 1});

 reviewSchema.index({
    productID: 1,
    userId: 1
 });
module.exports = review;