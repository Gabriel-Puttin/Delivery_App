const { Router } = require('express');
const productsController = require('../Controllers/Products.Controller');

const productsRoute = Router();

productsRoute.get('/', productsController.getAll);

module.exports = { productsRoute };
