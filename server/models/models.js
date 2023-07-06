const { DataTypes } = require('sequelize');
const sequelize = require('../db_conn');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING },
});

const UserType = sequelize.define(
    'user_type',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
);

const Role = sequelize.define(
    'role',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
);

const File = sequelize.define('file', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    deleted: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    reserved: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    version: { type: DataTypes.INTEGER },
});

const FileType = sequelize.define(
    'file_type',
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: false }
);

UserType.hasMany(User);
User.belongsTo(UserType);

Role.hasMany(User);
User.belongsTo(Role);

FileType.hasMany(File);
File.belongsTo(FileType);

User.hasMany(File, {
    onDelete: 'no action',
    foreignKey: 'createdById',
});
File.belongsTo(User, {
    as: 'creator',
    foreignKey: 'createdById',
});

User.hasMany(File, {
    onDelete: 'no action',
    foreignKey: 'modifiedById',
});
File.belongsTo(User, {
    as: 'editor',
    foreignKey: 'modifiedById',
});

module.exports = {
    User,
    UserType,
    Role,
    File,
    FileType,
};
