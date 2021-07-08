const Ticket = require("../../../../db/ticket");
const validateSchemas = require("../../../../utils/validateSchema");
const { commentSchema } = require("./commentSchemas");
async function createTicket(req) {
  try {
    //   validate user input
    const validate = validateSchemas(req.body, commentSchema);
    if (validate.error) throw { status: 401, message: validate.error.message, data: [] };
    let ticketWithComment;
    if (req.payload.isAdmin) {
      ticketWithComment = await Ticket.findOneAndUpdate(
        { _id: req.body.id },
        { $push: { comments: { body: req.body.body, createdBy: req.payload.username, createdAt: Date.now() } } },
        { new: true }
      );
    }
    if (!req.payload.isAdmin) {
      ticketWithComment = await Ticket.findOneAndUpdate(
        { _id: req.body.id, createdBy: req.payload.username },
        { $push: { comments: { body: req.body.body, createdBy: req.payload.username, createdAt: Date.now() } } },
        { new: true }
      );
    }
    if (!ticketWithComment) return { status: 404, message: "not found", data: [] };
    return { status: 201, message: "created", data: [ticketWithComment] };
  } catch (error) {
    console.log(error);
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}

module.exports = { createTicket };
