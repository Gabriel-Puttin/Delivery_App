const loginService = require('../Services/Login.Service');

const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const token = await loginService.login(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
