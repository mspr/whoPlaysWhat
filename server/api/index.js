var router = require('express').Router();

router.use('/todo', require('./todo'));
router.use('/todo/task', require('./task'));
router.use('/bands', require('./bands'));
router.use('/musicians', require('./musicians'));

module.exports = router;
