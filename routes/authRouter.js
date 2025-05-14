const express = require("express");
const { register, login, loginLocal, logout, signup } = require("../controllers/authController");
const router = express.Router();

//register - POST
router.post("/signup", signup);

//login - GET
router.get("/login", login);

router.get("/login/local", loginLocal);

router.get("/login/error", (req, res, next) => {
  res.json("login error");
});

//logout - GET
router.get("/logout", logout);

module.exports = router;
