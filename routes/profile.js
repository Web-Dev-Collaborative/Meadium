const express = require('express');
const router = express.Router();

const { User, Story, Pin } = require('../db/models')
const { asyncHandler } = require('./utils');
const { requireAuth, logoutUser } = require('../auth');


router.get('/about/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const id = req.params.id
    const user = await User.findByPk(id);
    res.render('about', { user })
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id)
    const authorId = user.id;
    const stories = await Story.findAll({ where: { authorId } });
    const pinned = await Pin.findAll({ where: { pinnerId: id }, include: Story })
    res.locals.path = req.path
    res.render('profile', { user, stories, pinned });
}))

router.post('/logout', (req, res) => {
    logoutUser(req, res);
    res.redirect('/');
})




module.exports = router;
