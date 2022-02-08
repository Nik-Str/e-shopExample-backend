const Product = require('../models/product');

module.exports = async (req, res) => {
  try {
    let data = [];
    // -1 means sort desc Product.find({}).sort({ updatedAt: -1 }).limit(3);
    let female = await Product.find({ sex: 'Dam' }, '_id imageOne').sort({ updatedAt: -1 }).limit(6);
    data.push(female);
    let male = await Product.find({ sex: 'Herr' }, '_id imageOne').sort({ updatedAt: -1 }).limit(6);
    data.push(male);
    res.status(201).json({ data: data });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
