const Instagram = require('../models/socialMedia');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  try {
    const filename = uuidv4();
    await sharp(req.files.image.data)
      .resize(1920, 1080)
      .toFormat('webp')
      .webp({ lossless: true })
      .toFile(path.resolve(__dirname, '../img/socialmedia/', `${filename}.webp`));

    let newInstagram = new Instagram({
      url: 'http://localhost:8080/img/socialmedia/' + `${filename}.webp`,
      name: `${filename}.webp`,
    });

    await newInstagram.save();

    res.status(201).json({ message: `Upload ${req.files.image.name} Complete!` });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
