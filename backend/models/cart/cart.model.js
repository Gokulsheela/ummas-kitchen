const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartItemSchema = new Schema(
    {
    variant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productVariant",
      required: true,
    },

    cartQuantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One active cart per user
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart",cartSchema);