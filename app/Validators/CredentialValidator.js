const Joi = require('joi');
const schema = require('../ValidationSchemas/CredentialSchema');

function Validate(req, res, next){
  const result = Joi.validate(req.body, schema, {abortEarly: false, allowUnknown: true});
  if (!result.error){
    return next();
  }
  let errorFromValidation = result.error.details;
  let validations = [];
  for (let key in errorFromValidation){
    let validation = {};
    let errItem = errorFromValidation[key];
    let field = errItem.context.key;
    let value = errItem.context.value;
    let type = errItem.type;
      if (type === "any.required" || type === "any.empty" || type === "any.invalid"){
        validation = {
          attribute: field,
          reason: 'required'
        } 
      } else {
          validation = {
            attribute: field,
            reason: 'unknown'
          } 
      } // End if check REQUIRED or EMPTY error
    // Push single validation into validations array
    validations.push(validation);
  }; //End for loop

  res.status(200).send({status: 'VALIDATION_ERROR', validations: validations});
  // res.status(200).send(result);
};

module.exports = Validate;