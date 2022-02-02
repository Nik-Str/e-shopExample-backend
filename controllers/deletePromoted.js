const Promoted = require('../models/promoted');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const item = await Promoted.findOne({ title: req.body.remove });
    const pathToFile = path.resolve(__dirname + '/..' + item.image);
    fs.unlink(pathToFile, async (err) => {
      if (err) {
        throw err;
      } else {
        await Promoted.deleteOne({ title: req.body.remove });
        res.status(200).json({ message: 'Delete complete!' });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
