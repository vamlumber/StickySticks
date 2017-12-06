var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var login = require('../models/login');
/* GET home page. */
router.post('/register', function(req, res, next) {
   var username = req.body.username;
   var name = req.body.name;
   var password = req.body.password;
   var confPass = req.body.confPass;
   var emailID = req.body.emailID;
   console.log(username);
   console.log(name);
   console.log(password);
   console.log(confPass);
   console.log(emailID);
   if (password != confPass) {
   	console.log("wrong password");
   }
   var newR = new login({
   	username : username,
   	name : name ,
   	password : password ,
 	emailID : emailID
   });
   login.getRegister(newR , function(err,logins) {
   		if(err){
   			console.log(newR);
   		}
   });
   res.status(200);
   var msg ;
   res.json({
   		msg : "Login Sucessful"
   });
});

passport.serializeUser(function(login, done) {
  done(null, login.id);
});

passport.deserializeUser(function(id, done) {
  login.getUserById(id, function(err, login) {
    done(err, login);
  });
});

passport.use(new localStrategy(function (username,passsword,done) {
	login.getUserByUsername(username,function () {
		 console.log(username);
     if(err) throw err ;
		 if(!logins){
		 	console.log('unknown User');
		 	return done(null, false,{message : 'Unkown User'});
		 }
		 login.comparePassword(password , logins.password,function (err,isMatch) {
		 	console.log(password);
      if (err) throw err;
		 	if (isMatch) {
		 		return done(null,login);
		 	} else {
		 		console.log('Invalid Password');
		 		return done(null, false , {message : 'Invalid Passport'});
		 	}
		 });
	});
}));
router.post('/login',passport.authenticate('local') , function (req,res,next) {
	
	res.json(req.user);
  res.status(200);

});
router.get('/logout',function (req,res) {
	req.logout;
	res.status(200);
})
module.exports = router;

	