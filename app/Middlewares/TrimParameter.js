

function trimParam(req, res, next){
  const body = req.body;
  const headers = req.headers;
  for (let key in body){
    if (typeof body[key] === 'string'){
      body[key] = body[key].trim();
    }      
  };
  for (let key in headers){
    if (typeof headers[key] === 'string')
      headers[key] = headers[key].trim();
  };
  req.body = body;
  req.headers = headers;
  next();
};

module.exports = trimParam;