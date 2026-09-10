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
  tenantId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
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