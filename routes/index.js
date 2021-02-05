var express = require('express');
var router = express.Router();
const { User, Story } = require('../db/models')

const { asyncHandler } = require('../routes/utils');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const stories = await Story.findAll()
  // const middleStories = stories.splice(1, 5)
  const middleStories = stories.slice(1, 5);
  res.locals.path = req.originalUrl
  res.render('home2', {
    title: 'Meadium',
    stories,
    middleStories
  });
}));

module.exports = router;
