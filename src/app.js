const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

//BB.DD
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

//routes
app.use('/', indexRoutes);

//static files
app.use(express.static(path.join(__dirname, '/public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log('Listening at http://localhost:3000');
});