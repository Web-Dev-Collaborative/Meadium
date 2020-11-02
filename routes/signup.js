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

signupRouter.post('/', userValidations, handleValidationErrors, asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, password, birthday } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.build({
        username,
        firstName,
        lastName,
        email,
        hashedPassword
    })
    try {
        await user.save();
        res.redirect('/')

    } catch (err) {
        if (err) {
            const errors = err.errors.map((error) => error.message)
            res.render('signup', {
                username,
                firstName,
                lastName,
                email,
                errors
            })
        }
    }
}))

module.exports = signupRouter;
