const { Router } = require('express');
const loginController = require('../Controllers/Login.Controller');

const loginRoute = Router();

loginRoute.post('/', loginController.login);

module.exports = {
  loginRoute,
};
