const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const createUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });

  return res.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  res.status(200).json({ message: "delete function working..." });
};


// Login handler
const loginUser = async (req, res) => {

  const { email, password } = req.body;
  //Find the user in the database
  const user = await User.findOne({ email });

  if (!user) {
    //User not found
    return res.status(404).json({ message: "User not found" });

  } else {
    
    if (user.password == password) {
      // Create jwt ACCESS token
      const accessToken = jwt.sign({ email }
        , process.env.ACCESS_TOKEN_SECRET, {expiresIn: '100s'}
        );

      // Create jwt REFRESH token
      const refreshToken = jwt.sign({ email }
        , process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'}
        );

      // Save token in the user data
      user.token = refreshToken;
      await user.save();

      res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      res.status(200).json({accessToken});
    }
  }
  // res.status(200).json({message: "login function working..."})
};

module.exports = { createUser, deleteUser, loginUser };
