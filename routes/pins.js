const express = require('express');

const { Story, User, Comment, Pin, Cheer } = require('../db/models');
const { asyncHandler, returnAverageCheers, getDate } = require('./utils');
const { requireAuth } = require('../auth')

const pinsRouter = express.Router();



pinsRouter.get("story/:storyId(\\d+)/pinned", requireAuth, asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.storyId, 10)
    const userId = req.session.auth.userId

    const pin = await Pin.findOne({
        where: {
            pinnerId: userId,
            pinnedStoryId: storyId,
        }
    })
    if (pin) res.json({ "pinned": true })
    else res.json({ "pinned": false })
}))

pinsRouter.post("story/:storyId(\\d+)", requireAuth, asyncHandler(async (req, res) => {
    const storyId = parseInt(req.params.storyId, 10)
    const userId = req.session.auth.userId
    Pin.create({
        pinnerId: userId,
        pinnedStoryId: storyId
    })
    res.sendStatus(200)
}))
