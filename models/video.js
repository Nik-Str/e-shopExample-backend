const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  mapp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('video', videoSchema);
