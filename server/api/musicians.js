const mongoose = require('mongoose');
const router = require('express').Router();
const Musician = mongoose.model('Musician');

router.get('/', (req, res) =>
{
  Musician.find()
    .then((musicians) =>
    {
      if (!musicians)
        return res.sendStatus(404);

      return res.status(200).json({
        musicians: musicians.map((musician) => {return musician.toDto(); })
      });
    });
});

router.post('/', (req, res) =>
{
  if (!req.body.name)
    res.sendStatus(422);

  let musician = new Musician();
  musician.name = req.body.name;

  musician.save().then(() => {
    res.status(201).json(musician.toDto());
  });
});

module.exports = router;
