const express = require("express");
const {
  localLogin,
  logout,
  signup,
} = require("../controllers/authController");
const router = express.Router();


router.post("/signup", signup);
router.post("/login/local", localLogin);
router.get("/logout", logout);

module.exports = router;
