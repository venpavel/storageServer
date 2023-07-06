const fileService = require('../models/services/fileService');
const ApiError = require('../error/ApiError');

class FileController {
    async getFile(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                return next(ApiError.badClientRequest('Не указан id файла!'));
            }
            const result = await fileService.getFile(id);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async getFileInfo(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                return next(ApiError.badClientRequest('Не указан id файла!'));
            }
            const result = await fileService.getFileInfo(id);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async getFileVersion(req, res, next) {
        try {
            const id = req.params.id;
            const version = req.params.ver;
            if (!id || !version) {
                return next(ApiError.badClientRequest('Не указан id или версия файла!'));
            }
            const result = await fileService.getFileVersion(id, version);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async getFileVersionInfo(req, res, next) {
        try {
            const id = req.params.id;
            const version = req.params.ver;
            if (!id || !version) {
                return next(ApiError.badClientRequest('Не указан id или версия файла!'));
            }
            const result = await fileService.getFileVersionInfo(id, version);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async uploadFile(req, res, next) {
        try {
            const { id } = req.body;
            if (!id) {
                return next(ApiError.badClientRequest('Не указан id  файла!'));
            }
            const result = await fileService.uploadFile(id);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async changeFileInfo(req, res, next) {
        try {
            const { id } = req.body;
            if (!id) {
                return next(ApiError.badClientRequest('Не указан id  файла!'));
            }
            const result = await fileService.changeFileInfo(id);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async addFileVersion(req, res, next) {
        try {
            const { id } = req.body;
            if (!id) {
                return next(ApiError.badClientRequest('Не указан id  файла!'));
            }
            const result = await fileService.addFileVersion(id);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async removeFile(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) {
                return next(ApiError.badClientRequest('Не указан id  файла!'));
            }
            const result = await fileService.removeFile(id);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }

    async removeFileVersion(req, res, next) {
        try {
            const id = req.params.id;
            const version = req.params.ver;
            if (!id || !version) {
                return next(ApiError.badClientRequest('Не указан id или версия файла!'));
            }
            const result = await fileService.removeFileVersion(id, version);
            res.json(result);
        } catch (e) {
            console.log(e);
            return next(ApiError.internalError({ message: e.message }));
        }
    }
}

module.exports = new FileController();
