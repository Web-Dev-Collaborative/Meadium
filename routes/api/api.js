const { compareSync } = require('bcryptjs');
const express = require('express')
const router = express.Router();

const { requireAuth } = require('../../auth');
const db = require('../../db/models');
const User = db.User
const Story = db.Story
const { asyncHandler } = require('../utils')

// router.get('/search/:title(\\w*)', asyncHandler(async (req, res) => {
//     console.log('hi from router')
//     const id = res.locals.user.id;
//     console.log(res.locals.user.id);
//     const user = await User.findByPk(id);
//     const authorId = user.id;
//     const title = req.params.title
//     const message = 'hi';
//     console.log(title);
//     const stories = await Story.findAll({
//         where: {
//             title: {
//                 like: `%${title}%`
//             },
//             authorId: authorId
//         }
//     });
//     console.log(stories)
//     console.log('after');
//     return res.json(message);
// }))

// router.post('/search', asyncHandler(async (req, res) => {
//     const { title } = req.body;
//     console.log(title)
//     return res.json(title);
// }))

router.put('/search', async (req, res) => {
    const { title } = req.body
    const id = res.locals.user.id;
    const user = await User.findByPk(id);
    const authorId = user.id;

    try {
        const stories = await Story.findAll({
            where: {
                authorId,
                title: {
                    [Op.iLike]: `%${title}%`
                }
            }
        });
        console.log(stories);
        if(stories.length) {
            res.json(stories);
            return;
        } else {
            const message = 'You have no stories with that input 2';
            return res.json({ message });
        }

    } catch(e) {
        const message = 'You have no stories with that input';
        return res.json({ message });
    }
    // console.log(stories);



});

module.exports = router;
