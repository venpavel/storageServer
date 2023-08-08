const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fse = require('fs-extra');

const { APP_UPLOADS_FOLDER } = require('./config');
const sequelize = require('./db_conn');
const router = require('./routers/index');

dotenv.config();
const PORT = process.env.APP_SERVER_PORT || 8082;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

// TODO: сделать обработку ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status).send(err.message);
});

const appStart = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Connection to DB has been established successfully.');

        // TODO: файл инициации приложения?
        const uploads = await fse.ensureDir(APP_UPLOADS_FOLDER);
        if (uploads) {
            console.log('Uploads dir created:', uploads);
        }

        app.listen(PORT, () => {
            // TODO: close DB connection on server stop
            console.log(`Storage server succesfully started at ${PORT} port.`);
        });
    } catch (error) {
        console.error('Unable to start application:', error);
    }
};

appStart();
