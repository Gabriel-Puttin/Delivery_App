const userService = require('../Services/User.Service');

const getAll = async (_req, res) => {
  const users = await userService.getAll();
  res.status(200).json(users);
};

const getSellers = async (_req, res) => {
  const sellers = await userService.getSellers();
  res.status(200).json(sellers);
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

const remove = async (req, res) => {
  const { id } = req.params;
  await userService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  getSellers,
  getAll,
  register,
  registerAsAdmin,
  remove,
};
