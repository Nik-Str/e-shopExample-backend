const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  screen: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('video', videoSchema);
