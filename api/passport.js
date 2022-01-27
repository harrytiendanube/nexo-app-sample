const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const config = require("./config.json");
const { getTokenBy } = require("./db");

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secret,
    },
    function (jwtPayload, done) {
      getTokenBy(jwtPayload.storeId)
        .then((token) => {
          return done(null, token);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
