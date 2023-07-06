const userService = require('../models/services/userService');
const ApiError = require('../error/ApiError');

class UserController {
    async createUser(req, res, next) {
        try {
            const { firstName, lastName, email, password, role } = req.body;
            // TODO: Заменить на проверку либо плагином либо общ.ф-ией?
            // TODO:  role может отдельная функция
            if (!firstName || !lastName || !password) {
                return next(ApiError.badClientRequest('Введены не все данные!'));
            }
            const user = await userService.createUser({
                firstName,
                lastName,
                email,
                password,
                role,
            });
            res.json(user);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async registration(req, res, next) {
        try {
            const { firstName, lastName, email, password } = req.body;
            // TODO: Заменить на проверку либо плагином либо общ.ф-ией?
            // TODO:  role может отдельная функция
            if (!firstName || !lastName || !password) {
                return next(
                    ApiError.badClientRequest('Ошибка при регистраци. Введены не все данные!')
                );
            }
            const result = await userService.registration({
                firstName,
                lastName,
                email,
                password,
            });
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            // TODO: также проверка
            if (!email || !password) {
                return next(ApiError.badClientRequest('Введите email и пароль!'));
            }
            const result = await userService.login({ email, password });
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async check(req, res) {
        try {
            const result = await userService.check(req.user.name, req.user.email, req.user.role);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async updateUser(req, res, next) {
        try {
            const { id, firstName, lastName, email, password, role } = req.body;
            // TODO: Заменить на проверку либо плагином либо общ.ф-ией?
            // TODO:  role может отдельная функция
            if (!id) {
                return next(ApiError.badClientRequest('Не выбран пользователь для изменения!'));
            }

            const user = await userService.updateUser({
                id,
                firstName,
                lastName,
                email,
                password,
                role,
            });
            res.json(user);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }
}

module.exports = new UserController();
