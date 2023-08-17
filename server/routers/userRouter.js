const {Router} = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');
const {APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME} = require('../config');
const {
    loginValidation,
    createUserValidation,
    updateUserValidation,
    registrationValidation
} = require('../validators/usersRouteValidators');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);

userRouter.post(
    '/',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    createUserValidation(),
    userController.createUser
);

userRouter.put(
    '/',
    checkRoleMiddleware([APP_ADMIN_ROLE_NAME, APP_POWERUSER_ROLE_NAME]),
    updateUserValidation(),
    userController.updateUser
);

userRouter.post('/login', loginValidation(), userController.login);

userRouter.post('/logout', userController.logout);

userRouter.post('/registration', registrationValidation(), userController.registration);

userRouter.get('/refresh', userController.refresh);

// userRouter.post('/auth', authMiddleware, userController.check);

module.exports = userRouter;
