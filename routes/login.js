const express = require('express');
const loginRouter = express.Router();
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { asyncHandler, handleValidationErrors, userValidations } = require('./utils.js')
const { loginUser } = require('../auth')

const { User } = require('../db/models')

loginRouter.get('/', (req, res) => {
    res.render('logout')
})

loginRouter.post('/', userValidations, handleValidationErrors, asyncHandler(async (req, res) => {
    const { input, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    let user
    if (input.includes("@")) {
        user = await User.findOne({
            where: {
                email: input,
                hashedPassword
            }
        })
    } else {
        user = await user.findOne({
            where: {
                username: input,
                hashedPassword
            }
        })
    }
    if (user) loginUser(user)
    else window.alert("That user does not exist.")
    res.redirect('/')
}))

module.exports = loginRouter;
