const mongoose = require("mongoose");
const typeSchema = new mongoose.Schema({
  label: {
    type: String,
    minLength: 6,
  },
});

const Type = mongoose.model("type", typeSchema);

module.exports = Type;
