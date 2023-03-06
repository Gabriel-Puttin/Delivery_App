const { Router } = require('express');
const salesController = require('../Controllers/Sales.Controller');
const validateToken = require('../middlewares/validateToken');

const salesRoute = Router();

salesRoute.post(
  '/', 
  validateToken,
  salesController.register,
);

salesRoute.get('/', validateToken, salesController.getAll);
salesRoute.get('/:id', validateToken, salesController.getById);
salesRoute.patch('/:id', validateToken, salesController.update);

module.exports = {
  salesRoute,
};
