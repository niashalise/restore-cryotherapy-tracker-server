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
        message:
          "This route points to the Todays Sessions page with all of the sessions from the current day.",
      },
      data: { sessions },
    });
  } catch (error) {
    return next(error);
  }
};

const getClientSessions = async (req, res, next) => {
  const { phone } = req.query;

  try {
    if (!phone) {
      throw new Error("Id is required");
    }

    const sessions = await Session.find({ phone: phone });

    if (!sessions) {
      throw new Error("Client not found");
    }

    return res.status(200).json({
      success: {
        message: "Successfully retrieved client sessions",
      },
      data: { sessions: sessions },
      statusCode: 200,
    });
  } catch (error) {
    return next(error);
  }
};

const createClient = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    address,
    city,
    state,
    zipCode,
  } = req.body;

  try {
    if (!firstName || !lastName || !email || !dob || !phone || !dob) {
      throw new Error("Missing required fields, please review.");
    }

    const newClient = new Client({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      address,
      city,
      state,
      zipCode,
    });

    await newClient.save();

    return res.status(201).json({
      success: {
        message: "New client added.",
      },
      data: { newClient },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const createSession = async (req, res, next) => {
  const {
    date,
    machine,
    name,
    phone,
    clientId,
    settings,
    startingTemp,
    endingTemp,
    status,
  } = req.body;

  try {
    if (!date || !name || !phone || !settings || !startingTemp || !endingTemp) {
      throw new Error("Missing required fields, please review.");
    }

    const newSession = new Session({
      date,
      machine,
      name,
      phone,
      clientId,
      settings,
      startingTemp,
      endingTemp,
      status,
    });

    await newSession.save();

    return res.status(201).json({
      success: {
        message: "A new session is created.",
      },
      data: { newSession },
      statusCode: 201,
    });
  } catch (error) {
    return next(error);
  }
};

const getSessionByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    const [year, month, day] = date.split("-").map(Number);
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

    console.log("Start date: ", startDate);
    console.log("End date: ", endDate);
    const sessions = await Session.find({
      date: { $gte: startDate, $lte: endDate },
    });
    res.status(200).json({
      success: { message: "Retrieved sessions." },
      data: { sessions },
    });
  } catch (error) {
    return next(error);
  }
};

const getClientByPhoneNumber = async (req, res, next) => {
    const { phone } = req.query;
    try {
        const foundClient = await Client.find({ phone });

        res.status(200).json({
            success: { message: "Found client."},
            data: { foundClient },
            statusCode: 200
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = {
  getAllSessions,
  getClientSessions,
  createSession,
  getSessionByDate,
  createClient,
  getClientByPhoneNumber
};
