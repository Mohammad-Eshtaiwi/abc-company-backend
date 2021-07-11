const mongoose = require("mongoose");
const statusSchema = new mongoose.Schema({
  label: {
    type: String,
    minLength: 6,
  },
  key: {
    type: Number,
    min: 1,
  },
});

const Status = mongoose.model("statuses", statusSchema);

module.exports = Status;
