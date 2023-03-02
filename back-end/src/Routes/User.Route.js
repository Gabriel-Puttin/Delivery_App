const { Router } = require('express');
const userController = require('../Controllers/User.Controller');

const userRoute = Router();

userRoute.get('/sellers', userController.getSellers);

module.exports = {
  userRoute,
};
