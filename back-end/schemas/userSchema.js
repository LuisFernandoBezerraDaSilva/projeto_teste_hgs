const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(15).required(),
  password: Joi.string().required(),
});

module.exports = userSchema;