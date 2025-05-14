const sessionData = require("../data/sessions");
const siteData = require("../data/siteData");
const clients = require("../data/clients")

const getAllSessions = (req, res, next) => {
    const sessions = sessionData.todaysSessions;

    try {
        res.status(200).json({
            success: {
                message: "This route points to the Todays Sessions page with all of the sessions from the current day."
            },
            data: { sessions }
        })
    } catch (error) {
        res.status(400).json({
            error: {
                message: "Session details not found. Try again."
            }
        })
    }
}

const getClientSessions = async (req, res, next) => {
    const { _id } = req.params;

    const foundClient = clients.find((client) => 
        client._id === _id);

    try {
        return res.status(200).json({
            success: {
                message: "This route points to a specific client session by the session ID."
            },
            data: {client: foundClient},
            statusCode: 200
        });
    } catch (error) {
        return res.status(400).json({
            error: {
                message: "Session not found. Search again."
            },
            statusCode: 400
        })
    }
}

const createSession = async (req, res, next) => {
    const { date, machineType, client, phoneNumber, settings, startingTemp, endingTemp } = req.body;

    const newSession = {
        date,
        machineType,
        client,
        phoneNumber,
        settings,
        startingTemp,
        endingTemp
    }

    try {
        sessionData.todaysSessions.push(newSession);

        return res.status(201).json({
            success: {
                message: "A new session is created."
            },
            data: { newSession }
        });
    } catch (error) {
        return res.status(400).json({
            error: {
                message: "There is an error when adding a session."
            }
        })
    }
}

const archiveSessions = async (req, res, next) => {
  const dayOfWeek = siteData.dayOfWeek;
  const hour = siteData.hour;
  const minute = siteData.minutes;
  const seconds = siteData.seconds;
  const month = siteData.month;
  const day = siteData.date;
  const year = siteData.year;

  // if Monday-Friday, archive sessions to previous sessions at midnight; dayOfWeek 1-5
  // if (dayOfWeek > 0 && dayOfWeek < 6) {
  // if (hour === 0)
  // }

  // if Saturday, archive sessions to previous sessions at midnight; dayOfWeek 6
  // if (dayOfWeek === 6 && hour === 0)

  // if Sunday, archive sessions to previous sessions at midnight; dayOfWeek 0
  // if (dayOfWeek === 0 && hour === 0)
}

const getSessionByDate = async (req, res, next) => {
    // get previous session from sessions.js
    // receive date as param
    // return all sessions (array) that have the specified date in the object
    // example: if user selects 05/01/25, return all sessions from 05/01/25
}

module.exports = { getAllSessions, getClientSessions, createSession, archiveSessions, getSessionByDate }