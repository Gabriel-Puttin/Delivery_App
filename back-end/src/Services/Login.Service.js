const md5 = require('md5');
const { createToken } = require('../auth');
const { User } = require('../database/models');
const HttpException = require('../utils/HttpException');

const login = async (userInfo) => {
  const { email, password } = userInfo;
  const hashPassword = md5(password);
  const user = await User.findOne({ where: { email, password: hashPassword } });

  if (!user) {
    throw new HttpException(404, 'Not Found');
  }

  const payload = {
    email: user.email,
    role: user.role,
  };

  const token = createToken(payload);

  return token;
};

module.exports = {
  login,
};
