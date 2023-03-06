const registerService = require('../Services/Register.Service');

const register = async (req, res, next) => {
  try {
    const user = await registerService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const registerFromAdmin = async (req, res, next) => {
  try {
    await registerService.registerFromAdmin(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  registerFromAdmin,
};
