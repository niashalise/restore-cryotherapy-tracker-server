const mongoose = require("mongoose");

const { Schema } = mongoose;

const tenantSchema = new Schema({
    subdomainSlug: { //unique across tenants; middleware will match against incoming hostname
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    displayName: { //used for franchise's name instead of slug
        type: String,
        required: true
    },
    activeStatus: { //if a location is not active, data will still remain
        type: String,
        default: "active"
    }
});

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
