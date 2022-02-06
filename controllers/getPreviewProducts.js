const Product = require('../models/product');

module.exports = async (req, res) => {
  try {
    // -1 means sort desc Product.find({}).sort({ updatedAt: -1 }).limit(3);
    const items = await Product.find();
    res.status(201).json({ data: items });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
