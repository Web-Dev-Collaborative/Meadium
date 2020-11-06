const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../auth');
const { Story, User } = require('../../db/models');
const { asyncHandler } = require('../utils')

router.get('/search/:title(\\w*)', asyncHandler(async (req, res) => {
    console.log('hi from router')
    const id = res.locals.user.id;
    console.log(res.locals.user.id);
    const user = await User.findByPk(id);
    const authorId = user.id;
    const title = req.params.title
    const message = 'hi';
    console.log(title);
    const stories = await Story.findAll({
        where: {
            title: {
                like: `%${title}%`
            },
            authorId: authorId
        }
    });
    console.log(stories)
    console.log('after');
    return res.json(message);
}))

router.post('/search', asyncHandler(async (req, res) => {
    const { title } = req.body;
    console.log(title)
}))

module.exports = router;
