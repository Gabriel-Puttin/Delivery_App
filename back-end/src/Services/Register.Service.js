const md5 = require('md5');
const { User } = require('../database/models');
const { validateNewUser } = require('./validations/userValidation');
const loginService = require('./Login.Service');
const HttpException = require('../utils/HttpException');

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

const registerFromAdmin = async (reqBody) => {
  const { email, password, user, name } = reqBody;
  console.log(reqBody);
  if(user.role !== 'administrator') throw new HttpException(401, 'unauthorized')

  await validateNewUser(email);
  
  const hashPassword = md5(password);
  
  await User.create({ 
    name,
    password: hashPassword,
    email,
    role: reqBody.tipo,
  });
  

  return;
};

module.exports = {
  register,
  registerFromAdmin
};
