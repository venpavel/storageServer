module.exports = class ApiError extends Error {
    status;
    errors;
    constructor(status, message, errors = []) {
        super(status, message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static internalError(message) {
        return new ApiError(500, message);
    }

    static badClientRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static validationError(errors = []) {
        return new ApiError(400, 'Ошибка валидации!', errors);
    }

    static notAuthorized(message) {
        return new ApiError(401, message);
    }

    static accessForbidden(message) {
        return new ApiError(403, message);
    }
};
