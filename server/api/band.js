const mongoose = require('mongoose');
const router = require('express').Router();

const Band = mongoose.model('Band');

router.post('/', (req, res) =>
{
  if (!req.body.name)
    res.sendStatus(422);

  let band = new Band();
  band.name = req.body.name;
  band.picture.data = req.body.picture;
  band.picture.contentType = 'image/png';

  band.save().then(() => {
    res.json(band.toDto()).statusCode(201);
  })
});

module.exports = router;
