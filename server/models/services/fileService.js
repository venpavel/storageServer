const { Repo } = require('./repositories');

class FileService {
    fileRepo;

    constructor(repo) {
        this.fileRepo = repo;
    }

    async uploadFile(file) {
        const result = `uploadFile id=${file}`;
        return result;
    }

    async getFile(id) {
        const file = await this.fileRepo.findOne_('File', { id }, ['creator', 'editor']);
        if (!file) {
            throw new Error('Файл не найден!');
        }
        return file;
    }

    async changeFileInfo(file) {
        const result = `changeFileInfo id=${file}`;
        return result;
    }

    async removeFile(id) {
        const result = `removeFile id=${id}`;
        return result;
    }

    async getFileInfo(id) {
        const file = await this.fileRepo.findOne_('File', { id }, ['creator', 'editor']);
        if (!file) {
            throw new Error('Файл не найден!');
        }
        return file;
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

    async getFolderContent(id) {
        const result = `getFolderContent id=${id}`;
        return result;
    }

    async getFolderInfo(id) {
        const result = `getFolderInfo id=${id}`;
        return result;
    }
}

module.exports = new FileService(new Repo());
