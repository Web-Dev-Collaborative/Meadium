const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcryptjs');
const { asyncHandler, handleValidationErrors, loginUserValidations, csrfProtection } = require('./utils.js')
const { loginUser } = require('../auth')

const { User } = require('../db/models')

loginRouter.get('/', csrfProtection, (req, res) => {
    res.render('login', {
        csrfToken: req.csrfToken()
    });
});

loginRouter.post('/', csrfProtection, loginUserValidations, handleValidationErrors, asyncHandler(async (req, res) => {
    const { usernameOrEmail, password } = req.body
    let user;
    console.log(req.body);

    if (usernameOrEmail.includes("@")) {
        user = await User.findOne({ where: { email: usernameOrEmail } });
    } else {
        user = await User.findOne({ where: { username: usernameOrEmail } });
    }

    if (user !== null) {
        const matchingPassword = await bcrypt.compare(password, user.hashedPassword.toString());

        if (matchingPassword) {
            loginUser(req, res, user);
            console.log(res.locals.authenticated)
            return res.redirect('/');
        } else {
            const errors = res.erros
            res.render('login', {
                usernameOrEmail,
                errors,
                csrfToken: req.csrfToken()
            });
        }

    } else {
        const errors = res.errors
        if (errors) {
            res.render('login', {
                usernameOrEmail,
                errors,
                csrfToken: req.csrfToken()
            });
        } else {
            const errors = new Error();
            // errors.title = "Login Failed";
            errors.errors = ["The provided credentials were invalid"];
            res.render('login', {
                errors,
                csrfToken: req.csrfToken()
            })

        }
    }
    // else window.alert("That user does not exist.")
}))

module.exports = loginRouter;
