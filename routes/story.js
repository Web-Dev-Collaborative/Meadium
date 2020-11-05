const express = require('express');

const { Story, User, Comment, Pin, Cheer } = require('../db/models');
const { asyncHandler } = require('./utils');

const storyRouter = express.Router();

const storyNotFound = () => {
  const error = new Error('This story has been removed or deleted');
  error.title = 'Story Not Found';
  error.status = 404;

  return error;
};

storyRouter.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const storyId = parseInt(req.params.id, 10);
  const userId = req.session.auth.userId
  const { count, rows } = await Cheer.findAndCountAll({
    where: {
      storyId: storyId
    },
    raw: true
  });
  const ratings = rows.map((cheer) => cheer.rating)
  let avgRating = ratings.reduce((acc, val) => { return acc + val }, 0) / count
  console.log(avgRating)
  const story = await Story.findByPk(storyId, {
    include: [{ model: User, attributes: ['firstName'] }, Comment]
  });

  if (story) {
    res.render('story', {
      userId,
      story
    });
  } else {
    next(storyNotFound(storyId));
  };
}));

storyRouter.post('/:id(\\d+)/cheers', asyncHandler(async (req, res) => {
  const { rating, userId, storyId } = req.body
  if (!Cheer.findOne({ where: { userId, storyId, rating } })) {
    Cheer.create({ userId, storyId, rating })
  }
}))

module.exports = storyRouter
