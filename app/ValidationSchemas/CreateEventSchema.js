const Joi = require('joi');
module.exports = Joi.object().keys({
  name: Joi.string().required().invalid(null).options({abortEarly: true}),
  banner: Joi.string().required().invalid(null).options({abortEarly: true}),
  description: Joi.string().allow(null).allow(""),
  ticket_total: Joi.number().integer().min(1).invalid(null).required().options({abortEarly: true}),
  ticket_price: Joi.number().min(0).required().invalid(null).options({abortEarly: true}),
  start_date: Joi.date().iso().required().invalid(null).options({abortEarly: true})
    .options({abortEarly: true})
    .when('end_date', {is: Joi.date().iso().required(), then: Joi.date().max(Joi.ref('end_date'))}),
  end_date: Joi.date().iso().required().invalid(null).options({abortEarly: true}),
  ticket_start_date: Joi.date().iso().required().invalid(null)
    .options({abortEarly: true})
    .when('start_date', {is: Joi.date().iso().required(), then: Joi.date().max(Joi.ref('start_date'))})
    .when('ticket_end_date', {is: Joi.date().iso().required(), then: Joi.date().max(Joi.ref('ticket_end_date'))}),
  ticket_end_date: Joi.date().iso().required().invalid(null).options({abortEarly: true})
});
