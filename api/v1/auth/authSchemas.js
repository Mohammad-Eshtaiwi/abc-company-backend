const joi = require("joi");
module.exports = {
  joiUserSchema: () => {
    return joi.object({
      username: joi.string().min(4).max(32).required(),
      password: joi.string().min(6).required(),
      isAdmin: joi.boolean(),
    });
  },
};
