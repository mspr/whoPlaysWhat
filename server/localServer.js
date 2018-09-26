const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var express = require('express')

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Require the models
require('./models/Task');
require('./models/Todo');
require('./models/Musician');
require('./models/Song');
require('./models/Band');

//Get our API routes
const api = require('./api/index');
//Set API routes
app.use('/api', api);

// //Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//Connect to mongoDB server
mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connection.on('error', function (err) { console.log('Error while trying to connect with mongodb') });
mongoose.connect('mongodb://localhost/whoPlaysWhat');

// app.get('/', function (req, res) {
//   console.log('Hello');
// });

// app.get('/bands', function (req, res) {
//   console.log(bands);
//   res.json(bands);
// });

// app.get('/login', function (req, res) {
//   const email = req.body.email;
//   const password = req.body.password;

//   if (validateEmailAndPassword()) {
//     const userId = findUserIdForEmail(email);
//     const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
//       algorithm: 'RS256',
//       expiresIn: 120,
//       subject: userId
//     });

//     res.status(200).json({
//       idToken: jwtBearerToken
//     });
//   }
//   else {
//     res.sendStatus(401);
//   }
// });

app.listen(8080, function() {
  console.log('serving...');
});
