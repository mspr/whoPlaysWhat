const mongoose = require('mongoose');
const router = require('express').Router();
const Song = mongoose.model('Song');

router.get('/', (req, res) =>
{
  Song.find()
    .then((songs) =>
    {
      if (!songs)
        return res.sendStatus(404);

      return res.status(200).json({
        songs: songs.map((song) => { return song.toDto(); })
      });
    });
});

router.get('/:id', (req, res) =>
{
  Song.findById(req.params.id).then((song) =>
  {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
      return res.sendStatus(422);

    if (!song)
      return res.sendStatus(404);

    return res.status(200).json(song.toDto());
  });
});

router.post('/', (req, res) =>
{
  let song = new Song();
  song.title = req.body.title;
  song.level = Song.levels()[req.body.level];
  song.tonality = req.body.tonality;
  song.tempo = req.body.tempo;
  song.progression = req.body.progression;
  song.structure = req.body.structure;

  song.save().then(() => {
    return res.status(201).json(song.toDto());
  });
});

router.delete('/:id', (req, res) =>
{
  Song.deleteOne({_id: req.params.id}, (err, song) =>
  {
    if (err)
      return res.send(err);

    return res.json("Song " + song.title + " has been removed.");
  });
});

module.exports = router;
