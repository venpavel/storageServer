const path = require('path');
const fse = require('fs-extra');

const ApiError = require('../../error/ApiError');
const {Repo} = require('./repositories');
const {
    APP_UPLOADS_FOLDER,
    APP_STORAGE_ROOT_FOLDER,
    APP_FILE_TYPE_NAME,
    APP_FOLDER_TYPE_NAME,
} = require('../../config');
const FileDto = require('../../dto/file.dto');

class FileService {
    fileRepo;

    constructor(repo) {
        this.fileRepo = repo;
    }

    async uploadFile(file, {version = 1, parent_id, name, creator}) {
        const fileTypeId = await this.fileRepo.findOne_('FileType', {name: APP_FILE_TYPE_NAME});
        if (!fileTypeId) {
            throw ApiError.internalError('Ошибка поиска типа файл/папка в БД!');
        }
        //TODO: создать механизм размещения файла в подкаталоги и parent_id
        const storageFolder = APP_STORAGE_ROOT_FOLDER;

        const fileRecord = await this.fileRepo.create_('File', {
            name: name || file.originalname,
            version: version || 1,
            createdById: creator,
            modifiedById: creator,
            fileTypeId: fileTypeId.id,
            real_path: storageFolder,
            real_filename: file.filename,
        });
        if (!fileRecord) {
            throw ApiError.internalError('Ошибка создания записи для файла в БД!');
        }

        const src_filepath = path.resolve(file.destination, file.filename);
        const dest_filepath = path.resolve(storageFolder, file.filename);
        await fse.move(src_filepath, dest_filepath);

        return fileRecord;
    }

    async getFile(id) {
        const file = await this.fileRepo.findOne_('File', {id, deleted: 0});
        if (!file) {
            throw ApiError.internalError('Файл не найден!');
        }
        const fullpath = path.resolve(file.real_path, file.real_filename);
        const fileExist = await fse.pathExists(fullpath);
        if (!fileExist) {
            throw ApiError.internalError('Файл не найден в репозитории!');
        }

        const fileObj = {fullpath, name: encodeURIComponent(file.name)};
        return fileObj;
    }

    async changeFileInfo({id, name, editor}) {
        const file = await this.fileRepo.findOne_('File', {id, deleted: 0});
        if (!file) {
            throw ApiError.internalError('Файл не найден!');
        }
        console.log('editor = ', editor);
        const newFile = await this.fileRepo.update_(
            'File',
            {
                id,
                name: name || file.name,
                modifiedById: editor || file.modifiedById,
            },
            {id}
        );
        const fileData = new FileDto(newFile);
        return fileData;
    }

    // TODO: Удаление с диска продумать
    async removeFile(id) {
        const file = await this.fileRepo.findOne_('File', {id, deleted: 0});
        if (!file) {
            throw ApiError.internalError('Файл не найден!');
        }
        const fullpath = path.resolve(file.real_path, file.real_filename);
        const fileExist = await fse.pathExists(fullpath);
        if (!fileExist) {
            throw ApiError.internalError('Файл не найден в репозитории!');
        }

        const paranoid = await this.fileRepo.update_('File', {deleted: 1}, {id});
        const removed = await fse.remove(fullpath);

        console.log('removed = ', removed);
        return {message: 'OK'};
    }

    async getFileInfo(id) {
        const file = await this.fileRepo.findOne_('File', {id, deleted: 0}, [
            'creator',
            'editor',
            'FileType'
        ]);
        if (!file) {
            throw ApiError.internalError('Файл не найден!');
        }

        const fileData = new FileDto(file);
        return fileData;
    }

    async addFileVersion(file) {
        const result = `addFileVersion id=${file}`;
        return result;
    }

    async getFileVersion(id, version) {
        const result = `getFileVersion id=${id} version=${version}`;
        return result;
    }

    async getFileVersionInfo(id, version) {
        const result = `getFileVersionInfo id=${id} version=${version}`;
        return result;
    }

    async removeFileVersion(id, version = 'current') {
        const result = `removeFileVersion id=${id} version=${version}`;
        return result;
    }

    async createFolder(folder) {
        const result = `createFolder id=${folder}`;
        return result;
    }

    //TODO: parent_id use
    async getFolderContent(id, offset, limit) {
        const result = await this.fileRepo.findAll_(
            'File',
            {deleted: 0},
            ['creator', 'editor', 'FileType'],
            offset,
            limit
        );

        const filesData = {
            ...result,
            rows: result.rows.map(file => new FileDto(file))
        };
        return filesData;
    }

    async getFolderInfo(id) {
        const result = `getFolderInfo id=${id}`;
        return result;
    }
}

module.exports = new FileService(new Repo());
