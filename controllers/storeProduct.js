const Product = require('../models/product');
const path = require('path');

module.exports = async (req, res) => {
  try {
    //Moves img to folder
    let imageOne = req.files.imageOne;
    let imageTwo = null;
    let imageThree = null;
    imageOne.mv(path.resolve(__dirname, '../img/', imageOne.name));

    if (req.files.imageTwo) {
      imageTwo = req.files.imageTwo;
    }

    if (req.files.imageThree) {
      imageThree = req.files.imageThree;
    }

    //Save new post
    let newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      size: [
        {
          xsmale: req.body.xsmale,
          smale: req.body.smale,
          medium: req.body.medium,
          large: req.body.large,
          xlarge: req.body.xlarge,
        },
      ],
      image: [
        {
          imageOne: '/img/' + imageOne.name,
          imageTwo: '/img/' + imageTwo.name,
          imageThree: '/img/' + imageThree.name,
        },
      ],
    });

    await newProduct.save();
    res.status(201).json({ message: 'Upload Complete!' });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
