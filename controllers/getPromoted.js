const Promoted = require('../models/promoted');

module.exports = async (req, res) => {
  try {
    let allPromoted = await Promoted.find({});

    res.status(201).json({ data: allPromoted });
  } catch (err) {
    console.log(err);
    res.status(404).send('Unknown error');
  }
};
