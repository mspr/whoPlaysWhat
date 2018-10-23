var router = require('express').Router();

router.use('/bands', require('./bands'));
router.use('/musicians', require('./musicians'));
router.use('/songs', require('./songs'));
router.use('/incomingSongs', require('./incomingSongs'));
router.use('/calendarEvents', require('./calendarEvents'));

module.exports = router;
