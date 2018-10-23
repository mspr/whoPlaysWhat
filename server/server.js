const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var chalk = require('chalk');
var express = require('express');
var multer = require('multer');
var path = require('path');
var config = require('config');
var cors = require('cors');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

//Require the models
require('./models/Musician');
require('./models/Song');
require('./models/IncomingSong');
require('./models/Band');
require('./models/CalendarEvent');

//Get our API routes
const api = require('./api/index');
//Set API routes
app.use('/api', api);

//Connect to mongoDB server
var dbConfig = config.get('dbConfig');
// db.connect(dbConfig, ...);
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connection.on('error', function (err) { console.log('Error while trying to connect with mongodb') });
mongoose.connect('mongodb://localhost/whoPlaysWhat');

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log(chalk.bold.magenta("Mongoose default connection is disconnected due to application termination"));
    process.exit(0)
  });
});

var uploadConfig = config.get('uploadConfig');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadConfig.targetDir + '/assets/images/bands/');
  },
  filename: function(req, file, cb) {
    var ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
  }
});

var upload = multer({ storage: storage });

app.post('/upload', upload.single('picture'), (req, res, next) =>
{
  console.log('file', req.file);
  return res.json('assets/images/bands/' + req.file.filename);
});

app.listen(dbConfig.port, function() {
  console.log('serving...');
});
