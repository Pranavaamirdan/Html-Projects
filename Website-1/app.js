const path = require("path");
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db.js');
const flash = require('connect-flash');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Logging
if (process.env.NODE_ENV !== 'development') {
  app.use(morgan('dev'));
}

// Passport Config
require('./config/passport')(passport);

// Connection to Mongoose
connectDB();


// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: true }));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
//Capture All 404 errors

app.use(function (req,res,next){
	res.status(404).render('404');
});

const PORT = require('./config/keys').port;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));