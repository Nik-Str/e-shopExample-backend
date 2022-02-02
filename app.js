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

// Get individueal data from db
const getSingelData = require('./controllers/dataSingel');
app.get('/product/:id', getSingelData);

//promoted
// Get all promoted data from db
const getPromoted = require('./controllers/getPromoted');
app.get('/promoted', getPromoted);

//Upload new Promoted item
const storePromoted = require('./controllers/storePromoted');
app.post('/data/promoted/add', storePromoted);

//Send Promoted images
app.get('/img/promoted/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'img/promoted/' + req.params.id));
});

const deletePromoted = require('./controllers/deletePromoted');
app.delete('/data/promoted/delete', deletePromoted);
