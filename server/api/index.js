var router = require('express').Router();

router.use('/bands', require('./bands'));
router.use('/musicians', require('./musicians'));
router.use('/songs', require('./songs'));

module.exports = router;
