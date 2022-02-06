const Product = require('../models/product');
const path = require('path');

module.exports = async (req, res) => {
  try {
    let controll = await Product.findOne({ name: req.body.name, brand: req.body.brand });

    if (controll === null) {
      let typ;
      if (req.body.sex === 'Dam') {
        typ = 'female';
      } else {
        typ = 'male';
      }

      let imageOne = req.files.imageOne;
      imageOne.mv(path.resolve(__dirname, `../img/${typ}/`, imageOne.name));

      let imageTwo = null;
      if (req.files.imageTwo) {
        imageTwo = req.files.imageTwo;
        imageTwo.mv(path.resolve(__dirname, `../img/${typ}/`, imageTwo.name));
      }

      let imageThree = null;
      if (req.files.imageThree) {
        imageThree = req.files.imageThree;
        imageThree.mv(path.resolve(__dirname, `../img/${typ}/`, imageThree.name));
      }

      //Save new post
      let newProduct = new Product({
        category: req.body.category,
        name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        sex: req.body.sex,
        xsmall: req.body.xsmall,
        small: req.body.small,
        medium: req.body.medium,
        large: req.body.large,
        xlarge: req.body.xlarge,
        imageOne: `http://localhost:8080/img/${typ}/` + imageOne.name,
        imageTwo: `http://localhost:8080/img/${typ}/` + imageTwo.name,
        imageThree: `http://localhost:8080/img/${typ}/` + imageThree.name,
      });

      await newProduct.save();
      res.status(201).json({ message: `Upload ${req.body.name} Complete!` });
    } else {
      res.status(201).json({ message: `Product ${req.body.name} already exist!` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
