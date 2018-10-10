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

router.get('/:id', (req, res) =>
{
  Musician.findById(req.params.id).then((musician) =>
  {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
      return res.sendStatus(422);

    if (!musician)
      return res.sendStatus(404);

    return res.status(200).json(musician);
  });
});

router.post('/', (req, res) =>
{
  if (!req.body.name)
    res.sendStatus(422);

  let musician = new Musician();
  musician.name = req.body.name;
  musician.color = req.body.color;
  musician.roles = req.body.roles;

  musician.save().then(() => {
    res.status(201).json(musician.toDto());
  });
});

router.delete('/:id', (req, res) =>
{
  Musician.deleteOne({_id: req.params.id}, (err, musician) =>
  {
    if (err)
      res.send(err);

    res.json("Musician " + musician.name + " has been removed.");
  });
});

module.exports = router;
