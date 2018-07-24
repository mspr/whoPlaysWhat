var express = require('express')
var app = express()

let bands = ["The Beatles", "Dire Straits"];

app.get('/bands', function (req, res) {
  console.log(bands);
  res.json(bands);
})

app.listen(8080, function() {
    console.log('serving...');
})
