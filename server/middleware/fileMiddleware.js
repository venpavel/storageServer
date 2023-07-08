const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../error/ApiError');
const { APP_MIMETYPES_ALLOWED, APP_UPLOADS_FOLDER } = require('../config');

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(APP_UPLOADS_FOLDER));
    },
    filename: (req, file, cb) => {
        let newName = `${uuidv4()}.${file.originalname.split('.')[1]}`;
        cb(null, newName);
    },
});

const fileFilter = (req, file, cb) => {
    if (APP_MIMETYPES_ALLOWED.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(ApiError.badClientRequest('Неразрешенный тип файла!'), false);
    }
};

// TODO: multer().array('files');???
module.exports = multer({ storage: storageConfig, fileFilter: fileFilter }).single('filedata');
