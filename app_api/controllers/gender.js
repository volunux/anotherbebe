var Gender = require('../models/gender') , config = require('../config/db') , async = require('async') , gValue = '' , gender = '' , gParam = '';

module.exports = {

	'genderName' : (req , res) => {	gValue = req.params.gender;
			
			Gender.findOne({'gender' : new RegExp(gValue, 'i')})
																													.exec((err , genderName) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!genderName) {

																																																						config.response(res , 404 , {'message' : '404'});
																																																																																									return;		}
																																																						config.response(res , 200 , genderName);
																																		});
	},

	'genderList' : (req , res) => {	
																	Gender.find({})
																									.exec(function(err , genderResult) {
																																											if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																											if (!genderResult) {
																																																						config.response(res , 404 , {'message' : 'genders cannot be found'});
																																																																																									return;		}
																																																						config.response(res , 200 , genderResult);
																						});
	},

	'genderDetail' : (req , res) => {		gValue = req.params.gender;	

				if (req.params && req.params.gender) {
																			
			async.waterfall([
				
				(callback) => {
																Gender.findOne({'gender' : new RegExp(gValue, 'i')})
																																									.exec((err , genderResult) => {
																																																									callback(null , genderResult);	});
																																																	}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this gender'});
																																																																					return;		}
																												config.response(res , 200 , finalResult);																																														});
																			} else {
																									config.response(res , 404 , {'message' : 'No gender id found'});		}
	},

	'genderAdd' : (req , res) => {		gValue = req.body , gender = new Gender(gValue);
			
			gender.save(function(err , genderResult) {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , genderResult);																																												});
	},

	'genderUpdate' : (req , res) => {	gValue = req.body.gender , gParam = req.params.gender;

					if (req.params && req.params.gender) {

			Gender.findOneAndUpdate({'gender' : new RegExp(gParam, 'i')} , gValue , (err) => {
																																												if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});						});
													}
														else {
																			config.response(res , 404 , {'message' : 'No gender id found'});		}
	},

	'genderDelete' : (req , res) => {	gParam = req.params.gender;

				if (req.params && req.params.gender) {

			Gender.findOneAndRemove({'gender' : new RegExp(gParam, 'i')} , function(err) {
																																											if (err) {
																																																	config.response(res , 404 , err);
																																																																		return;	}

																																																	config.response(res , 204 , {'message' : 'Successful request.'});														});
												} else {
																	config.response(res , 404 , {'message' : 'No gender id found'});		}
	},

}