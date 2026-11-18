const mongoose = require("mongoose");

const { Schema } = mongoose;

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logoUrl: {
    type: String,
    trim: true,
    match: /^https:\/\/\S+$/,
  },
  primaryColor: {
    type: String,
    match: /^#\[a-zA-Z]\d/g,
  },
  secondaryColor: {
    type: String,
    match: /^#\[a-zA-Z]\d/g,
  },
  fontFamily: {
    type: String,
    trim: true,
    match: /[a-zA-Z]\d\s\-/g,
  },
  fontStylesheetUrl: {
    type: String,
    match: /^https:\/\/\S+$/,
  },
});