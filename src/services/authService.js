const userRegister = (req, res) => {
  console.log("userRegister");
  res.status(200).json({data: "userRegister"});
};

const userLogin = (req, res) => {
  console.log("userLogin");
  res.status(200).json({data: "userLogin"});
};

const userLogout = (req, res) => {
  console.log("userLogout");
  res.status(200).json({data: "userLogout"});
};

const userResetPassword = (req, res) => {
  console.log("userResetPassword");
  res.status(200).json({data: "userResetPassword"});
};


export default {
  userRegister,
  userLogin,
  userLogout,
  userResetPassword,
};
