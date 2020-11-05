const express = require('express');

const { Story, User, Comment, Pin } = require('../db/models');
const { asyncHandler, userValidations } = require('./utils');
const { requireAuth } = require('../auth');

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

  if (req.sessions) {
    const userId = req.session.auth.userId
    if (story) {
      res.render('story', {
        userId,
        story
      });
    } else {
      next(storyNotFound(storyId));
    };
  } else {
    if (story) {
      res.render('story', {
        story
      });
    } else {
      next(storyNotFound(storyId));
    };
  }
}));

storyRouter.post('/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
  const storyId = parseInt(req.params.id, 10)
  const userId = req.session.auth.userId
  // const story = await Story.findByPk(storyId, {
  //   include: [{ model: User, attributes: ['firstName'] }, Comment]
  // });

  await Comment.create({
    commenterId: userId,
    commentedOnId: storyId,
    comment: req.body.comment
  })
  res.redirect(`/stories/${storyId}`);
  // res.json({comments})
}))

storyRouter.post('/:id(\\d+)/cheers', asyncHandler(async (req, res) => {
  // const userId = req.session.auth.userId
  const storyId = parseInt(req.params.id, 10);
}))


module.exports = storyRouter
