const UserDto = require("./user.dto");

module.exports = class FileDto {
    id;
    name;
    deleted;
    reserved;
    version;
    createdAt;
    updatedAt;
    fileType;
    creator;
    editor;

    constructor(fileModel) {
        this.id = fileModel.id;
        this.name = fileModel.name;
        this.deleted = fileModel.deleted;
        this.reserved = fileModel.reserved;
        this.version = fileModel.version;
        this.createdAt = fileModel.createdAt;
        this.updatedAt = fileModel.updatedAt;
        this.fileType = fileModel.FileType.name;
        this.creator = new UserDto(fileModel.creator);
        this.editor = new UserDto(fileModel.editor);
    }
}
