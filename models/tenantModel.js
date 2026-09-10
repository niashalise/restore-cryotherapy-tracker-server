const mongoose = require("mongoose");

const { Schema } = mongoose;

const tenantSchema = new Schema({
    subdomainSlug: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true
    },
    activeStatus: {
        type: String,
        default: "active"
    }
});

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
