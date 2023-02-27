const { loginService } = require('../Services/Login.Service');

const loginController = async (req, res) => {
  try {
    const users = await loginService();
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  loginController,
};
