const Product = require('../models/promoted');

module.exports = async (req, res) => {
  try {
    let singelProduct = await Product.findById(req.params.id);

    res.status(201).json({ data: singelProduct });
  } catch (err) {
    console.log(err);
    res.status(404).send('Unknown Error');
  }
};
