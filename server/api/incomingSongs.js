const mongoose = require('mongoose');
const router = require('express').Router();
const IncomingSong = mongoose.model('IncomingSong');
const Band = mongoose.model('Band');
const Musician = mongoose.model('Musician');

router.post('/', (req, res) =>
{
  let musicianId = req.body.song.proposer;

  Band.findById(req.body.bandId, (bandFindErr, band) =>
  {
    if (bandFindErr)
      return res.send(bandFindErr);
    else
    {
      Musician.findById(req.body.song.proposer, (musicianFindErr, musician) =>
      {
        if (musicianFindErr)
          return res.send(musicianFindErr);
        else
        {
          let song = new IncomingSong();
          song.title = req.body.song.title;
          song.level = IncomingSong.levels()[req.body.song.level];
          song.link = req.body.song.link;
          song.proposer = musician;
          song.musiciansFeedback = req.body.song.musiciansFeedback;

          song.save((songSaveErr) =>
          {
            if (songSaveErr)
              return res.send(songSaveErr);
            else
            {
              band.incomingSongs.push(song);

              band.save((bandSaveErr) =>
              {
                if (bandSaveErr)
                  return res.send(bandSaveErr);
                else
                  return res.status(201).json(song.toDto());
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
