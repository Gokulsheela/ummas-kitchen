const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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