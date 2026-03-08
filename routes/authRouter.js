const { Router } = require("express");
const passport = require("passport");
const authController = require("../controllers/authController");

const router = Router();

router.get("/signup", authController.signupGet);
router.post("/signup", authController.signupPost);

router.get("/login", authController.loginGet);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureMessage: true
  })
);

router.get("/join-club", authController.joinClubGet);
router.post("/join-club", authController.joinClubPost);

router.get("/logout", authController.logout);

module.exports = router;