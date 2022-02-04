const Video = require('../models/video');

module.exports = async (req, res) => {
  try {
    let videoInfo = await Video.find({});

    res.status(201).json({ data: videoInfo });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
