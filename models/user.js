const mongoose = require('mongoose');

// USER SCHEMA FOR THE APP
const authUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  resetLink: {
    type: String,
    default: ''
  }
}, {
    timestamps: true,
});

const User = mongoose.model('AuthUser',authUserSchema);
module.exports= User;