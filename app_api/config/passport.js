const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');

const User = require('../models/users');

passport.use(new LocalStrategy({
																	'usernameField' : 'email_address'
														} ,	
																(username, password, done) => {

														User.findOne({ 'email_address' : {'$in' : [username] } } , '+salt +hash' , (err , user) => {
																														
																																																				if (err) { 
																																																																							return done(err); }

																																																				if (!user) {
																																																																							return done(null , false , { 'message' : 'Incorrect email_address.'	});
																																																				}

																																																				if (!user.validPassword(password)) {
																																																																							return done(null , false , { 'message' : 'Incorrect password.'	});
																																																															}
																																																																							return done(null, user);
																																																});			}
																														));