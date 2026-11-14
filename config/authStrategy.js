const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/userModel");

passport.use(
    //with passReqToCallback there is now a path to the tenant information; without this, there is no way to read req.tenant
    new LocalStrategy ({usernameField: "email", passReqToCallback: true}, async (req, email, password, done) => {
        try {
            const user = await User.findOne({ email, tenantId: req.tenant._id }); 

            if (!user) {
                return done(null, false, {
                    message: "Incorrect username or password.",
                });
            }

            const result = await bcrypt.compare(password, user.password);

            if (!result) {
                return done(null, false, {
                    message: "Incorrect username or password.",
                });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);