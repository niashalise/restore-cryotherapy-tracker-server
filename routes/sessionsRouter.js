const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
// this will apply to routes that require someone to be logged in
router.use(verifyToken);

const { getAllSessions, getClientSessions, createSession, getSessionByDate, createClient, getClientByPhoneNumber } = require("../controllers/sessionsControllers");

router.get("/todays-sessions", getAllSessions);
router.get("/client-sessions", getClientSessions);
router.post("/create/new", createSession);
router.get("/previous-sessions", getSessionByDate);
router.post("/create-client", createClient);
router.get("/search-client", getClientByPhoneNumber);


module.exports = router;