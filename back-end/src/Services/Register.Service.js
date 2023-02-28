const md5 = require('md5');
const { createToken } = require('../auth');
const { User } = require('../database/models');
const { validateNewUser } = require('./validations/userValidation');

const register = async (userInfo) => {
  const { email, password } = userInfo;
  
  await validateNewUser(email);

  const hashPassword = md5(password);

  const newUser = await User.create({ 
    ...userInfo, 
    password: hashPassword,
    role: 'customer',
  });

  const payload = {
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };

  const token = createToken(payload);

  return {
    ...payload,
    token,
  };
};

module.exports = {
  register,
};
