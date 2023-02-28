const HttpException = require('../../utils/HttpException');
const { User } = require('../../database/models');

const validateNewUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) throw new HttpException(409, 'Email already registered'); 
};

module.exports = { validateNewUser };