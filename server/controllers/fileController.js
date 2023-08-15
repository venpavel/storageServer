const fileService = require('../models/services/fileService');
const ApiError = require('../error/ApiError');
const { checkValidationErrors } = require('./utils.controllers');

class FileController {
    async uploadFile(req, res, next) {
        try {
            const filedata = {
                parent_id: req.body.parent_id,
                name: req.body.name,
                creator: req.user?.id || null,
            };
            const file = req.file;
            if (!file) {
                next(ApiError.badClientRequest('Ошибка при загрузке файла'));
            }

            const result = await fileService.uploadFile(file, filedata);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getFile(req, res, next) {
        try {
            checkValidationErrors(req);

            const id = req.params.id;
            const { fullpath, name } = await fileService.getFile(id);
            res.download(fullpath, name);
        } catch (e) {
            next(e);
        }
    }

    async changeFileInfo(req, res, next) {
        try {
            checkValidationErrors(req);

            const filedata = {
                id: req.params.id,
                name: req.body.name,
                editor: req.user?.id || null,
            };

            const result = await fileService.changeFileInfo(filedata);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async removeFile(req, res, next) {
        try {
            checkValidationErrors(req);

            const id = req.params.id;
            const result = await fileService.removeFile(id);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getFileInfo(req, res, next) {
        try {
            checkValidationErrors(req);

            const id = req.params.id;
            const result = await fileService.getFileInfo(id);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async addFileVersion(req, res, next) {
        try {
            checkValidationErrors(req);

            const id = req.params.id;
            const result = await fileService.addFileVersion(id);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getFileVersion(req, res, next) {
        try {
            checkValidationErrors(req);

            const id = req.params.id;
            const version = req.params.ver;
            const result = await fileService.getFileVersion(id, version);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getFileVersionInfo(req, res, next) {
        try {
            checkValidationErrors(req);

            const id = req.params.id;
            const version = req.params.ver;
            const result = await fileService.getFileVersionInfo(id, version);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async removeFileVersion(req, res, next) {
        try {
            checkValidationErrors(req);

            const id = req.params.id;
            const version = req.params.ver;
            const result = await fileService.removeFileVersion(id, version);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async createFolder(req, res, next) {
        try {
            let { parent_id } = req.body;
            if (!parent_id) {
                parent_id = 'root folder temp const here';
            }
            const result = await fileService.createFolder(parent_id);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getFolderContent(req, res, next) {
        try {
            checkValidationErrors(req);

            const { offset, limit } = req.query;
            const id = req.params.id;
            const result = await fileService.getFolderContent(id, offset, limit);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    async getFolderInfo(req, res, next) {
        try {
            checkValidationErrors(req);

            const id = req.params.id;
            const result = await fileService.getFolderInfo(id);
            res.json(result);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new FileController();
