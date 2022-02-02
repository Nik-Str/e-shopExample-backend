const Promoted = require('../models/promoted');
const path = require('path');

module.exports = async (req, res) => {
  try {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '../img/promoted/', image.name));

    let newPromoted = new Promoted({
      title: req.body.title,
      text: req.body.text,
      image: '/img/promoted/' + image.name,
    });

    await newPromoted.save();
    res.status(201).json({ message: 'Upload Complete!' });
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
};
