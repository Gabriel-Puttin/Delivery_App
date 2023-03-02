const md5 = require('md5');
const { User } = require('../database/models');
const { validateNewUser } = require('./validations/userValidation');
const loginService = require('./Login.Service');

const register = async (userInfo) => {
  const { email, password } = userInfo;
  
  await validateNewUser(email);

  const hashPassword = md5(password);

  await User.create({ 
    ...userInfo, 
    password: hashPassword,
    role: 'customer',
  });

  return loginService.login(userInfo);
};

module.exports = {
  register,
};
