const Joi = require('joi');

module.exports = {
  authorization: Joi.string().required()
};