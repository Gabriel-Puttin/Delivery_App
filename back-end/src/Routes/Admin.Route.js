const { Router } = require('express');
const registerController = require('../Controllers/Register.Controller');
const validateToken = require('../middlewares/validateToken');

const adminRoute = Router();

adminRoute.post('/manage', validateToken, registerController.registerFromAdmin);

module.exports = {
  adminRoute,
};
