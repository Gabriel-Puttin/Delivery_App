const { Router } = require('express');
const registerController = require('../Controllers/Register.Controller');

const registerRoute = Router();

registerRoute.post('/', registerController.register);

module.exports = {
  registerRoute,
};
