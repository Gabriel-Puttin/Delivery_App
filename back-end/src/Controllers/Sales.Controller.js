const salesService = require('../Services/Sales.Service');

const HTTP_OK_STATUS = 200;
const HTTP_CREATED_STATUS = 201;

const register = async (req, res, next) => {
  try {
    const sale = await salesService.register(req.body);
    res.status(HTTP_CREATED_STATUS).json(sale);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const { user } = req.body;
    const sales = await salesService.getAll(user);
    res.status(HTTP_OK_STATUS).json(sales);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    res.status(HTTP_OK_STATUS).json(sale);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    await salesService.update(id, req.body);
    res.status(HTTP_OK_STATUS).send({ message: 'Status updated' });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  getAll,
  getById,
  update,
};
