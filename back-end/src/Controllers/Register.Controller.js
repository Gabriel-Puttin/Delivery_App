const registerService = require('../Services/Register.Service');

const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await registerService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
};
