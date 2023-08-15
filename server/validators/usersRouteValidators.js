const { check } = require('express-validator');

const loginValidation = () => {
    return [
        check(['email', 'password'], 'Email и password должны быть заполнены!').notEmpty().isString(),
    ];
};

const updateUserValidation = () => {
    return [
        check(['id'], 'Id не выбран!').notEmpty().isString(),
    ];
};

const createUserValidation = () => {
    return [
        check(['lastName', 'firstName', 'password'], 'Lastname, firstname и password должны быть заполнены!').notEmpty().isString(),
        check('email', 'Email введен неверно!').isEmail(),
    ];
}

const registrationValidation = () => {
    return [
        check(['lastName', 'firstName', 'password'], 'Lastname, firstname и password должны быть заполнены!').notEmpty().isString(),
        check('email', 'Email введен неверно!').isEmail(),
        check('password', 'Длинна пароля от 5 до 12 символов!').isLength({ min: 5, max: 12 }),
    ];
}

module.exports = {
    loginValidation,
    createUserValidation,
    updateUserValidation,
    registrationValidation
}