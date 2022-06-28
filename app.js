const express = require("express"),
    dotenv = require("dotenv"),
    router = require("./routes/auth"),
    expressLayouts = require('express-ejs-layouts'),
    session = require("express-session"),
    passport = require('passport'),
    flash = require('connect-flash'),
    cookieParser = require("cookie-parser"),
    connectMongoDB = require("./config/connectMongoDB");


require("./config/passport")(passport);
const app = express();
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

dotenv.config({
    path: "./config/config.env"
});
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json())
connectMongoDB();

app.use(expressLayouts);
app.set('view engine', 'ejs');


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})
app.use("/", router);

app.listen(process.env.PORT, () => {
    console.log(`Mongo-Login-Logout Started on Port : ${process.env.PORT}`)
});