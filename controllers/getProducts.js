const Product = require('../models/product');

module.exports = async (req, res) => {
  try {
    const items = await Product.find();
    res.status(201).json({ data: items });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
