const { Router } = require('express');
const userRouter = require('./userRouter');
const fileRouter = require('./fileRouter');

const router = Router();
router.use('/users', userRouter);
router.use('/files', fileRouter);

module.exports = router;
