const userService = require('../Services/User.Service');

const getSellers = async (_req, res, next) => {
  try {
    const sellers = await userService.getSellers();
    res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellers,
};
