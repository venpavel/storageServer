module.exports = class ApiError extends Error {
    constructor(status, message) {
        super(status, message);
        this.status = status;
        this.message = message;
    }

    static internalError(message) {
        return new ApiError(500, message);
    }

    static badClientRequest(message) {
        return new ApiError(400, message);
    }

    static notAuthorized(message) {
        return new ApiError(401, message);
    }

    static accessForbidden(message) {
        return new ApiError(403, message);
    }
};
