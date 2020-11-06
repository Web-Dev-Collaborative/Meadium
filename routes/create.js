const express = require('express');

const { Story, User } = require('../db/models');
const { asyncHandler } = require('./utils');
const { requireAuth } = require('../auth')

const createStoryRouter = express.Router();


createStoryRouter.get('/', asyncHandler(async (req, res) => {
    res.render('createStory')
}))

createStoryRouter.post("/", asyncHandler(async (req, res) => {
    const id = res.locals.user.id
    const { title, subheader, body } = req.body
}))

module.exports = createStoryRouter
