const Product = require('../models/product');
const path = require('path');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  try {
    let controll = await Product.findOne({ name: req.body.name, brand: req.body.brand });

    if (controll === null) {
      //Typ represent female or male
      let typ;
      if (req.body.sex === 'Dam') {
        typ = 'female';
      } else {
        typ = 'male';
      }

      //Map represent all path-names of files
      let mapFile = [];

      //Process image
      const processImage = async (data) => {
        const fileId = uuidv4();
        await sharp(data)
          .resize(900, 1125)
          .toFormat('webp')
          .webp({ lossless: true })
          .toFile(path.resolve(__dirname, `../img/${typ}/`, `${fileId}.webp`));
        mapFile.push(`${typ}/${fileId}.webp`);
      };

      //Process first image file (required)
      await processImage(req.files.imageOne.data);

      //Save new post
      let newProduct = new Product({
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
        material: req.body.material,
        color: `http://localhost:8080/img/color/${req.body.color}.jpg`,
        imageOne: `http://localhost:8080/img/${mapFile[0]}`,
      });

      //process second image if exist
      if (req.files.imageTwo) {
        await processImage(req.files.imageTwo.data);
        newProduct.imageTwo = `http://localhost:8080/img/${mapFile[1]}`;
      }

      //process third image if exist
      if (req.files.imageThree) {
        await processImage(req.files.imageThree.data);
        newProduct.imageThree = `http://localhost:8080/img/${mapFile[2]}`;
      }

      //Add filepath in map
      newProduct.map = mapFile;

      await newProduct.save();
      res.status(201).json({ message: `Upload ${req.body.name} Complete!` });
    } else {
      res.status(201).json({ message: `Product ${req.body.name} already exist!` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
