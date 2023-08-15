const { Router } = require('express');

const fileController = require('../controllers/fileController');
const fileMiddleware = require('../middleware/fileMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME } = require('../config');
const {
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
} = require('../validators/filesRouteValidators');

const fileRouter = Router();

fileRouter.post(
    '/',
    [checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]), fileMiddleware],
    fileController.uploadFile
);

fileRouter.get('/:id', getFileValidation(), fileController.getFile);

fileRouter.patch(
    '/:id',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    changeFileInfoValidation(),
    fileController.changeFileInfo
);
fileRouter.delete(
    '/:id',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    removeFileValidation(),
    fileController.removeFile
);
fileRouter.get('/:id/info', getFileInfoValidation(), fileController.getFileInfo);

// TODO: all below
fileRouter.post('/:id/versions', addFileVersionValidation(), fileController.addFileVersion);
fileRouter.get(
    '/:id/versions/:ver',
    getFileVersionValidation(),
    fileController.getFileVersion
);
fileRouter.get(
    '/:id/versions/:ver/info',
    getFileVersionInfoValidation(),
    fileController.getFileVersionInfo
);
fileRouter.delete(
    '/:id/versions/:ver',
    removeFileVersionValidation(),
    fileController.removeFileVersion
);

fileRouter.post('/contents', fileController.createFolder);
fileRouter.get(
    '/contents/:id',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    getFolderContentValidation(),
    fileController.getFolderContent
);
fileRouter.get('/contents/:id/info', getFolderInfoValidation(), fileController.getFolderInfo);

module.exports = fileRouter;
