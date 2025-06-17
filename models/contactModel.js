const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema({
    inquiry: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    studio: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true,
        default: "Received"
    }
})

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;