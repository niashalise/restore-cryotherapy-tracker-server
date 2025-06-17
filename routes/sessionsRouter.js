const express = require("express");
const router = express.Router();

const { getAllSessions, getClientSessions, createSession, getSessionByDate, createClient, getClientByPhoneNumber } = require("../controllers/sessionsControllers");

router.get("/todays-sessions", getAllSessions);
router.get("/client-sessions", getClientSessions);
router.post("/create/new", createSession);
router.get("/previous-sessions", getSessionByDate);
router.post("/create-client", createClient);
router.get("/search-client", getClientByPhoneNumber);


module.exports = router;