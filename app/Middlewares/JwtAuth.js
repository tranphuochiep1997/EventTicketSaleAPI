const jwt = require('jsonwebtoken');
const config = require('../../config/Auth');

async function authenticate(req, res, next){
  try {
    const token = req.headers.authorization;
    const payLoad = await jwt.verify(token, config.SECRET_KEY);
    if (!payLoad){
      return res.status(200).send({status: "PERMISSION_DENIED"});
    };
    req.user = payLoad;
    next();
  } catch(err){
    let status = "AUTHORIZATION_REQUIRED";
    res.status(200).send({status: status});
  }
}
function isAdmin(req, res, next){
  if (!req.user.isAdmin){
    return res.status(200).send({status: 'PERMISSION_DENIED'});
  }
  next();
};

module.exports = {
  authenticate,
  isAdmin
}