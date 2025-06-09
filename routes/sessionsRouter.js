const express = require("express");
const router = express.Router();

const { getAllSessions, getClientSessions, createSession, archiveSessions, getSessionByDate } = require("../controllers/sessionsControllers");

router.get("/todays-sessions", getAllSessions);
router.get("/client-sessions", getClientSessions);
router.post("/create/new", createSession);
router.get("/saved-sessions", archiveSessions);
router.get("/previous-sessions", getSessionByDate);


module.exports = router;