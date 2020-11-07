const express = require('express')
const router = express.Router();
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const db = require('../../db/models');
const User = db.User
const Story = db.Story


router.put('/search', async (req, res) => {
    const { title, id } = req.body;
    const user = await User.findByPk(id);
    const authorId = user.id;
    try {
        const stories = await Story.findAll({
            where: {
                authorId,
                title: {
                    [Op.like]: `%${title}%`
                }
            }
        });
        if(stories.length) {
            res.json(stories);
            return;
        } else {
            const message = 'You have no stories with that input';
            return res.json({ message });
        }

    } catch(e) {
        const message = 'You have no stories with that input';
        return res.json({ message });
    }
});


module.exports = router;
