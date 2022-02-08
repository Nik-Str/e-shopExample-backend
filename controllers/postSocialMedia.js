const Instagram = require('../models/socialMedia');
const path = require('path');

module.exports = async (req, res) => {
  try {
    let image = req.files.image;

    let newInstagram = new Instagram({
      url: 'http://localhost:8080/img/socialmedia/' + image.name,
      name: image.name,
    });

    await newInstagram.save();
    image.mv(path.resolve(__dirname, '../img/socialmedia/', image.name));

    res.status(201).json({ message: `Upload ${image.name} Complete!` });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
