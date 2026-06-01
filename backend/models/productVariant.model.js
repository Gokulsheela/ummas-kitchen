const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productVariantSchema = new Schema(
    {
        productId : {
            type: Schema.Types.ObjectId,
            ref: "Products",
            required: true,
            index: true
        },
        sku: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true
        },
        color: {
            type: String,
            required: String,
            trim: true
        },
        size: {
            type: String,
            required: true,
            trim: true
        },

        price: priceSchema,

        stockQunanity: {
            type: Number,
            default: 0,
            min: 0
        },
        reservedQuantity: {
            type: Number,
            default: 0,
            min: 0
        },
        soldQuantity: {
            type: Number,
            default: 0,
            min: 0
        },
        images: imageSchema,
        
        isActive: {
            type: Boolean,
            defult: true,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const productVariant = mongoose.model("productVariant",productVariantSchema);

// FAST SKU SEARCH
productVariantSchema.index({ sku:1 });

// FAST PRODUCT VARIENT FETACHING
productVariantSchema.index({ productId: 1 });

// FAST COLOR+ SIZE FILTERING
productVariantSchema.index({
    color:1,
    size:1
 });

 //FAST STOCK CHECKING
 productVariantSchema.index({ stockQuanity:1 });

module.exports = productVariant;