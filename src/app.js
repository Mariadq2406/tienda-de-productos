const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session')
const flash = require('connect-flash')
const app = express();
const mongoose = require('mongoose');

require('./passport/local-aut');

require('dotenv').config();

// BB.DD
mongoose.connect(process.env.DB_URL)
    .then(db => console.log('conectado a la base de datos'))
    .catch(err => console.log(err));
 
// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));
app.use(session({
    secret:'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

app.use ((req,res,next) => {
app.locals.signupMessage = req.flash('signupMessage');
app.locals.signinMessage = req.flash('signinMessage');
console.log(app.locals);
app.locals.user = req.user;
next();
});

//routes
app.use('/', indexRoutes);

//static files
app.use(express.static(path.join(__dirname, '/public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log('Listening at http://localhost:3000');
});