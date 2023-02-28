const md5 = require('md5');
const { User } = require('../database/models');
const { HttpException } = require('../middlewares/errorMiddleware');

const login = async (userInfo) => {
  const { email, password } = userInfo;
  const hashPassword = md5(password);
  const user = await User.findOne({ where: { email, password: hashPassword } });

  if (!user) {
    throw new HttpException(404, 'Not Found');
  }

  return user;
};

module.exports = {
  login,
};
