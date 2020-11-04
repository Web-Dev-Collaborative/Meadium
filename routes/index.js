var express = require('express');
var router = express.Router();
const { User, Story } = require('../db/models')

const { asyncHandler } = require('../routes/utils');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const stories = await Story.findAll()
  res.render('index', {
    title: 'Meadium',
    stories
  });
}));

module.exports = router;
