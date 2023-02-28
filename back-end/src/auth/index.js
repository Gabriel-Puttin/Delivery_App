const jwt = require('jsonwebtoken');
const fs = require('fs');

const secret = fs.readFileSync('jwt.evaluation.key');

const config = {
  expiresIn: '7d',
};

const createToken = (payload) => {
  const token = jwt.sign(payload, secret, config);
  return token;
};

const verifyToken = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

module.exports = { createToken, verifyToken };