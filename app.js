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
// Get all data from db
const getPromoted = require('./controllers/getPromoted');
app.get('/', getPromoted);

// Get individueal data from db
const getSingelData = require('./controllers/dataSingel');
app.get('/product/:id', getSingelData);

//Data upload
const dataUpload = require('./controllers/storePromoted');
app.post('/data', dataUpload);

//Send the images
app.get('/img/:id', (req, res) => {
  console.log(req.params.id);
  res.sendFile(path.resolve(__dirname, 'img/' + req.params.id));
});
