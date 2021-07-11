const mongoose = require("mongoose");
const prioritySchema = new mongoose.Schema({
  label: {
    type: String,
    minLength: 6,
  },
  key: {
    type: Number,
  },
});

const Type = mongoose.model("priorities", prioritySchema);

module.exports = Type;
