const JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('./Auth');

module.exports = function (passport){
 
  let opts = {}

  // Setup JWT options
  //Get token from header through beaarer
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.SECRET_KEY;

  passport.use('jwt', new JwtStrategy(opts, function (jwtPayload, done) {
    //If the token has expiration, raise unauthorized
    const expirationDate = new Date(jwtPayload.exp * 1000);
    console.log("Expiration date: "+ expirationDate);
    console.log("Present date: "+ new Date());
    if(expirationDate < new Date()) {
      return done(null, false, {status: 'UNAUTHORIZED'});
    }
    var user = jwtPayload;
    done(null, user)
  }));
};
