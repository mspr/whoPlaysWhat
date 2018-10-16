const mongoose = require('mongoose');
const router = require('express').Router();
const Band = mongoose.model('Band');
const Musician = mongoose.model('Musician');
const Song = mongoose.model('Song');

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

      return res.status(200).json(band.toDto());
    });
});

router.post('/', (req, res) =>
{
  if (!req.body.name)
    res.sendStatus(422);

  console.log("*BODY: ", req.body);

  let band = new Band();
  band.name = req.body.name;
  band.picture = req.body.picture;

  band.save().then(() => {
    return res.status(201).json(band.toDto());
  })
});

router.patch('/:id', (req, res) =>
{
  Band.findById(req.params.id, (err, band) =>
  {
    if (err)
      return res.send(err);

    band.name = req.body.name;
    band.picture = req.body.picture;
    band.notes = req.body.notes;
    band.musicians = [];

    var findMusicianThenPush = (musicianId) =>
    {
      return new Promise((resolve, reject) =>
      {
        Musician.findById(musicianId, (err, musician) =>
        {
          if (err)
            reject(err);

          band.musicians.push(musician);
          resolve();
        });
      });
    };

    var pushMusicians = [];
    req.body.musicians.forEach(musician => {
      pushMusicians.push(findMusicianThenPush(musician.id));
    });

    band.songs = [];

    var findSongThenPush = (songId) =>
    {
      return new Promise((resolve, reject) =>
      {
        Song.findById(songId, (err, song) =>
        {
          if (err)
            reject(err);

          band.songs.push(song);
          resolve();
        });
      });
    };

    var pushSongs = [];
    req.body.songs.forEach(song => {
      pushSongs.push(findSongThenPush(song.id));
    });

    Promise.all(pushMusicians).then(() =>
    {
      band.musiciansColor = [];
      req.body.musiciansColor.forEach(musicianColor => {
        band.musiciansColor.push(musicianColor);
      });

      Promise.all(pushSongs).then(() =>
      {
        band.save((err) =>
        {
          if (err)
          {
            return res.send(err);
          }
          else
          {
            return res.json(band.toDto());
          }
        });
      })
      .catch(err => {
      });
    })
    .catch(err => {
    });
  });
});

router.delete('/:id', (req, res) =>
{
  Band.deleteOne({_id: req.params.id}, (err, band) =>
  {
    if (err)
      res.send(err);

    res.json("Band " + band.name + " has been removed.");
  });
});

module.exports = router;
