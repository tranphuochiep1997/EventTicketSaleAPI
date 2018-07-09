const Joi = require('joi');
module.exports = Joi.object().keys({
  username: Joi.string().required().invalid(null).options({abortEarly: true}),
  password: Joi.string().required().invalid(null).options({abortEarly: true})
});