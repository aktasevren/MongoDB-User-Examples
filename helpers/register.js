const User = require ("../models/User");

const register = async (req, res) => {
    const name = req.body.name,
        email = req.body.email,
        password = req.body.password;

    let errors = [];
    if (!name || !email || !password) {
        errors.push({
            msg: "Please fill all the fields"
        })
    }else if (password.length<8){
        errors.push({
            msg: "Password must not be less than 8 characters"
        })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors
        });
    } else {
        const newUser = new User({
            name,
            email,
            password
        })

        await newUser.save()
            .then(user => {
                req.flash('success_msg', "Registration successful");
                res.redirect('/login');
            })
            .catch(err => console.log(err));
            console.log(`${newUser.name} has been created`)
    }
};

module.exports = {register};