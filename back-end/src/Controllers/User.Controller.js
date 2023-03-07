const userService = require('../Services/User.Service');

const getAll = async (_req, res, next) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getSellers = async (_req, res, next) => {
  try {
    const sellers = await userService.getSellers();
    res.status(200).json(sellers);
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const registerAsAdmin = async (req, res, next) => {
  try {
    await userService.registerAsAdmin(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.remove(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSellers,
  getAll,
  register,
  registerAsAdmin,
  remove,
};
