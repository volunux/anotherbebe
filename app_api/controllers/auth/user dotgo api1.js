const passport = require('passport');

const mongoose = require('mongoose');

const User = require('../models/users');

const config = require('../config/config');

var Eyon = require('../models/eyon') , Country = require('../models/country') , Art = require('../models/art') , Dress = require('../models/dress') , Festival = require('../models/festival') ,

Folktale = require('../models/folktale') , Food = require('../models/food') , Law = require('../models/law') , Legend = require('../models/legend') , Life = require('../models/life') ,  

Mythology = require('../models/mythology') , Religion = require('../models/food') , Photo = require('../models/photo') , Video = require('../models/video') ,  Sound = require('../models/sound') , user = '';

module.exports = {

	'dashboard' : (req , res , next) => {

										async.parallel({
																									'Art' : (callback) => {
																																											Art.find({}).limit(1).exec(callback);
																									} ,

																									'Dress' : (callback) => {
																																											Dress.find({}).limit(1).exec(callback);
																									} ,

																									'Festival' : (callback) => {
																																											Festival.find({}).limit(1).exec(callback);
																									} ,

																									'Folktale' : (callback) => {
																																											Folktale.find({}).limit(1).exec(callback);
																									} ,

																									'Food' : (callback) => {
																																											Food.find({}).limit(1).exec(callback);
																									} ,

																									'Law' : (callback) => {
																																											Law.find({}).limit(1).exec(callback);
																									} ,

																									'Legend' : (callback) => {
																																											Legend.find({}).limit(1).exec(callback);
																									} ,

																									'Life' : (callback) => {
																																											Life.find({}).limit(1).exec(callback);
																									} ,

																									'Mythology' : (callback) => {
																																											Mythology.find({}).limit(1).exec(callback);
																									} ,

																									'Religion' : (callback) => {
																																											Religion.find({}).limit(1).exec(callback);
																									} ,

																									'Photo' : (callback) => {
																																											Photo.find({}).limit(1).exec(callback);
																									} ,

																									'Video' : (callback) => {
																																											Video.find({}).limit(1).exec(callback);
																									} ,

																									'Sound' : (callback) => {
																																											Sound.find({}).limit(1).exec(callback);
																									} ,
			} , (err , result) => {	
															if (err) {
																								config.compiledError(res , 400 , err);
																																												return false;		}
															if (!result) {
																								config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});
																																																												return false;		}
																								config.response(res , 200 , result);				});
			} , 	

	'profile' : (req, res) => {	user = req.user;
																
			User.findOne({'_id' : req.user._id } , (err, user) => {
																																if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;			}
																																if (!user) { 	
																																							config.response(res , 404 , {'message' : 'User entry does not exist in the record or is not available.'});
																																																																																													return false;			}
																																							config.response(res , 200 , user);			});
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
																											config.response(res , 200 , result);				})
		} ,

	'profileUpdateSubmit' : (req , res , next) => { userData = req.body;

		if (!req.body.full_name && !req.body.email_address && !req.body.password && !req.body.username) {
																																																			config.response(res , 400 , {'status' : 'All fields are required.'});
																																																																																						return false;		}

				User.findOne({ 'email_address' : userData.email_address } , (err, email) => {
																																												if (err) { 
																																																		config.compiledError(res , 400 , err);	 
																																																																						return false;	}
																																												if (user) {
																																																		config.response(res , 409 , 'E-mail Address already exist in the record.');
																																																																																								return false;		} });
										User.findOne({ 'username' : userData.username } , (err, user) => {
																																												if (err) { 
																																																		config.compiledError(res , 400 , err);	 
																																																																						return false;	}
																																												if (user) {
																																																		config.response(res , 409 , 'Username already exist in the record.');
																																																																																					return false;		} });
				if (req.user) {

		User.findOneAndUpdate({'_id' : req.user._id} , 

							{'$set' : userData} , {'new' : true , 'runValidators' : true} , (err , userResult) => {
																																																			if (err) {																																													
																																																									config.compiledError(res , 400 , err);
																																																																														return false;	}
																																																									config.response(res , 201 , userResult);										});
							} else {
													config.response(res , 404 , {'message' : 'User entry does not exist in the record or is not available.'});			}
			} ,

}
//http://evening-garden-47445.herokuapp.com/api/continent