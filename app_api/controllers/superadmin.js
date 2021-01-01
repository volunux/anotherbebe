const passport = require('passport');

const mongoose = require('mongoose');

const User = require('../models/users');

const config = require('../config/config');

var Eyon = require('../models/eyon') , Country = require('../models/country') , Dress = require('../models/dress') , Festival = require('../models/festival') ,

Folktale = require('../models/folktale') , Food = require('../models/food') , Law = require('../models/law') , Legend = require('../models/legend') , Life = require('../models/life') ,  

Mythology = require('../models/mythology') , Religion = require('../models/food') , Photo = require('../models/photo') , Video = require('../models/video') ,  Sound = require('../models/sound');

var Art = require('../../app_api/models/models').Art;

module.exports = {

	'profile' : (req, res) => {	var user = req.user.email_address;
																
			User.findOne({'email_address' : req.user.email_address } , (err, user) => {

																															if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;			}
																															if (!user) { 
																																						config.response(res , 404 , {'message' : 'User entry does not exist in the record or is not available.'});
																																																																																												return false;			}
																																						config.response(res , 200 , user);		});
		} , 

	'listUser' : (req, res) => {
																
			User.find({})
										.exec((err , userResult) => {
																									if (err) {
																																			config.compiledError(res , 400 , err);
																																																							return false;	}
																			if (userResult.length == 0) {
																																			config.response(res , 404 , {'message' : 'User entries does not exist in the record or is not available.'});
																																																																																										return false;	}
																																			config.response(res , 200 , userResult);			});
		} , 

	'profileUser' : (req, res) => { user = req.params.user;
																
			User.findById(user)
													.exec((err , userResult) => {
																												if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;	}
																												if (!userResult) {
																																						config.response(res , 404 , {'message' : 'User entry does not exist in the record or or is not available.'});
																																																																																													return false;	}
																																						config.response(res , 200 , userResult);			});
		} , 

	'add' : (req , res , next) => {		
		
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
																											config.compiledError(res , 400 , err);
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
																											config.response(res , 200 , result);					});
	} , 

	'addSubmit' : (req , res) => {

			if (!req.body.full_name || !req.body.email_address || !req.body.password) {
																																									config.response(res , 400 , {'status' : 'All fields are required.'});
																																																																												return false;		}

									User.findOne({ 'email_address' : req.body.email_address } , (err, user) => {
																																																if (err) { 
																																																						config.compiledError(res , 400 , err);	 
																																																																										return false;	}
																																																if (user) {
																																																						config.response(res , 409 , 'User already exists.');
																																																																																	return false;			} });
				const user = new User(req.body);
																
							user.setPassword(req.body.password);

							user.role = 'superAdmin';

				user.save((err , user ) => {
																			if (err) {
																									config.compiledError(res , 400 , err);
																																													return false;		} 
																				else {
																								token = user.generateJwt();
		
																								kEncryptor.encryptor(req , res , token);	}		});
		} ,

	'update' : (req , res , next) => {		
		
			async.parallel({
																										'Eyon' : (callback) => {
																																												Eyon.find({})
																																																																			.exec(callback);
																										} ,

																										'Country' : (callback) => {
																																												Country.find({})
																																																																			.exec(callback);
																										} ,
																										
																										'User' : (callback) => {
																																												User.findOne({'_id' : req.user._id})
																																																																			.exec(callback);
																										}
				} , (err , result) => {	
																if (err) {
																											config.compiledError(res , 400 , err);
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
																											config.response(res , 200 , result);					});
	} , 

	'updateSubmit' : (req , res) => { uValue = req.body;

		if (!req.body.full_name || !req.body.email_address || !req.body.password) {
																																								config.response(res , 400 , {'status' : 'All fields are required.'});
																																																																											return false;		}

								User.findOne({ 'email_address' : req.body.email_address } , (err, user) => {
																																															if (err) { 
																																																					config.compiledError(res , 400 , err);	 
																																																																									return false;	}
																																															if (user) {
																																																					config.response(res , 409 , 'User already exists.');
																																																																																return false;	}		 });
			User.findOneAndUpdate({'_id' : req.user._id} ,

					{'$set' : uValue} , {'new' : true , 'runValidators' : true} , (err , userResult) => {

																			if (err) {
																									config.compiledError(res , 400 , err);
																																													return false;		} 
																				else {
																									config.response(res , 200 , 'Profile successfully updated.')}		});
			} ,

	'userUpdate' : (req , res) => { user = req.params.user , uValue = req.body;

		if (!req.body.full_name || !req.body.email_address || !req.body.password) {
																																								config.response(res , 400 , {'status' : 'All fields are required.'});
																																																																											return false;		}

								User.findOne({ 'email_address' : req.body.email_address } , (err, user) => {
																																															if (err) { 
																																																					config.compiledError(res , 400 , err);	 
																																																																									return false;	}
																																															if (user) {
																																																					config.response(res , 409 , 'User already exists');
																																																																															return false;	} });
			User.findOneAndUpdate({'_id' : user} ,

					{'$set' : uValue} , {'new' : true , 'runValidators' : true} , (err , userResult) => {

																			if (err) {
																									config.compiledError(res , 400 , err);
																																													return false;		} 
																				else {
																									config.response(res , 200 , 'Profile successfully updated.')}		});
			} ,

	'userDelete' : (req , res , next) => {	user = req.params.user;
		
		User.findOneAndRemove({'_id' : user} , (err) => {
																											if (err) {
																																	config.compiledError(res , 400 , err);
																																																					return false;		}

																																	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});									});
	} ,

	'dashboard' : (req , res , next) => {

		async.parallel({
																									'Art' : (callback) => {
																																											Art.find({}).exec(callback);
																									} ,

																									'Dress' : (callback) => {
																																											Dress.find({}).exec(callback);
																									} ,

																									'Festival' : (callback) => {
																																											Festival.find({}).exec(callback);
																									} ,

																									'Folktale' : (callback) => {
																																											Folktale.find({}).exec(callback);
																									} ,

																									'Food' : (callback) => {
																																											Food.find({}).exec(callback);
																									} ,

																									'Law' : (callback) => {
																																											Law.find({}).exec(callback);
																									} ,

																									'Legend' : (callback) => {
																																											Legend.find({}).exec(callback);
																									} ,

																									'Life' : (callback) => {
																																											Life.find({}).exec(callback);
																									} ,

																									'Mythology' : (callback) => {
																																											Mythology.find({}).exec(callback);
																									} ,

																									'Religion' : (callback) => {
																																											Religion.find({}).exec(callback);
																									} ,

																									'Photo' : (callback) => {
																																											Photo.find({}).exec(callback);
																									} ,

																									'Video' : (callback) => {
																																											Video.find({}).exec(callback);
																									} ,

																									'Sound' : (callback) => {
																																											Sound.find({}).exec(callback);
																									} ,
			} , (err , result) => {	
															if (err) {
																								config.compiledError(res , 400 , err);
																																												return false;		}
															if (!result) {
																								config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});
																																																												return false;		}
																								config.response(res , 200 , result);							});
		} , 	

	'profileUpdate' : (req , res , next) => {	userData = req.body;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																															.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																															.exec(callback);
																									} ,

																									'User' : (callback) => {
																																								User.findOne({'_id' : req.user._id})
																																																															.exec(callback)
																								 }	
			} , (err , result) => {	
																		if (err) {
																											config.compiledError(res , 400 , err);
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
															if (!result.User) {
																											config.response(res , 404 , {'message' : 'User entry does not exist in the record or is not available.'});
																																																																																return false;		}
																											config.response(res , 200 , result);			})
				} ,

	'profileUpdateSubmit' : (req , res , next) => { userData = req.body;

				if (req.user) {

		User.findOneAndUpdate({'id' : req.user._id} , 

							{'$set' : userData} , {'new' : true , 'runValidators' : true} , (err , userResult) => {
																																																			if (err) {																																													
																																																									config.compiledError(res , 400 , err);
																																																																														return false;	}
																																																									config.response(res , 201 , userResult);										});
				} else {
									config.response(res , 404 , {'message' : 'No user id exist in the record.'});			}
		} 
}
//http://evening-garden-47445.herokuapp.com/api/continent