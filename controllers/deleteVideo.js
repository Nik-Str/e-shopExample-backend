const Video = require('../models/video');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    const item = await Video.findOne({ name: req.body.remove });
    if (item !== null) {
      const pathToFile = path.resolve(__dirname + '/..' + item.map);

      fs.unlink(pathToFile, async (err) => {
        if (err) {
          throw err;
        } else {
          await Video.deleteOne({ name: req.body.remove });
          res.status(200).json({ message: `Delete ${req.body.remove} complete!` });
        }
      });
    } else {
      res.status(200).json({ message: `Video "${req.body.remove}" does not exist, check you spelling and try again!` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
