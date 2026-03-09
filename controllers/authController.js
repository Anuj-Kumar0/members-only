const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const userModel = require("../models/userModel");

exports.signupGet = (req, res) => {
  res.render("signup", { errors: null });
};

exports.signupPost = [
  body("firstName").trim().isLength({ min: 2 }),
  body("lastName").trim().isLength({ min: 2 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 6 }),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords must match");
    }
    return true;
  }),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("signup", { errors: errors.array() });
    }

    const { firstName, lastName, email, password, isAdmin } = req.body;

    const adminStatus = isAdmin ? true : false;

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.createUser(firstName, lastName, email, hashedPassword, adminStatus);

    res.redirect("/login");
  },
];

exports.loginGet = (req, res) => {
  res.render("login", { error: null });
};

exports.joinClubGet = (req, res) => {
  res.render("join-club", { error: null });
};

exports.joinClubPost = async (req, res) => {
  const SECRET = process.env.CLUB_PASSCODE;

  if (req.body.passcode !== SECRET) {
    return res.render("join-club", { error: "Wrong passcode" });
  }

  await userModel.becomeMember(req.user.id);

  res.redirect("/");
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};