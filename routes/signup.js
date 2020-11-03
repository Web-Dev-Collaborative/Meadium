const express = require('express');
const bcrypt = require('bcryptjs');

const { User } = require('../db/models');
const { asyncHandler, handleValidationErrors, userValidations, csrfProtection } = require('./utils.js')

const signupRouter = express.Router();

signupRouter.get('/', csrfProtection, asyncHandler(async (req, res) => {
    res.render('signup', {
        csrfToken: req.csrfToken()
    });
}));

signupRouter.post('/', userValidations, handleValidationErrors, asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        hashedPassword
    });
    res.redirect('/');
}));

module.exports = signupRouter;
