const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { validationResult, check } = require('express-validator')

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map(error => error.msg);
        const err = Error('Bad request.')
        err.error = errors;
        err.status = 404;
        err.title = 'Bad request.'
        next(err)
    }
    next();
}

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
    .withMessage('Please provide a username')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/, 'g')
    .withMessage('Username must not contain any symbols');

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

module.exports = {
    csrfProtection,
    asyncHandler,
    handleValidationErrors,
    userValidations,
}
