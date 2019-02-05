var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session= require('express-session');

var indexRouter = require('./routes/index');
var schema_router = require('./routes/schema_router');
var register_login_router = require('./routes/register_login_router');
var users_router = require('./routes/users_router');
var admin_router = require ('./routes/admin_router')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/images', express.static('upload'))



//session
app.use(session({
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: true,
  cookie : {
    maxAge: 1000* 60 * 60 *24 * 365
},
}));



//  Authorization Middleware for admin.
var authAdmin =(req,res,next)=>{
  if (req.session.user && req.session.user[0].admin == true){
    next(); 
  }else{
    res.send('not admin');
  }
    
}

//  Authorization Middleware for user.
var authUser =(req,res,next)=>{
  if (req.session.user){
    next(); 
  }else{
    res.send('not logged in');
  } 
}



app.use('/admin',authAdmin);
app.use('/store',authUser);

app.use('/', indexRouter);
app.use('/', register_login_router);
app.use('/', admin_router)
app.use('/', users_router);
app.use('/', schema_router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
