const express = require("express");
const { inquiry, getInquiries, updateInquiry } = require("../controllers/contactController");
const router = express.Router();

router.post("/inquiry", inquiry);
router.get("/inquiries", getInquiries);
router.put("/updated-inquiry", updateInquiry);

module.exports = router;