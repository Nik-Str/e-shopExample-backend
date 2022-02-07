const Product = require('../models/product');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
  try {
    let item = await Product.findOne({ name: req.body.remove });

    if (item !== null) {
      await Product.deleteOne({ name: req.body.remove });

      await item.map.forEach((item) => {
        let pathToFIle = path.resolve(__dirname + '/../img/' + item);
        fs.unlink(pathToFIle, (err) => {
          if (err) throw err;
        });
      });

      res.status(200).json({ message: `Delete ${req.body.remove} complete!` });
    } else {
      res
        .status(200)
        .json({ message: `Product ${req.body.remove} does not exist, check your spelling and try again!` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
