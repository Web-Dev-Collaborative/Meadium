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

const getDate = (createdAt) => {
  let date = createdAt.getDate()
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let monthName = monthNames[createdAt.getMonth()].split('').slice(0, 3).join('')
  let monthString = `${monthName} ${date}`
  return monthString
}

storyRouter.get('/:id(\\d+)', asyncHandler(async (req, res, next) => {
  const storyId = parseInt(req.params.id, 10);
  const avgRating = await returnAverageCheers(storyId)
  const story = await Story.findByPk(storyId, {
    include: [{ model: User, attributes: ['firstName', 'lastName', 'profilePic'] }, Comment]
  });

  if (req.session.auth) {
    const userId = req.session.auth.userId
    if (story) {
      res.render('story', {
        userId,
        story,
        avgRating,
        created
      });
    } else {
      next(storyNotFound(storyId));
    }
  } else {
    if (story) {
      res.render('story', {
        story,
        avgRating,
        created
      });
    } else {
      next(storyNotFound(storyId));
    };
  }
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
