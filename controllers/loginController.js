const {
  loginUser,
} = require("../models/investorModel");

const login = (req, res) => {

  const { email, password } =
    req.body;

  const user =
    loginUser(email, password);

  if (!user) {

    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  return res.json({

    token: "samplejwttoken",

    user,

    message: "Login Success",
  });
};

module.exports = {
  login,
};