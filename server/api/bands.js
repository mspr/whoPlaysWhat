const mongoose = require('mongoose');
const router = require('express').Router();
const Band = mongoose.model('Band');
const Musician = mongoose.model('Musician');

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

router.get('/:id', (req, res) =>
{
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
    return res.sendStatus(422);

  Band.findById(req.params.id)
    .populate('musicians')
    .populate('songs')
    .then((band) =>
    {
      if (!band)
        return res.sendStatus(404);

      return res.status(200).json(band);
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

router.patch('/:id', (req, res) =>
{
  Band.findById(req.params.id, (err, band) =>
  {
    if (err)
      res.send(err);

    console.log("***********************");
    console.log("BOODYYYY", req.body);
    console.log("***********************");

    band.name = req.body.name;
    band.picture = req.body.picture;

    var pushMusicians = [];
    var pushMusician = (musicianId) => {
      return new Promise((resolve, reject) => {
        console.log(">> my promise for ", musicianId);
        Musician.findById(musicianId, (err, musician) =>
        {
          if (err)
            reject(err);

          console.log("Musician found!!! ", musician);
          band.musicians.push(musician);
          resolve();
        });
    })};

    req.body.musicians.forEach(musician => {
      pushMusicians.push(pushMusician(musician.id));
    });

    console.log("***********************");
    console.log("BBAAAANNNNDDD", band);
    console.log("***********************");

    Promise.all(pushMusicians).then(() =>
    {
      console.log("*****PROMISE ALL OK********");
      console.log("BAND", band);

      band.save((err) =>
      {
        if (err)
        {
          console.log("err", err);
          res.send(err);
        }
        else
        {
          console.log("*****SAVE********");
          res.json(band.toDto());
        }
      });
    }).catch(err => {
    });
  });
});

router.delete('/:id', (req, res) =>
{
  console.log("id", req.params.id);

  Band.deleteOne({_id: req.params.id}, (err, band) =>
  {
    if (err)
      res.send(err);

    res.json("Band " + band.name + " has been removed.");
  });
});

module.exports = router;
