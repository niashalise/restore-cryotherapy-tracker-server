const express = require("express");
const {
  login,
  localLogin,
  logout,
  signup,
} = require("../controllers/authController");
const router = express.Router();
const passport = require("passport");


router.post("/signup", signup);
router.get("/login", login);
router.post("/login/local", localLogin);
router.get("/login/error", (req, res, next) => {
  res.json("login error");
});
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);
router.get("/logout", logout);

module.exports = router;
