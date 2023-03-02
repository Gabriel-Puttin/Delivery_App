const { User } = require('../database/models');

const getSellers = async () => {
  const sellers = await User.findAll({ 
    where: { role: 'seller' } , 
    attributes: { exclude: ['password', 'role', 'email'] }});
  return sellers;
};

module.exports = {
  getSellers,
};
