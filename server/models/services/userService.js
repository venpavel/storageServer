const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {Repo} = require('./repositories');
const {
    APP_USER_ROLE_NAME: USER_ROLE_NAME,
    APP_USER_TYPE_NAME: USER_TYPE_NAME,
} = require('../../config');
const ApiError = require('../../error/ApiError');
const UserDto = require('../../dto/user.dto');
const tokenService = require('./tokenService');
const {User} = require("../models");

class UserService {
    userRepo;

    constructor(repo) {
        this.userRepo = repo;
    }

    async login({email, password}) {
        const dbuser = await this.userRepo.findOne_('User', {email}, ['role']);
        if (!dbuser) throw ApiError.badClientRequest('Не найден пользователь в БД с таким email');

        const validUser = await bcrypt.compare(password, dbuser.password);
        if (!validUser) throw ApiError.badClientRequest('Указан неверный пароль!');

        const userData = new UserDto(dbuser);

        const tokens = tokenService.generateTokens({...userData});
        await tokenService.saveUserToken(tokens.refreshToken, userData.id);

        return {...tokens, user: userData};
    }

    async logout(refreshToken) {
        return await tokenService.removeUserToken(refreshToken);
    }

    async refresh(refreshToken) {
        if(!refreshToken){
            throw ApiError.notAuthorized('Вы не авторизованы!');
        }
        const userDataFromToken = tokenService.validateRefreshToken(refreshToken);
        const refreshTokenFromDb = await tokenService.findToken(refreshToken);
        if (!userDataFromToken || !refreshTokenFromDb) {
            throw ApiError.notAuthorized('Вы не авторизованы!');
        }

        const actualUser = await this.userRepo.findOne_('User', {email: userDataFromToken.email}, ['role']);
        if(!actualUser){
            throw ApiError.notAuthorized('Невалидный пользователь!');
        }
        const userData = new UserDto(actualUser);

        const tokens = tokenService.generateTokens({ ...userData });
        await tokenService.saveUserToken(tokens.refreshToken, userData.id);

        return {...tokens, user: userData};
    }

    // async check(id, name, email, role) {
    //     const token = jwt.sign({id, name, email, role}, process.env.APP_JWT_ACCESS_SECRET, {expiresIn: '10h'});
    //     return {token};
    // }

    async registration({firstName, lastName, email, password}) {
        const candidate = await this.userRepo.findOne_('User', {email});
        if (candidate) {
            throw ApiError.badClientRequest('Пользователь с таким email существует!');
        }
        const user = await this.createUser({firstName, lastName, email, password});
        const userData = new UserDto(user);

        const tokens = tokenService.generateTokens({...userData});
        await tokenService.saveUserToken(tokens.refreshToken, userData.id);

        return {...tokens, user: userData};
    }

    async createUser({firstName, lastName, email, password, role = USER_ROLE_NAME}) {
        const dbRole = await this.userRepo.findOne_('Role', {name: role});
        const userTypeId = await this.userRepo.findOne_('UserType', {name: USER_TYPE_NAME});

        if (!dbRole || !userTypeId) {
            throw ApiError.internalError('Ошибка поиска ролей в БД!');
        }

        const hashPassword = await bcrypt.hash(password, 8);
        const user = await this.userRepo.create_('User', {
            name: firstName,
            lastname: lastName,
            email,
            password: hashPassword,
            userTypeId: userTypeId.id,
            roleId: dbRole.id,
        });
        user.role = {name: role};
        return user;
    }

    async updateUser({
                         id,
                         firstName: newFirstName,
                         lastName: newLastName,
                         email: newEmail,
                         password: newPassword,
                         role: newRole,
                     }) {
        const oldUser = await this.userRepo.findOne_('User', {id}, ['role']);
        if (!oldUser) {
            throw ApiError.internalError('Ошибка, не найден пользователь!');
        }

        let newRoleId;
        if (newRole) {
            const dbRole = await this.userRepo.findOne_('Role', {name: newRole});
            if (!dbRole) {
                throw ApiError.internalError('Ошибка поиска ролей в БД!');
            }
            newRoleId = dbRole.id;
        } else {
            newRoleId = oldUser.roleId;
        }

        const newPasswordHash = newPassword ? await bcrypt.hash(newPassword, 8) : oldUser.password;
        const user = await this.userRepo.update_(
            'User',
            {
                name: newFirstName,
                lastname: newLastName,
                email: newEmail,
                password: newPasswordHash,
                roleId: newRoleId,
            },
            {id}
        );
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepo.findAll_('User', {}, ['role', 'UserType']);
        return users;
    }
}

module.exports = new UserService(new Repo());
