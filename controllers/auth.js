const {validationResult} = require("express-validator");
const User = require("../models/user");
const {generateAccessToken} = require("../utils/utils");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const user = require("../models/user");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });

  const {email, username, firstName, lastName, country, password} = req.body;
  const user = new User({
    username,
    email,
    firstName,
    lastName,
    country,
  });

  try {
    const registeredUser = await User.register(user, password);
    return res.json({
      success: true,
      data: {
        _id: registeredUser._id,
        email: registeredUser.email,
      },
      message: "User registred successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "registraion failed",
      error: error,
    });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });

  passport.authenticate("local", (err, user, info) => {
    if (err) return res.json({success: false, message: err});

    if (!user)
      return res.json({
        success: false,
        message: "username or password incorrect",
      });

    req.login(user, (err) => {
      if (err) return res.json({success: false, message: {err}});
      const token = generateAccessToken(user.toJSON());
      // console.log(user);
      res.json({
        success: true,
        message: "User login successfully",
        token: token,
      });
    });
  })(req, res);
};

exports.logout = (req, res) => {
  req.logout();
  res.json({
    success: true,
    message: "You have logged out succcessfully.",
  });
};

exports.forgotPassword = async (req, res) => {
  const {email} = req.body;
  const userData = await User.findOne({email: email});
  console.log(userData);
};
