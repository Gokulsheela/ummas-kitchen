const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200
        },
        slug: {
            type:String,
            unique: true,
            required: true,
            lowercase: true,
            trim:  true,
        },
        shortDescription: {
            type: String,
            maxlength: 500
        },
        description: {
            type: String,
            required: true
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        brand: {
            type: String,
            default: "Umma'S Kitchen",
            trim: true
        },
        tags:[String],
        
        thumbnail: imageSchema,

        gallery: imageSchema,

        material: {
            type: String,
            trim: true
        },
        careinstructions: {
            type: String,
            trim: true
        },
        gender: {
            type: String,
            enum: ["men","women","kids","unisex"],
            required: true
        },
        
        collections: [String],
        
       // avarageRating: Number,
       // totalReview : Number,
       isFeatured: {
        type: Boolean,
        default: false,
       },
       status: {
        type: String,
        enum: ["draft","active","archived"],
        default: "draft"
       },
       
       seo: seoSchema,   
    },
    {
        timestamps: true,
        versionkey: false
    }
);

// FAST PRODUCT PAGE LOOKUP
productSchema.index({ slug: 1 });

// FAST CATEGORY FILTERING
productSchema.index({ categoryId: 1});

//FAST GENDER FILTERING 
productSchema.index({ gender:1 });

//FAST STATUS FILTERING
productSchema.index({ status:1 });

// FAST FEATURED PRODUCT QUERY
productSchema.index({ isFeatured:1 });

// TEXT SEARCH INDEX
productSchema.index({
    title: "text",
    tag: "text",
    shortDescription: "text"
});

// COMPOUND INDEX FOR COMMON FILETERING
productSchema.index({
    categoryId:1,
    gender:1,
    status:1

});

const product = mongoose.model("product",productSchema);

module.exports = product;