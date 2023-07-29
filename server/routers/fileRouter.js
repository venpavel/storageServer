const { Router } = require('express');

const fileController = require('../controllers/fileController');
const fileMiddleware = require('../middleware/fileMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME } = require('../config');

const fileRouter = Router();

fileRouter.post(
    '/',
    [checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]), fileMiddleware],
    fileController.uploadFile
);
fileRouter.get('/:id', fileController.getFile);
fileRouter.patch(
    '/:id',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    fileController.changeFileInfo
);
fileRouter.delete(
    '/:id',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    fileController.removeFile
);
fileRouter.get('/:id/info', fileController.getFileInfo);

// TODO: all below
fileRouter.post('/:id/versions', fileController.addFileVersion);
fileRouter.get('/:id/versions/:ver', fileController.getFileVersion);
fileRouter.get('/:id/versions/:ver/info', fileController.getFileVersionInfo);
fileRouter.delete('/:id/versions/:ver', fileController.removeFileVersion);

fileRouter.post('/contents', fileController.createFolder);
fileRouter.get(
    '/contents/:id',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    fileController.getFolderContent
);
fileRouter.get('/contents/:id/info', fileController.getFolderInfo);

module.exports = fileRouter;
