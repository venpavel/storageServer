const { validationResult } = require('express-validator');
const ApiError = require('../error/ApiError');

function checkValidationErrors(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw ApiError.validationError(errors.array());
    }
}

module.exports = {
    checkValidationErrors,
};
