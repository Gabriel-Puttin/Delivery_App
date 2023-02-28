const { verifyToken } = require('../auth');
const HttpException = require('../utils/HttpException');

module.exports = (req, _res, next) => {
  const token = req.headers.authorization;
  const tokenError = new HttpException(401, 'Token must be a valid token');

  if (!token) {
    throw tokenError;
  }

  try {
    const payload = verifyToken(token);
    req.body.user = payload;
    return next();
  } catch (error) {
    throw tokenError;
  }
};
