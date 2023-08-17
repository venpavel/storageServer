const userService = require('../models/services/userService');
const { checkValidationErrors } = require('./utils.controllers');

class UserController {
    async createUser(req, res, next) {
        try {
            checkValidationErrors(req);

            const { firstName, lastName, email, password, role } = req.body;
            const user = await userService.createUser({
                firstName,
                lastName,
                email,
                password,
                role,
            });
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async registration(req, res, next) {
        try {
            // TODO: Заменить на проверку formik \ yup??
            // TODO:  role может отдельная функция
            checkValidationErrors(req);
            const { firstName, lastName, email, password } = req.body;

            const result = await userService.registration({
                firstName,
                lastName,
                email,
                password,
            });
            res.cookie('refreshToken', result.refreshToken, { maxAge: process.env.APP_COOKIE_REFRESH_MAXAGE, httpOnly: true });
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            checkValidationErrors(req);
            const { email, password } = req.body;
            const result = await userService.login({ email, password });
            res.cookie('refreshToken', result.refreshToken, { maxAge: process.env.APP_COOKIE_REFRESH_MAXAGE, httpOnly: true })
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next){
        try {
            const { refreshToken } = req.cookies;
            if (refreshToken) {
                await userService.logout(refreshToken);
                res.clearCookie('refreshToken');
            }
            return res.json({message: 'Logged out successfully'});
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next){
        try {
            console.log('cookies: ', req.cookies);
            const { refreshToken } = req.cookies;
            const result = await userService.refresh(refreshToken);
            res.cookie('refreshToken', result.refreshToken, { maxAge: process.env.APP_COOKIE_REFRESH_MAXAGE, httpOnly: true })
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     *
     * Old func to prolongate accessToken
     */
    async check(req, res) {
        try {
            const result = await userService.check(
                req.user.id,
                req.user.email,
                req.user.name,
                req.user.lastname,
                req.user.role
            );
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req, res, next) {
        try {
            checkValidationErrors(req);
            const { id, firstName, lastName, email, password, role } = req.body;

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
            next(e);
        }
    }

    /*  result format:
        [
            {
                "id": 3,
                "name": "Иван",
                "lastname": "Иванов",
                "email": "ivan@ivan.i",
                "password": "*****",
                "createdAt": "2023-07-05T15:40:09.818Z",
                "updatedAt": "2023-07-07T16:56:37.150Z",
                "userTypeId": 1,
                "roleId": 2,
                "role": {
                    "id": 2,
                    "name": "USER"
                },
                "UserType": {
                    "id": 1,
                    "name": "User"
                }
            },
        ]
    */
    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
