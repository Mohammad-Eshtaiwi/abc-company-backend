const Ticket = require("../../../db/ticket");
const validateSchemas = require("../../../utils/validateSchema");
const { ticketSchema, ticketStatusSchema, ticketsForCustomerSchema } = require("./ticketSchemas");
async function createTicket(req) {
  try {
    //   validate user input
    const validate = validateSchemas(req.body, ticketSchema);
    if (validate.error) throw { status: 401, message: validate.error.message, data: [] };
    const newTicket = new Ticket({ ...req.body });
    await newTicket.save();
    return { status: 201, message: "created", data: [] };
  } catch (error) {
    console.log(error);
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}
async function getCustomerTickets(req) {
  try {
    //   validate user input
    const validate = validateSchemas({ username: req.payload.username }, ticketsForCustomerSchema);
    if (validate.error) throw { status: 401, message: validate.error.message, data: [] };
    const tickets = await Ticket.find({ createdBy: req.payload.username }).lean();
    return { status: 200, message: "ok", data: [...tickets] };
  } catch (error) {
    console.log(error);
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}
async function getTickets(req) {
  try {
    if (!req.payload.isAdmin) return { status: 403, message: "Unauthorized", data: [] };
    const tickets = await Ticket.find({}).lean();
    return { status: 200, message: "ok", data: [...tickets] };
  } catch (error) {
    console.log(error);
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}
async function getTicket(req) {
  try {
    let ticket;
    // if users is not admin and trying to access ticket that not belong to them
    if (!req.payload.isAdmin)
      ticket = await Ticket.find({ _id: req.params.id, createdBy: req.payload.username }).lean();
    if (req.payload.isAdmin) ticket = await Ticket.find({ _id: req.params.id }).lean();
    // if no tickets found or wrong
    if (!ticket.length) return { status: 404, message: "not found", data: [] };
    return { status: 200, message: "ok", data: [...ticket] };
  } catch (error) {
    console.log(error);
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}
async function updateStatus(req) {
  try {
    if (!req.payload.isAdmin) throw { status: 401, message: "Unauthorized", data: [] };
    //   validate user input
    const validate = validateSchemas({ ...req.body, id: req.params.id }, ticketStatusSchema);
    if (validate.error) throw { status: 401, message: validate.error.message, data: [] };
    await Ticket.updateOne(
      { _id: req.params.id },
      {
        status: req.body.status,
        closedAt: [2, 3].includes(req.body.status) ? Date.now() : null,
        closedBy: [2, 3].includes(req.body.status) ? req.payload.username : null,
      }
    );
    return { status: 201, message: "ok", data: [] };
  } catch (error) {
    console.log(error);
    if (!error.status) return { status: 500, message: "something went wrong", data: [] };
    return error;
  }
}

module.exports = { createTicket, updateStatus, getCustomerTickets, getTickets, getTicket };
