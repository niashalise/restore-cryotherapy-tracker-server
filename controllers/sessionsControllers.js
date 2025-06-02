// const sessionData = require("../data/sessions");
// const siteData = require("../data/siteData");
// const clients = require("../data/clients")

const Session = require("../models/sessionModel");
const Client = require("../models/clientModel");

const getAllSessions = async (req, res, next) => {
    try {
        const sessions = await Session.find();

        return res.status(200).json({
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

    try {
        if (!_id) {
            throw new Error("Id is required");
        }

        const client = Client.findById(_id);

        if (!client) {
            throw new Error("Client not found");
        }

        return res.status(200).json({
            success: {
                message: "Successfully retrieved client"
            },
            data: {client: client},
            statusCode: 200
        });
    } catch (error) {
        return res.status(400).json({
            error: {
                message: "Not found. Search again."
            },
            statusCode: 400
        })
    }
}

const createSession = async (req, res, next) => {
    const { date, machineType, clientId, settings, startingTemp, endingTemp, status } = req.body;

    try {
        if (!date || !settings || !startingTemp || !endingTemp) {
            throw new Error("Missing required fields, please review.")
        }

        const newSession = new Session({
            date,
            machineType,
            clientId,
            settings,
            startingTemp,
            endingTemp,
            status
        })

        return res.status(201).json({
            success: {
                message: "A new session is created."
            },
            data: { newSession },
            statusCode: 201
        });
    } catch (error) {
        return next(error);
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