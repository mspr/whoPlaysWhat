const mongoose = require('mongoose');
const router = require('express').Router();

const Band = mongoose.model('Band');

router.get('/', (req, res) =>
{
  Band.find()
    .populate('musicians')
    .populate('songs')
    .then((bands) =>
    {
      if (!bands)
        return res.sendStatus(404);

      return res.status(200).json({
        bands: bands.map((band) => { return band.toDto(); })
      });
    });
});

router.post('/', (req, res) =>
{
  if (!req.body.name)
    res.sendStatus(422);

  let band = new Band();
  band.name = req.body.name;
  band.picture = req.body.picture;

  band.save().then(() => {
    res.status(201).json(band.toDto());
  })
});

module.exports = router;
