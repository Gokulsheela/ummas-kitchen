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