const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 32,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 32,
  },
  body: {
    type: String,
    required: true,
    minLength: 32,
    maxLength: 300,
  },
  priority: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },
  status: {
    type: Number,
    min: 1,
    max: 3,
    default: 1,
  },
  type: {
    type: Number,
    required: true,
    min: 1,
    max: 4,
  },
  closedBy: {
    type: String,
    minLength: 4,
    maxLength: 32,
    default: null,
  },
  closedAt: {
    type: Date,
    default: null,
  },
  comments: [
    {
      body: {
        type: String,
        required: true,
        maxLength: 300,
      },
      createdBy: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 32,
      },
      createAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Ticket = mongoose.model("ticket", ticketSchema);

module.exports = Ticket;
