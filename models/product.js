const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    xsmall: {
      type: Boolean,
      default: false,
    },
    small: {
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
  { timestamps: true }
);

module.exports = mongoose.model('product', productSchema);
