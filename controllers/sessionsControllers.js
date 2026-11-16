const Session = require("../models/sessionModel");
const Client = require("../models/clientModel");

const normalizePhone = (phone) => {
  const cleanPhone = String(phone).replace(/\D/g, "");

  return cleanPhone;
}

const getAllSessions = async (req, res, next) => {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const startDate = new Date(year, month, day, 0, 0, 0);
    const endDate = new Date(year, month, day, 23, 59, 59, 999);
    const sessions = await Session.find({
      tenantId: req.tenant._id,
      date: { $gte: startDate, $lte: endDate },
    })
    .populate("clientId", "firstName lastName phone")
    .sort({ date: 1 });

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

const getSessionByDate = async (req, res, next) => {
  try {
    const { date, clientId } = req.query;
    if (!date || !clientId ) {
      throw new Error("Id or date is missing.");
    };

    const [year, month, day] = date.split("-").map(Number);
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

    const sessions = await Session.find({
      date: { $gte: startDate, $lte: endDate },
      clientId
    })
    .populate("tenantId", "displayName");
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
      const cleanPhone = normalizePhone(phone);
      if (cleanPhone.length !== 10) {
        return res.status(400).json({
          error: { message: "Phone number must be 10 digits." },
          statusCode: 400,
        })
      }

      const foundClient = await Client.find({ phone: cleanPhone }).select("firstName lastName phone");

      res.status(200).json({
        success: { message: "Found client." },
        data: { foundClient },
        statusCode: 200,
      });
    } catch (error) {
        return next(error)
    }
}

const getLocationSessionsByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) {
      throw new Error("Date is invalid or missing.");
    };

    const [year, month, day] = date.split("-").map(Number);
    const startDate = new Date(year, month - 1, day, 0, 0, 0);
    const endDate = new Date(year, month - 1, day, 23, 59, 59, 999);

    const sessions = await Session.find({
      date: { $gte: startDate, $lte: endDate},
      tenantId: req.tenant._id
    })
    .populate("clientId", "firstName lastName phone")
    .sort({ date: 1 });
    res.status(200).json({
      success: { message: "Retrieved sessions." },
      data: { sessions },
    });
  } catch (error) {
    return next(error);
  }
}

const getClientSessions = async (req, res, next) => {
  const { clientId } = req.query;

  try {
    if (!clientId) {
      throw new Error("Id is required");
    }

    const sessions = await Session.find({ clientId })
    .populate("tenantId", "displayName")
    .sort({date: -1}); 

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
    if (!firstName || !lastName || !email || !dob || !phone) {
      throw new Error("Missing required fields, please review.");
    }
    const cleanPhone = normalizePhone(phone);
    if (cleanPhone.length !== 10) {
      return res.status(400).json({
        error: { message: "Phone number must be 10 digits." },
        statusCode: 400,
      });
    }

    const newClient = new Client({
      firstName,
      lastName,
      email,
      phone: cleanPhone,
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
    machineType,
    clientId,
    settings,
    startingTemp,
    endingTemp,
    status,
  } = req.body;

  try {
    if (!date || !clientId || !settings || !startingTemp || !endingTemp) {
      throw new Error("Missing required fields, please review.");
    }

    const client = await Client.findById(clientId);
    if (client === null) {
        return res.status(404).json( {error: { message: "Client not found." },
      statusCode: 404 })
    };

    const newSession = new Session({
      date,
      machineType,
      clientId,
      settings,
      startingTemp,
      endingTemp,
      status,
      tenantId: req.tenant._id
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



module.exports = {
  getAllSessions,
  getClientSessions,
  createSession,
  getSessionByDate,
  createClient,
  getClientByPhoneNumber,
  getLocationSessionsByDate
};
