const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');
const tokenService = require("../models/services/tokenService");

module.exports = (role = []) => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const accessToken = req.headers.authorization?.split(' ')[1];
            if (!accessToken) {
                return next(ApiError.notAuthorized('Вы не авторизованы!'));
            }

            const decodedToken = tokenService.validateAccessToken(accessToken);
            if (!decodedToken){
                return next(ApiError.notAuthorized('Вы не авторизованы!'));
            }
            if (!role.includes(decodedToken.role)) {
                return next(ApiError.accessForbidden('Нет доступа!'));
            }
            req.user = decodedToken;
            next();
        } catch (e) {
            return next(ApiError.notAuthorized('Ошибка авторизации!'));
        }
    };
};
