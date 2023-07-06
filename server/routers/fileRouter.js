const { Router } = require('express');
const fileController = require('../controllers/fileController');

const fileRouter = Router();

fileRouter.get('/:id', fileController.getFile);
fileRouter.get('/:id/info', fileController.getFileInfo);
fileRouter.get('/:id/:ver', fileController.getFileVersion);
fileRouter.get('/:id/:ver/info', fileController.getFileVersionInfo);
fileRouter.post('/', fileController.uploadFile);
fileRouter.patch('/', fileController.changeFileInfo);
fileRouter.put('/', fileController.addFileVersion);
fileRouter.delete('/:id', fileController.removeFile);
fileRouter.delete('/:id/:ver', fileController.removeFileVersion);

module.exports = fileRouter;
