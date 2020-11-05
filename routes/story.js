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
    include: [{ model: User, attributes: ['firstName'] }, Comment]
  });

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
  console.log("GOT HERE")
  if (avgRating) {
    console.log("AND GOT HERE")
    return res.send(avgRating)
  }
}))

storyRouter.post('/:id(\\d+)/cheers', asyncHandler(async (req, res) => {
  let { rating, userId, storyId } = req.body
  if (userId && await Cheer.findOne({ where: { userId, storyId } })) {
    let cheer = await Cheer.findOne({ where: { userId, storyId } })
    cheer.rating = rating
    cheer.save()
  } else if (userId && !await Cheer.findOne({ where: { userId, storyId, rating } })) {
    Cheer.create({ userId, storyId, rating })
  }
}))

module.exports = storyRouter
