const { Op } = require('sequelize');
const { User } = require('../database/models');

const getAll = async () => {
  const sellers = await User.findAll({ 
    where: { role: {
      [Op.not]: 'administrator'
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

const remove = async (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getSellers,
  getAll,
  remove,
};
