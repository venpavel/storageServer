const { User, Role, UserType, File, FileType } = require('../models');

module.exports = class PostgresRepo {
    chooseModel(name) {
        let model;
        switch (name) {
            case 'User':
                model = User;
                break;
            case 'Role':
                model = Role;
                break;
            case 'UserType':
                model = UserType;
                break;
            case 'File':
                model = File;
                break;
            case 'FileType':
                model = FileType;
                break;
            default:
                throw new Error('Не найдена запрашиваемая модель!');
        }
        return model;
    }

    async findOne_(modelName, conditions, includes = []) {
        const allConditions = { where: { ...conditions } };
        if (includes.length) {
            allConditions.include = includes.map((include) => ({ association: include }));
        }
        //console.log('allconditions:', allConditions);
        const repoModel = this.chooseModel(modelName);
        const entity = await repoModel.findOne(allConditions);
        return entity;
    }

    async create_(modelName, dataObject) {
        const repoModel = this.chooseModel(modelName);
        const entity = await repoModel.create({ ...dataObject });
        return entity;
    }

    async update_(modelName, dataObject, conditions) {
        const allConditions = { where: { ...conditions } };
        const repoModel = this.chooseModel(modelName);
        const changedEntity = await repoModel.update({ ...dataObject }, allConditions);
        return changedEntity;
    }

    async findAll_(modelName, conditions = {}, includes = [], offset = null, limit = null) {
        let allConditions = {};
        if (Object.keys(conditions).length) {
            allConditions = { where: { ...conditions } };
        }
        if (includes.length) {
            allConditions.include = includes.map((include) => ({ association: include }));
        }
        allConditions.offset = offset;
        allConditions.limit = limit;
        //console.log('allconditions:', allConditions);

        const repoModel = this.chooseModel(modelName);
        const entities = await repoModel.findAndCountAll(allConditions);
        return entities;
    }
};
