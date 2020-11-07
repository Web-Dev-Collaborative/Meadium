const express = require('express');

const { Story, User } = require('../db/models');
const { asyncHandler, getDate } = require('./utils');
const { requireAuth } = require('../auth')

const createStoryRouter = express.Router();

const storyCreateFail = () => {
    const error = new Error(`The server couldn't create this story - check that you have filled out the Title, Subtitle, and body.`);
    error.title = 'Story Creation Failed';
    error.status = 500;

    return error;
};

createStoryRouter.get('/', asyncHandler(async (req, res) => {
    res.render('createStory')
}))

createStoryRouter.post("/create", asyncHandler(async (req, res, next) => {
    const authorId = res.locals.user.id
    const { title, subheader, body } = req.body
    const imgPath = "/Assets/imgPath/willy.jpg"
    if (body) {
        let story = await Story.create({ body, authorId, title, subheader, imgPath })
        let created = getDate(story.createdAt)
        res.json({
            userId: authorId,
            authorId,
            story,
            created
        })
    }
    // if (story) {
    //     res.render("story", {
    //         userId: authorId,
    //         authorId,
    //         story,
    //         created
    //     })
    // } else {
    //     next(storyCreateFail(story.id))
    // }
}))

module.exports = createStoryRouter
