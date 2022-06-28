const User = require("../models/User"),
    passport = require("passport");

const login = async (req, res, next) => {
    const name = req.body.name,
        email = req.body.email,
        password = req.body.password;
    let errors = [];
    if (!email || !password) {
        errors.push({
            msg: "Please fill all the fields"
        })
    }
    if (errors.length > 0) {
        res.render('login', {
            errors
        });
    } else {
        passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
        const user = await User.findOne({
            email: req.body.email
        })
        console.log(`${user.name} is logged in`)
    }
};
module.exports = {
    login
};