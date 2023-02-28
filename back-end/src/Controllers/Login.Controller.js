const loginService = require('../Services/Login.Service');

const login = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await loginService.login(req.body);
    res.status(200).json({ message: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
