const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { validationResult, check } = require('express-validator')
const { Story, User, Comment, Pin, Cheer } = require('../db/models');


const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map(error => error.msg);
        res.errors = errors;
    }
    next();
}

const validateFirstNameAndLastName = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a first name')
        .isLength({ max: 50 })
        .withMessage('First name must not be more than 50 characters'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a last name')
        .isLength({ max: 50 })
        .withMessage('Last name must not be more than 50 characters')
];

const validateUsername = check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username')
    .matches(/^[a-z0-9_]*$/, 'g')
    .withMessage('Username must not contain any symbols')
    .isLength({ max: 50 })
    .withMessage('Username must not be more than 50 characters');

const validateEmail = check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide an email')
    .isLength({ max: 255 })
    .withMessage('Email must not be more than 255 characters');

const validatePassword = check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")')
    .isLength({ min: 8 })
    .withMessage('Password must be more than 8 characters long');

const validateConfirmPassword = check('passwordConfirm')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a confirmed password')
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Confirm Password does not match Password');
        }
        return true;
    });

const userValidations = [validateFirstNameAndLastName, validateUsername, validateEmail, validatePassword, validateConfirmPassword];

const loginUserValidations = [
    check('usernameOrEmail')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a username or email'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password')
];

const returnAverageCheers = async (storyId) => {
    const { count, rows } = await Cheer.findAndCountAll({
        where: {
            storyId: storyId
        },
        raw: true
    });
    const ratings = rows.map((cheer) => cheer.rating)
    let avgRating = Math.round((ratings.reduce((acc, val) => { return acc + val }, 0) / count) * 10) / 10
    return avgRating
}

const getDate = (createdAt) => {
    let date = createdAt.getDate()
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    let monthName = monthNames[createdAt.getMonth()].split('').slice(0, 3).join('')
    let monthString = `${monthName} ${date}`
    return monthString
}

module.exports = {
    csrfProtection,
    asyncHandler,
    handleValidationErrors,
    userValidations,
    loginUserValidations,
    returnAverageCheers,
    getDate,
}
