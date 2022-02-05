const Promoted = require('../models/promoted');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    const item = await Promoted.findOne({ name: req.body.remove });
    if (item !== null) {
      const pathToFile = path.resolve(__dirname + '/../img/promoted/' + item.name);
      fs.unlink(pathToFile, async (err) => {
        if (err) {
          throw err;
        } else {
          await Promoted.deleteOne({ name: req.body.remove });
          res.status(200).json({ message: `Delete ${req.body.remove} complete!` });
        }
      });
    } else {
      res.status(200).json({ message: `Image "${req.body.remove}" does not exist, check you spelling and try again!` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
