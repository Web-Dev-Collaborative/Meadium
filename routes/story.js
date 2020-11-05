const express = require('express');

const { Story, User, Comment, Pin, Cheer } = require('../db/models');
const { asyncHandler, returnAverageCheers } = require('./utils');

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
  const avgRating = await returnAverageCheers(storyId)
  const story = await Story.findByPk(storyId, {
    include: [{ model: User, attributes: ['firstName', 'lastName'] }, Comment]
  });
  console.log(story.imgPath)
  if (story) {
    res.render('story', {
      userId,
      story,
      avgRating
    });
  } else {
    next(storyNotFound(storyId));
  };
}));

storyRouter.get('/:id(\\d+)/avgRating', asyncHandler(async (req, res) => {
  const storyId = parseInt(req.params.id, 10);
  const avgRating = await returnAverageCheers(storyId)
  if (avgRating) {
    return res.json(avgRating)
  }
}))

storyRouter.post('/:id(\\d+)/cheers', asyncHandler(async (req, res) => {
  let { rating, userId, storyId } = req.body
  console.log(req.body)
  if (userId && await Cheer.findOne({ where: { userId, storyId } })) {
    let cheer = await Cheer.findOne({ where: { userId, storyId } })
    cheer.rating = rating
    cheer.save()
    res.sendStatus(200)
  } else {
    Cheer.create({ userId, storyId, rating })
    res.sendStatus(200)
  }
}))

module.exports = storyRouter
