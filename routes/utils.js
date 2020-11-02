const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { validationResult } = require('express-validator')

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

module.exports = {
    csrfProtection,
    asyncHandler,
    handleValidationErrors
}
