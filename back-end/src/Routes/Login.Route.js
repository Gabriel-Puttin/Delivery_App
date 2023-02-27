const { Router } = require('express');
const { loginController } = require('../Controllers/Login.Controller');

const loginRoute = Router();

loginRoute.get('/', loginController);

module.exports = {
  loginRoute,
};
