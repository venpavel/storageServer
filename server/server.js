require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fse = require('fs-extra');

const {APP_UPLOADS_FOLDER} = require('./config');
const sequelize = require('./db_conn');
const router = require('./routers/index');
const errorMiddleware = require('./middleware/errorMiddleware');

const PORT = process.env.APP_SERVER_PORT || 8082;

const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.APP_CLIENT_URL,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

const appStart = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({alter: true});
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
