const salesService = require('../Services/Sales.Service');

const register = async (req, res, next) => {
  try {
    const sale = await salesService.register(req.body);
    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
