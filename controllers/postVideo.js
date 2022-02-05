const Video = require('../models/video');
const path = require('path');

module.exports = async (req, res) => {
  try {
    let controll = await Video.findOne({ screen: req.body.screenSize });

    if (controll === null) {
      let video = req.files.video;
      let videoName;

      if (req.body.screenSize === 'Stor video') {
        video.mv(path.resolve(__dirname, '../video/', 'large.mp4'));
        videoName = 'large.mp4';
      } else {
        video.mv(path.resolve(__dirname, '../video/', 'small.mp4'));
        videoName = 'small.mp4';
      }

      let newVideo = new Video({
        screen: req.body.screenSize,
        url: 'http://localhost:8080/video/' + videoName,
        map: '/video/' + videoName,
        name: video.name,
      });

      await newVideo.save();
      res.status(201).json({ message: `Upload ${req.files.video.name} Complete!` });
    } else {
      res.status(201).json({ message: `Video "${req.body.screenSize}" already active, remove it to continue!` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
