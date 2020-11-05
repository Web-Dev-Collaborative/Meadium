const express = require('express');

const { Story, User, Comment, Pin } = require('../db/models');
const { asyncHandler } = require('./utils');

const cheersRouter = express.Router();


cheersRouter.post('/:id(\\d+)/cheers', asyncHandler(async (req, res) => {
    const userId = req.session.auth.id
    const storyId = parseInt(req.params.id, 10);
    console.log(storyId)
    console.log(req.body)
}))
