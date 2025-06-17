const mongoose = require("mongoose");

const { Schema } = mongoose;

const sessionSchema = new Schema({
  date: {
    type: Date,
    required: true,
    trim: true,
  },
  machine: {
    type: String,
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  settings: {
    type: String,
    required: true,
    trim: true,
  },
  startingTemp: {
    type: String,
    required: true,
    trim: true,
  },
  endingTemp: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
  },
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;