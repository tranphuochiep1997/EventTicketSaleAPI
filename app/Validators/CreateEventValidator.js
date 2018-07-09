const schema = require('../ValidationSchemas/CreateEventSchema');
const Joi = require('joi');

function validate(req, res, next){
  const result = Joi.validate(req.body, schema, {abortEarly: false, allowUnknown: true});
  if (!result.error){
    return next();
  }
  let validations = [];
  let errorFromValidation = result.error.details;
  for (let key in errorFromValidation){
    let validation = {};
    let errItem = errorFromValidation[key];
    let field = errItem.context.key;
    let type = errItem.type;
    if (type === "any.required" || type === "any.empty" || type === "any.invalid"){
      if (field === "end_date" || field === "ticket_end_date"){
        validation = {
          attribute: field,
          reason: field+"_invalid"
        }
      } else {
        if (field === "ticket_total"){
          validation = {
            attribute: field,
            reason: "positive_integer_required"
          }
        } else {
          if (field === "ticket_price"){
            validation = {
              attribute: field,
              reason: "positive_number_required"
            }
          } else {
            validation = {
              attribute: field,
              reason: 'required'
            }
          }
        }
      }// end if ticket_end_date, end_date
    } else {
      if (type === "date.isoDate"){
        if (field === "ticket_end_date" || field === "end_date"){
          validation = {
            attribute: field,
            reason: `${field}_invalid`
          };
        } else {
          validation = {
            attribute: field,
            reason: 'required'
          } 
        }
      } else {
        if (type === "number.min"){
          if (field === "ticket_total"){
            validation = {
              attribute: field,
              reason: "positive_integer_required"
            }
          } else {
            validation = {
              attribute: field,
              reason: "positive_number_required"
            }
          };
        } else {
          if (type === "date.max"){
            validation = {
              attribute: field,
              reason: `${field}_invalid`
            }
          } else {
            if (type === "number.base"){
              validation = {
                attribute: field,
                reason: `required`
              }
            } else {
              validation = {
                attribute: field,
                reason: `NOT_CAUGHT_YET`
              }
            }
            
          } // End if check DATE MAX
        }

        }//End if check ISODATE error
      } // End if check REQUIRED or EMPTY error
    // Push single validation into validations array
    validations.push(validation);
  }; //End for loop

  // list invalid attributes
  // return res.status(200).send(result);
  return res.status(200).send({status: 'VALIDATION_ERROR', validations: validations});
};

module.exports = validate;