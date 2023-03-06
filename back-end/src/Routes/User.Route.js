const { Router } = require('express');
const userController = require('../Controllers/User.Controller');

const userRoute = Router();

userRoute.get('/sellers', userController.getSellers);

userRoute.get('/', userController.getAll);

userRoute.delete('/:id', userController.remove);

module.exports = {
  userRoute,
};
