require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const router = require('./routers/index');
const errorMiddleware = require('./middleware/errorMiddleware');
const { appStart } = require("./utils/common.utils");

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

appStart(app);
