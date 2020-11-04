const express = require('express');

const { Story, User, Comment, Pin } = require('../db/models');
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
  const story = await Story.findByPk(storyId, {
    include: [{ model: User, attributes: ['firstName'] }, Comment]
  });

  if (story) {
    res.render('story', {
      story
    });
  } else {
    next(storyNotFound(storyId));
  };
}));

module.exports = storyRouter
