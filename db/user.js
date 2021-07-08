const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 4,
    maxLength: 32,
  },
  password: {
    type: String,
    minLength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
