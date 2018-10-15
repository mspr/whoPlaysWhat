var router = require('express').Router();

router.use('/todo', require('./todo'));
router.use('/todo/task', require('./task'));
router.use('/bands', require('./bands'));
router.use('/musicians', require('./musicians'));
router.use('/songs', require('./songs'));

module.exports = router;
