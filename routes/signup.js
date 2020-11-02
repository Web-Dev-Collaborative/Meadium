const express = require('express')
const { asyncHandler, handleValidationErrors } = require('./utils.js')
const { User } = require('../db/models')
const signupRouter = express.Router();
const bodyParser = require('body-parser')

signupRouter.use(bodyParser)

signupRouter.get('/', asyncHandler(async (req, res) => {
    res.render('../views/signup')
}))

signupRouter.post('/', handleValidationErrors, asyncHandler(async (req, res) => {
    const { username, firstName, lastName, email, password, birthday } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.build({
        username,
        firstName,
        lastName,
        email,
        hashedPassword
    })
    res.redirect('/')
}))

module.exports = signupRouter;
