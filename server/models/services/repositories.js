const dotenv = require('dotenv');
dotenv.config();

const PostgresRepo = require('./PostgresRepo');
const MongodbRepo = require('./MongodbRepo');

let Repo;

// TODO: возможно разделение на User и FileRepo
switch (process.env.APP_STORAGE_DB_DIALECT) {
    case 'postgres':
        Repo = PostgresRepo;
        break;
    case 'mongodb':
        Repo = MongodbRepo;
        break;
    default:
        throw new Error('Ошибка выбора репозитория');
}

module.exports = {
    Repo,
};
