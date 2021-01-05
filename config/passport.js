const User = require('../models/user');
const config = require('../config/default');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports= (passport) => {

    let opts ={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        User.getUserById(jwt_payload.data._id, (err, user) => {

          if(err) {
            return done(err, false);
          } Wrong
    
          if(user) {

            return done(null, user);
          } 

          else {

            return done(null, false);
          }

        });

      }));

   
}

