const Instagram = require('../models/socialMedia');

module.exports = async (req, res) => {
  try {
    let allInstagram = await Instagram.find({});

    res.status(201).json({ data: allInstagram });
  } catch (err) {
    console.log(err);
    res.status(404).send('Unknown error');
  }
};
