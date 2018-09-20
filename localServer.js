var express = require('express')
var app = express()

let bands = ["The Beatles", "Dire Straits"];

app.use(bodyParser.json());

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
