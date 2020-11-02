var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const stories = Story.findAll()
  res.render('index', {
    title: 'Meadium',
    stories
  });
});

module.exports = router;
