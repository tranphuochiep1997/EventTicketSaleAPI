const buyTicketValidationSchema = require('../ValidationSchemas/BuyTicketSchema');
const Joi = require('joi');

function validate(req, res, next){
  const result = Joi.validate(req.body, buyTicketValidationSchema,
     {abortEarly: false, allowUnknown: true});
  if (!result.error){
    return next();
  }
  const errorDetail = result.error.details;
  let validations = [];
  for (let key in errorDetail) {
    const errorItem = errorDetail[key];
    const type = errorItem.type;
    const field = errorItem.context.key;
    let validation = {};
    if (type === "any.required" || type === "any.empty" || type === "any.invalid"){
      if (field === "quantity"){
        validation = {
          attribute: field,
          reason: 'positive_integer_required'
        };
      } else {
        if (field === "card_type"){
          validation = {
            attribute: field,
            reason: 'unsupported_card_type'
          };
        } else {
          validation = {
            attribute: field,
            reason: 'required'
          };
        }
      }
      
    } else {
      if (type === "number.positive"){
        validation = {
          attribute: field,
          reason: 'positive_integer_required'
        }
      } else {
        if (type === "any.allowOnly"){
          validation = {
            attribute: field,
            reason: 'unsupported_card_type'
          }
        } else {
          if (type === "string.length"){
            if (field === "card_number"){
              validation = {
                attribute: field,
                reason: 'wrong_card_number'
              }
            } else {
              validation = {
                attribute: field,
                reason: 'invalid_cvc'
              }
            }
          } else {
            if (type === "date.format"){
              validation = {
                attribute: field,
                reason: 'wrong_card_expiration'
              }
            }else {
              validation = {
                attribute: field,
                reason: 'NOT_CAUTHT_YET'
              }
            }
          }
        }
      }
    };
    validations.push(validation);
  }

  res.status(200).send({status: 'VALIDATION_ERROR', validations: validations});
}

module.exports = validate;