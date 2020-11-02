const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { asyncHandler, handleValidationErrors } = require('./utils.js')

const { User } = require('../db/models')


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
