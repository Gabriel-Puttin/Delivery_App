const { loginService } = require('../Services/Login.Service');

const loginController = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await loginService(req.body);
    res.status(200).json({ message: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginController,
};
