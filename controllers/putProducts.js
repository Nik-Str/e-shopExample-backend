const Products = require('../models/product');

module.exports = async (req, res) => {
  try {
    await Products.findByIdAndUpdate(req.body.itemId, {
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
    });

    res.status(201).json({ message: `Update ${req.body.name} complete!` });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
