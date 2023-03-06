const { Router } = require('express');
const registerController = require('../Controllers/Register.Controller');

const registerRoute = Router();

registerRoute.post('/', registerController.register);
registerRoute.post('./admin/manage', registerController.registerFromAdmin);

module.exports = {
  registerRoute,
};
