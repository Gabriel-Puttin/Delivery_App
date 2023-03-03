const salesService = require('../Services/Sales.Service');

const register = async (req, res, next) => {
  try {
    const sale = await salesService.register(req.body);
    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { user } = req.body;
    const sales = await salesService.getAll(user);
    res.status(200).json(sales);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    res.status(200).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  getAll,
  getById,
};
