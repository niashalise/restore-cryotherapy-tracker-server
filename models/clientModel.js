const mongoose = require("mongoose");

const { Schema } = mongoose;

const clientSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        minLength: 10,
        trim: true
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipCode: {
        type: String
    }
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;