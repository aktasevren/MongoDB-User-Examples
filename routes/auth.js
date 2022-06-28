const express = require("express"),
    User = require('../models/User'),
    bcrypt = require("bcryptjs"),
    passport = require("passport"),
    {register} = require("../helpers/register"),
    {login} = require("../helpers/login"),
    {changepassword} = require("../helpers/changepassword");


const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});
router.post("/login", login );

router.get("/register", (req, res) => {
    res.render("register");
});
router.post("/register", register);

router.get('/profile', (req, res) => {
    res.render('profile', {
        User: req.session.passport.user,
    })
});

router.get("/logout",async (req, res,next) => {
    const user = await User.findOne({
        user_id : req.session.passport.user
    })
    console.log(`${user.name} is logged out`)
    req.logout(async (err) => {
        if (err) {
            return next(err);
        };
        req.flash('success_msg', "You are logged Out");
        res.redirect('/');
    });
});

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/changepassword", (req, res) => {
    res.render("changepassword")
});
router.post("/changepassword", changepassword)

module.exports = router;