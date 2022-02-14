const Product = require('../models/product');

module.exports = async (req, res) => {
  try {
    let Female = await Product.find({ sex: 'Dam' });
    res.status(201).json({ data: Female });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
