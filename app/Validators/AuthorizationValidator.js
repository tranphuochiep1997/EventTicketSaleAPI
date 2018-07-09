const authSchema = require('../ValidationSchemas/AuthorizationSchema');
const Joi  = require('joi');

function validate(req, res, next){
  const token = req.headers.authorization;
  if (token === null || !token){
    return res.status(200).send({status: "AUTHORIZATION_REQUIRED"});
  }
  next();
};

module.exports = validate;