const { Router } = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const { APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME } = require('../config');

const userRouter = Router();
userRouter.get('/', userController.getAllUsers);
userRouter.post(
    '/',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    userController.createUser
);
userRouter.put(
    '/',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    userController.updateUser
);
userRouter.post('/login', userController.login);
userRouter.post('/registration', userController.registration);
userRouter.post('/auth', authMiddleware, userController.check);

module.exports = userRouter;
