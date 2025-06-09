const mongoose = require("mongoose");

const { Schema } = mongoose;

const sessionSchema = new Schema({
    date: {
        type: Date,
        required: true,
        trim: true
    },
    machineType: {
        type: String
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: "Client"
    },
    settings: {
        type: String,
        required: true,
        trim: true
    },
    startingTemp: {
        type: String,
        required: true,
        trim: true
    },
    endingTemp: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String
    },
    isArchived: {
        type: Boolean,
        default: false
    }
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;