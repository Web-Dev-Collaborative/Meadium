const express = require('express');
const router = express.Router();

const { User, Story, Pinned } = require('../db/models')
const { asyncHandler } = require('./utils');
const { requireAuth, logoutUser } = require('../auth');

router.get('/', requireAuth, asyncHandler(async(req, res) => {
    const id = res.locals.user.id
    const user = await User.findByPk(id);
    const authorId = user.id;
    const stories = await Story.findAll({where: { authorId }})
    ///////// Need to create Pinned table in database.
    // const pinnerId = user.id;
    // const pinned = await Pinned.findAll({where: { pinnerId }});
    /////////
    res.render('profile', { user, stories });
}));

router.post('/logout', (req, res) => {
    logoutUser(req, res);
    res.redirect('/login');
})


module.exports = router;
