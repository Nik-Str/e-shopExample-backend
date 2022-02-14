const Promoted = require('../models/promoted');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  try {
    const filename = uuidv4();

    await sharp(req.files.image.data)
      .resize(1280, 1706)
      .toFormat('webp')
      .webp({ lossless: true })
      .toFile(path.resolve(__dirname, '../img/promoted/', `${filename}.webp`));

    let newPromoted = new Promoted({
      title: req.body.title,
      text: req.body.text,
      url: `http://localhost:8080/img/promoted/${filename}.webp`,
      name: `${filename}.webp`,
    });

    await newPromoted.save();
    res.status(201).json({ message: `Upload ${req.files.image.name} Complete!` });
  } catch (err) {
    console.log(err);
    res.status(404).end();
  }
};
