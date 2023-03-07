const { Op } = require('sequelize');
const md5 = require('md5');
const { User } = require('../database/models');
const { validateNewUser } = require('./validations/userValidation');
const loginService = require('./Login.Service');
const HttpException = require('../utils/HttpException');

const getAll = async () => {
  const sellers = await User.findAll({ 
    where: { role: {
      [Op.not]: 'administrator',
    } }, 
    attributes: { exclude: ['password'] } });
  return sellers;
};

const getSellers = async () => {
  const sellers = await User.findAll({ 
    where: { role: 'seller' }, 
    attributes: { exclude: ['password', 'role', 'email'] } });
  return sellers;
};

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

const registerAsAdmin = async (reqBody) => {
  const { name, email, password, role, user } = reqBody;

  if (user.role !== 'administrator') throw new HttpException(401, 'Unauthorized');

  await validateNewUser(email);
  
  const hashPassword = md5(password);
  
  await User.create({ 
    name,
    password: hashPassword,
    email,
    role,
  });
};

const remove = async (id) => User.destroy({ where: { id } });

module.exports = {
  getSellers,
  getAll,
  register,
  registerAsAdmin,
  remove,
};
