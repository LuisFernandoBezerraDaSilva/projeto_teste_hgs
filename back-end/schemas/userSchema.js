const Joi = require('joi');

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(), // Nome de usuário entre 3 e 30 caracteres
  password: Joi.string().min(6).required(), // Senha com no mínimo 6 caracteres
});

module.exports = userSchema;