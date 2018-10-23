const mongoose = require('mongoose');
const router = require('express').Router();
const CalendarEvent = mongoose.model('CalendarEvent');
const Band = mongoose.model('Band');

router.post('/', (req, res) =>
{
  if (!req.body.event.title)
    return res.sendStatus(422);

  let event = new CalendarEvent();
  event.title = req.body.event.title;
  event.description = req.body.event.description;
  event.start = req.body.event.start;
  event.end = req.body.event.end;
  event.frequency = CalendarEvent.frequencies()[req.body.event.frequency];
  event.picture = req.body.event.picture;

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
