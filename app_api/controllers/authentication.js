const passport = require('passport');

const mongoose = require('mongoose');

const User = require('../models/users');

const config = require('../config/config');

var Eyon = require('../models/eyon') , Country = require('../models/country') , kEncryptor = require('../config/kEncryptor') , token = '' , foundUser = '';

module.exports = {

	'signup' : (req , res , next) => {		
		
												async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({})
																																																				.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																											Country.find({})
																																																				.exec(callback);
																									}
			} , (err , result) => {	
															if (err) {
																											config.errResponse(res , 400 , err);
																																															return false;		}
															if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});
																																																															return false;		}
										if (result.Eyon.length == 0) {
																											config.response(res , 404 , {'message' : 'Ethnic Group entries does not exist in the record or is not available.'});
																																																																																						return false;		}
									if (result.Country.length == 0) {
																											config.response(res , 404 , {'message' : 'Country entries does not exist in the record or is not available.'});
																																																																																			return false;		}
																											config.response(res , 200 , result);											});
	} , 

	'signupSubmit' : (req , res) => { userData = req.body;

		if (!req.body.full_name && !req.body.email_address && !req.body.password && !req.body.username) {
																																																			config.response(res , 400 , {'message' : 'All fields are required.'});
																																																																																							return false;		}
									async.parallel({
																									'emailUser' : (callback) => {
																																											User.findOne({'email_address' : userData.email_address} , {'email_address' : 1})
																																																																																				.exec(callback);
																									} ,

																									'usernameUser' : (callback) => {
																																											User.findOne({'username' : userData.username} , {'username' : 1})
																																																																												.exec(callback);
																									}
					} , (err , result) => {	
																			if (err) {
																											config.errResponse(res , 400 , err);
																																															return false;		}
													if (result.emailUser) {
																											config.response(res , 409 , {'message' : 'E-mail Address already exist in the record.'});
																																																																								return false;		}
												if (result.usernameUser) {
																											config.response(res , 409 , {'message' : 'Username already exist in the record.'});
																																																																					return false;		}

							if (!(result.emailUser && result.usernameUser)) {
																																	const user = new User(req.body);
																																	
																																	user.setPassword(req.body.password);

																																	user.save((err , user ) => {
																																																if (err) {
																																																						config.errResponse(res , 400 , err);
																																																																										return false;		} 
																																																	else {

																																																					uIdentity = user._id;
																																																					
																																																					token = user.generateJwt();
																															
																																																					kEncryptor.encryptor(req , res , token , uIdentity);	}		});					}				});
				} ,

	'signin' : (req, res) => {

			if (!req.body.email_address || !req.body.password) {
																														return config.response(res , 400 , {'message' : 'All fields are required.'});	}

			passport.authenticate('local', (err, user, info) => {
																														if (err) {																															
																																				return config.response(res , 400 , err);
																																		}

																														if (user) {		
																																					uIdentity = user._id;

																																					token = user.generateJwt();

																																					kEncryptor.encryptor(req , res , token , uIdentity);
																															} else {
																																					return config.response(res , 401 , info);
																																	}
															})(req , res);
								} ,

	'signout' : (req, res) => {

		token = req.cookies.sid && req.cookies.sid2;

			if (!token) {
										return config.response(res , 401 , {'message' : 'Please provide credentials.'})

			}
					res.clearCookie('sid');
					res.clearCookie('sid2');
					res.clearCookie('sid3');
					res.clearCookie('s_id');

					config.response(res , 200 , {'message' : 'Successfully signed out.'});

	}

}
//http://evening-garden-47445.herokuapp.com/api/continent