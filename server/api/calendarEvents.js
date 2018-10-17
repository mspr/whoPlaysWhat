const mongoose = require('mongoose');
const router = require('express').Router();
const CalendarEvent = mongoose.model('CalendarEvent');
const Band = mongoose.model('Band');

router.post('/', (req, res) =>
{
  if (!req.body.title)
    return res.sendStatus(422);

  let event = new CalendarEvent();
  event.title = req.body.title;
  event.description = req.body.description;
  event.start = req.body.start;
  event.end = req.body.end;
  event.frequency = req.body.frequency;
  event.picture = req.body.picture;

  event.save().then(() =>
  {
    Band.findById(req.body.bandId, (err, band) =>
    {
      if (err)
      {
        CalendarEvent.deleteOne({ _id: event._id }, (deleteErr, event) =>
        {
          if (deleteErr)
            return res.send(deleteErr);
        });

        return res.send(err);
      }
      else
      {
        band.events.push(event);
        band.save((err) =>
        {
          if (err)
            return res.send(err);
          else
            return res.status(201).json(event.toDto());
        });
      }
    });
  });
});

module.exports = router;
