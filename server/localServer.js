const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var express = require('express')
var app = express()

let bands = ["The Beatles", "Dire Straits"];

//Connect to mongoDB server
mongoose.connect('mongodb://localhost/whoPlaysWhat');
mongoose.set('debug', true);
//Require the models
require('./models/Task');
require('./models/Todo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/', function (req, res) {
  console.log('Hello');
});

app.get('/bands', function (req, res) {
  console.log(bands);
  res.json(bands);
});

app.get('/login', function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  if (validateEmailAndPassword()) {
    const userId = findUserIdForEmail(email);
    const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 120,
      subject: userId
    });

    res.status(200).json({
      idToken: jwtBearerToken
    });
  }
  else {
    res.sendStatus(401);
  }
});

app.listen(8080, function() {
  console.log('serving...');
});
