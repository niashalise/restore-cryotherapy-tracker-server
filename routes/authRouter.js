const express = require("express");
const {
  login,
  localLogin,
  logout,
  signup,
} = require("../controllers/authController");
const router = express.Router();
const passport = require("passport");

//register - POST
router.post("/signup", signup);

//login - GET
router.get("/login", login);

router.get("/login/local", localLogin);

router.get("/login/error", (req, res, next) => {
  res.json("login error");
});

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

//logout - GET
router.get("/logout", logout);

module.exports = router;
