const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = require('../../schemas/image.schema');

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
    thumbnail: imageSchema,
    
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



const category = mongoose.model("category",categorySchema);
module.exports = category;