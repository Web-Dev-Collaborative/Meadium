const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(express.json())
router.use(bodyParser.json());

const { User, Story, Pinned } = require('../db/models')
const { asyncHandler } = require('./utils');
const { requireAuth, logoutUser } = require('../auth');

router.get('/', requireAuth, asyncHandler(async(req, res) => {
    console.log('hi')
    console.log(req.body);
    const id = res.locals.user.id
    const user = await User.findByPk(id);
    const authorId = user.id;
    const stories = await Story.findAll({where: { authorId }})
    ///////// Need to create Pinned table in database.
    // const pinnerId = user.id;
    // const pinned = await Pinned.findAll({where: { pinnerId }});
    ///////
    // res.json({ })
    res.render('profile', { user, stories });
}));

router.post('/search', asyncHandler(async(req, res) => {
    console.log('hi')
    const { title } = req.body;
    const stories = await Story.findAll({
        where: {
            title: {
                [Op.like]: `%${title}%`
            }
        }
    });
    return res.json({ stories });
}));

router.post('/logout', (req, res) => {
    logoutUser(req, res);
    res.redirect('/');
})


module.exports = router;
