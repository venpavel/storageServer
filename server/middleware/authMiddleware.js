const jwt = require('jsonwebtoken');
const { APP_STORAGE_SECRET_KEY } = require('../config');
const ApiError = require('../error/ApiError');

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return next(ApiError.notAuthorized('Вы не авторизованы!'));
        }
        const decoded = jwt.verify(token, APP_STORAGE_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return next(ApiError.notAuthorized('Ошибка авторизации!'));
    }
};
