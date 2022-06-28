const LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    mongoose = require('mongoose'),
    User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            User.findOne({
                    email: email
                })
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            message: 'That E-Mail is not registered'
                        });
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'Password Incorrect'
                            });
                        }
                    })
                })
                .catch((err) => console.log(err))
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    passport.deserializeUser((id, done) => {
        User.find({
            _id: id
        }, (err, user) => {
            done(err, user);
        })
    })
}