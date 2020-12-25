var createError = require('http-errors');
var express = require('express');
var dotenv = require('dotenv');
dotenv.config();
//Set up mongoose connection
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trainingRouter = require('./routes/esercitazioni');
var downloadsRouter = require('./routes/downloads');
var examRouter = require('./routes/simulazioneEsami.js');
var contactsRouter = require('./routes/contatti');
var arisRouter = require('./routes/areaRiservata');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
const { ensureAuthenticated } = require('./config/auth');
var app = express();
require('./config/passport')(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(compression());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/downloads', downloadsRouter);
app.use('/esercitazioni', trainingRouter);
app.use('/simulazionesami', examRouter);
app.use('/contatti', contactsRouter);
app.use('/areariservata', ensureAuthenticated, arisRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
