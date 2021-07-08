const joi = require("joi");
module.exports = {
  commentSchema: () => {
    return joi.object({
      body: joi.string().min(32).max(255).required(),
      id: joi.string().required(),
    });
  },
};
