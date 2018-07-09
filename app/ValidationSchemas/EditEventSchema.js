const Joi = require('joi');
module.exports = Joi.object().keys({
  name: Joi.string().required(),
  banner: Joi.string().regex(/\.(jpg|png)$/i).required(),
  description: Joi.string().allow(null).allow(""),
  ticket_total: Joi.number().integer().min(1).required(),
  ticket_price: Joi.number().min(0).required(),
  start_date: Joi.date().iso().required()
    .when('end_date', {is: Joi.date().iso().required(), then: Joi.date().max(Joi.ref('end_date'))}),
  end_date: Joi.date().iso().required(),
  ticket_start_date: Joi.date().iso().required()
    .when('start_date', {is: Joi.date().iso().required(), then: Joi.date().max(Joi.ref('start_date'))})
    .when('ticket_end_date', {is: Joi.date().iso().required(), then: Joi.date().max(Joi.ref('ticket_end_date'))}),
  ticket_end_date: Joi.date().iso().required()
});

