const joi = require("joi");
module.exports = {
  ticketSchema: () => {
    return joi.object({
      title: joi.string().min(4).max(32).required(),
      body: joi.string().min(32).max(255).required(),
      createdBy: joi.string().min(4).max(32).required(),
      priority: joi.number().min(1).max(3).required(),
      status: joi.number().min(1).max(3).required(),
      type: joi.number().min(1).max(4).required(),
    });
  },
  ticketStatusSchema: () => {
    return joi.object({
      status: joi.number().min(1).max(3).required(),
      id: joi.string().required(),
    });
  },
  ticketsForCustomerSchema: () => {
    return joi.object({
      username: joi.string().min(4).max(32).required(),
    });
  },
};
