require('dotenv').config();

//Depen
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const cors = require('cors');
const app = express();
const path = require('path');

//Cors config
const corsOption = {
  origin: '*',
  optionsSuccessStatus: 200,
};

//App.use
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//App.listening
app.listen(port, () => {
  console.log(`=> Sever is listening on port ${port}`);
});

//DB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.on('open', () => console.log('=> Connected to DB'));

//-------------------------Controllers------------------------

//----------------Products---------------
// Upload new products
const postProducts = require('./controllers/postProduct');
app.post('/product', postProducts);

//Get all products
const getProducts = require('./controllers/getProducts');
app.get('/product', getProducts);

//Send Male images
app.get('/img/male/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'img/male/' + req.params.id));
});

//Send female images
app.get('/img/female/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'img/female/' + req.params.id));
});

//Delete items
const deleteProducts = require('./controllers/deleteProduct');
app.delete('/product', deleteProducts);

//Update data
const updateProducts = require('./controllers/putProducts');
app.put('/product', updateProducts);

//Homepage displayed products
const getHomeProducts = require('./controllers/getHomepageProducts');
app.get('/product/homepage', getHomeProducts);

//-----------------PROMOTED---------------
// Get all promoted data from db
const getPromoted = require('./controllers/getPromoted');
app.get('/promoted', getPromoted);

//Upload new Promoted item
const postPromoted = require('./controllers/postPromoted');
app.post('/promoted', postPromoted);

//Send Promoted images
app.get('/img/promoted/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'img/promoted/' + req.params.id));
});

//Delete promoted
const deletePromoted = require('./controllers/deletePromoted');
app.delete('/promoted', deletePromoted);

//------------------Videos---------------
//Send videos
app.get('/video/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'video/' + req.params.id));
});

//Get video info
const getVideoInfo = require('./controllers/getVideo');
app.get('/video', getVideoInfo);

//Upload videos
const postVideo = require('./controllers/postVideo');
app.post('/video', postVideo);

//Delete video
const deleteVideo = require('./controllers/deleteVideo');
app.delete('/video', deleteVideo);

//------------------Instagram-----------------
//Upload social media images
const postSocialMedia = require('./controllers/postSocialMedia');
app.post('/socialmedia', postSocialMedia);

//Send social media image
app.get('/img/socialmedia/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'img/socialmedia/' + req.params.id));
});

//Get all social media img data
const getSocialMedia = require('./controllers/getSocialMedia');
app.get('/socialmedia', getSocialMedia);

//Delte social meddia
const deleteSocialMedia = require('./controllers/deleteSocialMedia');
app.delete('/socialmedia', deleteSocialMedia);
