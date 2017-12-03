var router = require('express').Router();

router.get('/', function (req, res) {
  res.send('home page');
});
router.get('/premise', function (req, res) {
  res.send('premise page');
});
router.get('/sources', function (req, res) {
  res.send('sources page');
});
router.get('/contact', function (req, res) {
  res.send('contact page');
});

module.exports = router;