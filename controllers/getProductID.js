const Product = require('../models/product');

module.exports = async (req, res) => {
  try {
    let singelProduct = await Product.findById(req.params.id);

    res.status(201).json({ data: singelProduct });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
