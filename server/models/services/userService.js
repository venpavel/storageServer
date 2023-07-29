const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Repo } = require('./repositories');
const {
    APP_SECRET_KEY: secret,
    APP_USER_ROLE_NAME: USER_ROLE_NAME,
    APP_USER_TYPE_NAME: USER_TYPE_NAME,
} = require('../../config');

class UserService {
    userRepo;

    constructor(repo) {
        this.userRepo = repo;
    }

    async login({ email, password }) {
        const dbuser = await this.userRepo.findOne_('User', { email }, ['role']);
        if (!dbuser) throw new Error('Не найден пользователь в БД с таким email');

        const validUser = await bcrypt.compare(password, dbuser.password);
        if (!validUser) throw new Error('Указан неверный пароль!');

        const tokenstring = { id: dbuser.id, name: dbuser.name, email, role: dbuser.role.name };
        // TODO: Время жизни токена
        const token = jwt.sign(tokenstring, secret, { expiresIn: '10h' });

        return { token: token };
    }

    async check(id, name, email, role) {
        const token = jwt.sign({ id, name, email, role }, secret, { expiresIn: '10h' });
        return { token };
    }

    async registration({ firstName, lastName, email, password }) {
        const user = await this.createUser({ firstName, lastName, email, password });
        const tokenstring = { id: user.id, name: user.name, email, role: user.role };
        const token = jwt.sign(tokenstring, secret, { expiresIn: '10h' });

        return { token: token };
    }

    async createUser({ firstName, lastName, email, password, role = USER_ROLE_NAME }) {
        const dbRole = await this.userRepo.findOne_('Role', { name: role });
        const userTypeId = await this.userRepo.findOne_('UserType', { name: USER_TYPE_NAME });

        if (!dbRole || !userTypeId) {
            throw new Error('Ошибка поиска ролей в БД!');
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
        //const oldUser = await User.findOne_({ where: { id }, include: { association: 'role' } });
        const oldUser = await this.userRepo.findOne_('User', { id }, ['role']);
        if (!oldUser) {
            throw new Error('Ошибка, не найден пользователь!');
        }

        let newRoleId;
        if (newRole) {
            const dbRole = await this.userRepo.findOne_('Role', { name: newRole });
            if (!dbRole) {
                throw new Error('Ошибка поиска ролей в БД!');
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
            { id }
        );
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepo.findAll_('User', {}, ['role', 'UserType']);
        return users;
    }
}

module.exports = new UserService(new Repo());
