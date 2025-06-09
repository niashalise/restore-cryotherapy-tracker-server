const express = require("express");
const { inquiry } = require("../controllers/contactController");
const router = express.Router();

router.post("/inquiry", inquiry)

module.exports = router;