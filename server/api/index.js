var router = require('express').Router();

router.use('/bands', require('./bands'));
router.use('/musicians', require('./musicians'));
router.use('/songs', require('./songs'));
router.use('/calendarEvents', require('./calendarEvents'));

module.exports = router;
