const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User, Role, UserType } = require('../models');
const {
    APP_STORAGE_SECRET_KEY: secret,
    APP_STORAGE_USER_ROLE_NAME: USER_ROLE_NAME,
    APP_STORAGE_USER_TYPE_NAME: USER_TYPE_NAME,
} = require('../../config');

class UserService {
    async login({ email, password }) {
        const dbuser = await User.findOne({ where: { email: email }, include: Role });
        if (!dbuser) throw new Error('Не найден пользователь в БД с таким email');

        const validUser = await bcrypt.compare(password, dbuser.password);
        if (!validUser) throw new Error('Указан неверный пароль!');

        const tokenstring = { name: dbuser.name, email, role: dbuser.role.name };
        const token = jwt.sign(tokenstring, secret, { expiresIn: '10h' });

        return { token: token };
    }

    async check(name, email, role) {
        const token = jwt.sign({ name, email, role }, secret, { expiresIn: '10h' });
        return { token };
    }

    async registration({ firstName, lastName, email, password }) {
        const user = await this.createUser({ firstName, lastName, email, password });
        const tokenstring = { name: user.name, email, role: user.role };
        const token = jwt.sign(tokenstring, secret, { expiresIn: '10h' });

        return { token: token };
    }

    async createUser({ firstName, lastName, email, password, role = USER_ROLE_NAME }) {
        const dbRole = await Role.findOne({ where: { name: role } });
        const userTypeId = await UserType.findOne({ where: { name: USER_TYPE_NAME } });

        if (!dbRole || !userTypeId) {
            throw new Error('Ошибка поиска ролей в БД!');
        }

        const hashPassword = await bcrypt.hash(password, 8);
        const user = await User.create({
            name: firstName,
            lastname: lastName,
            email,
            password: hashPassword,
            userTypeId: userTypeId.id,
            roleId: dbRole.id,
        });
        user.role = role;
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
        const oldUser = await User.findOne({ where: { id }, include: Role });
        if (!oldUser) {
            throw new Error('Ошибка, не найден пользователь!');
        }

        let newRoleId;
        if (newRole) {
            const dbRole = await Role.findOne({ where: { name: newRole } });
            if (!dbRole) {
                throw new Error('Ошибка поиска ролей в БД!');
            }
            newRoleId = dbRole.id;
        } else {
            newRoleId = oldUser.roleId;
        }

        const newPasswordHash = newPassword ? await bcrypt.hash(newPassword, 8) : oldUser.password;

        const user = await User.update(
            {
                name: newFirstName,
                lastname: newLastName,
                email: newEmail,
                password: newPasswordHash,
                roleId: newRoleId,
            },
            { where: { id } }
        );
        return user;
    }

    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
}

module.exports = new UserService();
