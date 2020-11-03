const express = require('express')
const { asyncHandler, handleValidationErrors, userValidations } = require('./utils.js')
const { User } = require('../db/models')
const signupRouter = express.Router();
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const { check } = require('express-validator')

// signupRouter.use(bodyParser)

signupRouter.get('/', asyncHandler(async (req, res) => {
    res.render('signup')
}))

signupRouter.post('/', userValidations, handleValidationErrors, asyncHandler(async (req, res, next) => {
    const { username, firstName, lastName, email, password, birthday } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);


    if (res.errors.length !== 0) {
        const errors = res.errors
        res.render('signup', {
            username,
            firstName,
            lastName,
            email,
            errors
        })
    } else {
        await User.create({
            username,
            firstName,
            lastName,
            email,
            hashedPassword
        })
        res.redirect('/')
    }
}))

module.exports = signupRouter;
