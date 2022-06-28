const mongoose = require("mongoose"),
    bcrypt = require("bcryptjs");

const errors = [];

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        ]
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre("save", function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) throw err;
            this.password = hash;
            next();
        })
    })
})

const User = mongoose.model("Mongo-Login-Logout", UserSchema);
module.exports = User;