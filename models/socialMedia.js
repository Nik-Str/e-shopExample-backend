const mongoose = require('mongoose');

const instagramSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('instagram', instagramSchema);
