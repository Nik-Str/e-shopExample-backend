const Product = require('../models/product');

module.exports = async (req, res) => {
  try {
    let male = await Product.find({ sex: 'Herr' });
    res.status(201).json({ data: male });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
