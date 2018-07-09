const Joi = require('joi');
const extention = require('joi-date-extensions');
const DateFormat = Joi.extend(extention);

const schema = Joi.object().keys({
  quantity: Joi.number().integer().positive().required().invalid(null).options({abortEarly: true}),
  card_type: Joi.valid('visa').required().invalid(null).options({abortEarly: true}),
  card_number: Joi.string().required().length(16).invalid(null).options({abortEarly: true}), // card number contains 16 digits
  card_expiration: DateFormat.date().format('MM/YYYY').required().invalid(null).options({abortEarly: true}), // date in format MM/YYYY
  cvc_code: Joi.string().required().length(3).invalid(null).options({abortEarly: true})  // three numbers of CVC
});
module.exports = schema;