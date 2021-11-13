const express = require("express");
const router = express.Router();
const {authToken} = require("../middleware/authToken");
const {body} = require("express-validator");

const {
  register,
  login,
  logout,
  forgotPassword,
} = require("../controllers/auth");

// secret route
router.get("/secret", authToken, (req, res) => {
  res.json({user: req.user});
});

router.post(
  "/register",

  body("email").isEmail().normalizeEmail(),
  body("password").isLength({min: 6}),
  body("username").notEmpty(),
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("country").notEmpty(),
  register
);

router.post(
  "/login",
  body("username").notEmpty(),
  body("password").notEmpty().isLength({min: 6}),
  login
);

router.get("/logout", logout);
router.get("/forgot-password", forgotPassword);

module.exports = router;
