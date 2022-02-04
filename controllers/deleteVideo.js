const Video = require('../models/video');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
  try {
    const item = await Video.findById(req.body.remove);
    const pathToFile = path.resolve(__dirname + '/..' + item.mapp);

    fs.unlink(pathToFile, async (err) => {
      if (err) {
        throw err;
      } else {
        await Video.deleteOne({ _id: req.body.remove });
        res.status(200).json({ message: `Delete ${req.body.remove} complete!` });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
