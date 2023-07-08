const jwt = require('jsonwebtoken');
const { APP_SECRET_KEY } = require('../config');
const ApiError = require('../error/ApiError');

module.exports = (role = []) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return next(ApiError.notAuthorized('Вы не авторизованы!'));
            }
            const decoded = jwt.verify(token, APP_SECRET_KEY);
            if (!role.includes(decoded.role)) {
                return next(ApiError.accessForbidden('Нет доступа!'));
            }
            req.user = decoded;
            next();
        } catch (e) {
            return next(ApiError.notAuthorized('Ошибка авторизации!'));
        }
    };
};
