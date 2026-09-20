const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactSchema = new Schema({
  inquiry: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  tenantId: { //storing contact-form submissions/inquiries to a specific location
    type: Schema.Types.ObjectId,
    index: false,
    ref: "Tenant",
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;