const { Router } = require('express');
const userController = require('../Controllers/User.Controller');
const validateToken = require('../middlewares/validateToken');

const userRoute = Router();

userRoute.get('/sellers', userController.getSellers);
userRoute.get('/', userController.getAll);
userRoute.post('/admin/register', validateToken, userController.registerAsAdmin);
userRoute.post('/register', userController.register);
userRoute.delete('/:id', userController.remove);

module.exports = { userRoute };
