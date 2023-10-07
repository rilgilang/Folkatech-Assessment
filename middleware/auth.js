const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

// for sign in==========================================
exports.signin = (req, res, next) => {
  passport.authenticate("signin", { session: false }, (err, user, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 401 });
    }
    if (!user) {
      return next({ message: info.message, statusCode: 401 });
    }
    req.user = user;
    next();
  })(req, res, next);
};

passport.use(
  "signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (username, password, done) => {
      try {
        const data = await user.findOne({ username: username });
        if (!data) {
          return done(null, false, { message: "User is not found!" });
        }
        const validate = await bcrypt.compare(password, data.password);
        if (!validate) {
          return done(null, false, { message: "Wrong password!" });
        }
        return done(null, data, { message: "Login success!" });
      } catch (e) {
        return done(e, false, { message: "User can't be created" });
      }
    }
  )
);

//permit for user ==================================
exports.user = (req, res, next) => {
  passport.authorize("user", { session: false }, (err, user, info) => {
    if (err) {
      return next({ message: err.message, statusCode: 403 });
    }
    if (!user) {
      return next({ message: info.message, statusCode: 403 });
    }
    req.user = user;
    next();
  })(req, res, next);
};
passport.use(
  "user",
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        const data = await user.findOne({
          attributes: ["id", "email", "username"],
          where: {
            id: token.user,
          },
        });

        if (data) {
          return done(null, token);
        }

        return done(null, false, { message: "Access denied!" });
      } catch (error) {
        return done(error, false, { message: "Access denied!" });
      }
    }
  )
);
