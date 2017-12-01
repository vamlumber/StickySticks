var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var logins = require('./routes/logins');
var notes = require('./routes/notes');
var multer = require('multer');
var flash = require('connect-flash');
var mongo =require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
var app = express();
app.use(express.static(__dirname + '/public'));
// app.get('*', function(req, res) {
//     res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
// });
var options = {
	useMongoClient : true ,
	autoIndex : false ,
	reconnectTries : Number.MAX_VALUE ,
	reconnectInterval : 500 ,
	poolSize : 10 ,
	bufferMaxEntries : 0
};

mongoose.connect('mongodb://localhost/sticky-notes',options);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Handle File Uploads
var upload = multer({dest:'./public/images'}); 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Handle Express Sessions
app.use(session({secret : 'secret',
	saveUninitialized : true ,
	resave : true
	}));

//Passport

app.use(passport.initialize());
app.use(passport.session());

//Validator

app.use(expressValidator({
	errorFormatter : function(param,msg,value){
		var namespace = param.split('.'),
		root = namespace.shift() ,
		formParam = root;
		while(namespace.length){
			formParam += '['+ namespace.shift() + ']';
		}
		return{
			param : formParam ,
			msg : msg ,
			value : value
		};
	}
}));

app.use(cookieParser());
//app.use(express.static(path.join(__dirname, '/public')));


app.use(flash());
app.use(function(req,res,next){
	res.locals.messages = require('express-messages')(req,res);
	next();
});

app.use('/', logins);
app.use('/notes', notes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
