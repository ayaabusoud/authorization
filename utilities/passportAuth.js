const { NULL } = require('mysql/lib/protocol/constants/types');
const { Passport } = require('passport/lib');

let GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = "997964911573-8cf3qc6mf9u4priclnnrm1lnfr3g8uno.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


function passPort(passport)
{


    passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5001/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
      done(null,profile);
      }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
    
      passport.deserializeUser(function(obj, done) {
        done(null, obj);
      });
      

}




module.exports = passPort;