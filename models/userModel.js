const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    storeName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;