const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { asyncHandler, handleValidationErrors } = require('./utils.js')

const { User } = require('../db/models')
const { handleValidationErrors } = require('./utils');

//first name, last name, username, email, password

const validateFirstNameAndLastName = [
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a first name'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a last name')
]

const validateUsername = check('username')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a username');

const validateEmail = check('email')
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage('Please provide an email');

const validatePassword = check('password')
  .exists({ checkFalsy: true })
  .withMessage('Please provide a password')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
  .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")');

const userValidations = [validateFirstNameAndLastName, validateUsername, validateEmail, validatePassword];

router.post('/', userValidations, handleValidationErrors, asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ firstName, lastName, username, email, hashedPassword });
}));

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
