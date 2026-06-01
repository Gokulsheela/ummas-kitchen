const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//category Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    parentCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "category",
        default: null
    },
    image:
        "https://example.com/categories/men.jpg",

    isActive: {
        type: Boolean,
        default: true
    } 
  },
  {
    timestamps: true,
    versionKey: false
  }
);

//_-_-_-_-_-> SHARED SUB SCHEMAS_-_-_-_-_-_-_-_-_-

const imageSchema = new Schema({
    url: {
        type: String,
        required: true,
        trim: true
    },
    altText: {
        type: String,
        default: "",
    },
  },
  {
     _id: false,
  }
);

const seoSchema = new Schema({
    metTitle: {
        type: String,
        trim: true,
    },
    metaDescription: {
        type: String,
        trim: true
    },
  },
  {
     _id: false, 
  }
);

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
// -_-_-_-_-_-_- PRODUCT SCHEMA _-_-_-_-_-_-_

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

//-_-_-_-_-_-_- PRODUCT VARIENT SCHEMA -_-_-_-_-_-_
const productVarientSchema = new Schema(
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

//_-_-_-_-_ Review Schema _-_-_-_-_-_-_

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
/// Indexex

// PRODUCT INDEXS

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

// -------------------PRODUCT VARIENT INDEX -------------
// FAST SKU SEARCH
productVarientSchema.index({ sku:1 });

// FAST PRODUCT VARIENT FETACHING
productVarientSchema.index({ productId: 1 });

// FAST COLOR+ SIZE FILTERING
productVarientSchema.index({
    color:1,
    size:1
 });

 //FAST STOCK CHECKING
 productVarientSchema.index({ stockQuanity:1 });

 //-----------REVIEW INDEX------
 reviewSchema.index({ productId: 1});

 reviewSchema.index({
    productID: 1,
    userId: 1
 });

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