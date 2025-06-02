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
    // client: {
    //     type: String,
    //     required: true
    // },
    // phoneNumber: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minLength: 10,
    //     maxLength: 10
    // },
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
    }
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;