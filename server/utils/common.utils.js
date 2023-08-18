const sequelize = require("../db_conn");
const fse = require("fs-extra");
const {APP_UPLOADS_FOLDER} = require("../config");

const PORT = process.env.APP_SERVER_PORT || 8082;

const appStart = async (app) => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
        console.log('Connection to DB has been established successfully.');

        const uploads = await fse.ensureDir(APP_UPLOADS_FOLDER);
        if (uploads) {
            console.log('Uploads dir created:', uploads);
        }

        app.listen(PORT, () => {
            console.log(`Storage server succesfully started at ${PORT} port.`);
        });
    } catch (error) {
        console.error('Unable to start application:', error);
    }
};

module.exports = {
    appStart
};
