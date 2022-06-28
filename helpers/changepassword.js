const User = require("../models/User");

const changepassword = async (req, res) => {
    let errors = [];
    const email = req.body.email
    newpassword = req.body.newpassword;
    const user = await User.findOne({
        user_id: req.session.passport.user
    })
    if (email == user.email) {
        user.password = newpassword;
        await user.save();
        console.log(`The password of the user named ${user.name} has been changed`)
        res.render('profile', {
            User: req.session.passport.user,
        })
    }else{
        errors.push({
            msg: "Please check your email-adres"
        })
    }
    if (errors.length > 0) {
        res.render('changepassword', {
            errors
        });
    }
};

module.exports = {
    changepassword
};