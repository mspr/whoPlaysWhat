const mongoose = require('mongoose');
const router = require('express').Router();
const IncomingSong = mongoose.model('IncomingSong');
const Musician = mongoose.model('Musician');

router.post('/', (req, res) =>
{
  let musicianId = req.body.song.proposer;

  Musician.findById(req.body.song.proposer, (err, musician) =>
  {
    if (err)
      return res.send(err);
    else
    {
      let song = new IncomingSong();
      song.title = req.body.song.title;
      song.level = req.body.song.level;
      song.proposer = musician;
      song.musiciansFeedback = req.body.song.musiciansFeedback;

      song.save((songErr) =>
      {
        if (songErr)
          return res.send(songErr);
        else
          return res.status(201).json(song.toDto());
      });
    }
  });
});

module.exports = router;
