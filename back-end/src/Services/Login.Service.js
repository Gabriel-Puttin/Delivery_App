const { User } = require('../database/models');

const loginService = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = {
  loginService,
};
