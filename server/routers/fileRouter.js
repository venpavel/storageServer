const { Router } = require('express');
const fileController = require('../controllers/fileController');

const fileRouter = Router();

fileRouter.post('/', fileController.uploadFile);
fileRouter.get('/:id', fileController.getFile);
fileRouter.patch('/:id', fileController.changeFileInfo);
fileRouter.delete('/:id', fileController.removeFile);
fileRouter.get('/:id/info', fileController.getFileInfo);
fileRouter.post('/:id/versions', fileController.addFileVersion);
fileRouter.get('/:id/versions/:ver', fileController.getFileVersion);
fileRouter.get('/:id/versions/:ver/info', fileController.getFileVersionInfo);
fileRouter.delete('/:id/versions/:ver', fileController.removeFileVersion);

fileRouter.post('/contents', fileController.createFolder);
fileRouter.get('/contents/:id', fileController.getFolderContent);
fileRouter.get('/contents/:id/info', fileController.getFolderInfo);

module.exports = fileRouter;
