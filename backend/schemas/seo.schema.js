const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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