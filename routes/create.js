const express = require('express');

const { Story, User } = require('../db/models');
const { asyncHandler, getDate, storyValidations, csrfProtection, handleValidationErrors } = require('./utils');
const { requireAuth } = require('../auth')

const createStoryRouter = express.Router();

const storyCreateFail = () => {
    const error = new Error(`The server couldn't create this story - check that you have filled out the Title, Subtitle, and body.`);
    error.title = 'Story Creation Failed';
    error.status = 500;

    return error;
};

createStoryRouter.get('/', requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    res.locals.path = req.originalUrl
    res.render('createStory', {
        csrfToken: req.csrfToken()
    })
}))

createStoryRouter.post("/create", storyValidations, handleValidationErrors, asyncHandler(async (req, res, next) => {
    const authorId = res.locals.user.id
    const { title, subheader, body } = req.body
    const imgPath = "/Assets/imgPath/willy.jpg"
    let story
    if (body) {
        story = await Story.create({ body, authorId, title, subheader, imgPath })
        let created = getDate(story.createdAt)
        res.json({
            userId: authorId,
            authorId,
            story,
            created
        })
    } else {
        const errors = res.errors
        res.json(res.errors)
    }
}))

module.exports = createStoryRouter
