const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: [
    {
      xsmale: {
        type: Boolean,
        default: false,
      },
      smale: {
        type: Boolean,
        default: false,
      },
      medium: {
        type: Boolean,
        default: false,
      },
      large: {
        type: Boolean,
        default: false,
      },
      xlarge: {
        type: Boolean,
        default: false,
      },
    },
  ],
  image: [
    {
      imageOne: {
        type: String,
        required: true,
      },
      imageTwo: {
        type: String,
      },
      imageThree: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('product', productSchema);
