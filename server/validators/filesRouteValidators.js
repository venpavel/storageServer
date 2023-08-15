const { check } = require('express-validator');

const getFileValidation = () => {
    return [
        check(['id'], 'Id не выбран!').notEmpty().isInt(),
    ];
};

const changeFileInfoValidation = () => {
    return [
        check(['id'], 'Id не выбран!').notEmpty().isInt(),
    ];
};

const removeFileValidation = () => {
    return [
        check(['id'], 'Id не выбран!').notEmpty().isInt(),
    ];
};

const getFileInfoValidation = () => {
    return [
        check(['id'], 'Id не выбран!').notEmpty().isInt(),
    ];
};

const addFileVersionValidation = () => {
    return [
        check(['id'], 'Id не выбран!').notEmpty().isInt(),
    ];
};

const getFileVersionValidation = () => {
    return [
        check(['id', 'ver'], 'Id и Версия должны быть указаны!').notEmpty().isInt(),
    ];
};

const getFileVersionInfoValidation = () => {
    return [
        check(['id', 'ver'], 'Id и Версия должны быть указаны!').notEmpty().isInt(),
    ];
};

const removeFileVersionValidation = () => {
    return [
        check(['id', 'ver'], 'Id и Версия должны быть указаны!').notEmpty().isInt(),
    ];
};

const getFolderContentValidation = () => {
    return [
        check(['id'], 'Id папки должен быть указан!').notEmpty().isInt(),
    ];
};

const getFolderInfoValidation = () => {
    return [
        check(['id'], 'Id папки должен быть указан!').notEmpty().isInt(),
    ];
};

module.exports = {
    getFileValidation,
    changeFileInfoValidation,
    removeFileValidation,
    getFileInfoValidation,
    addFileVersionValidation,
    getFileVersionValidation,
    getFileVersionInfoValidation,
    removeFileVersionValidation,
    getFolderContentValidation,
    getFolderInfoValidation
}