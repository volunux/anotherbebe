var Baby = require('../models/baby') , config = require('../config/db') , async = require('async') , bValue = '' , baby = '' , bParam = '';

module.exports = {

	'babyName' : (req , res) => {	bValue = req.params.baby;
			
			Baby.findOne({'baby' : new RegExp(bValue, 'i')})
																													.exec((err , babyName) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!babyName) {

																																																						config.response(res , 404 , {'message' : '404'});
																																																																																									return;		}
																																																						config.response(res , 200 , babyName);
																																		});
	},

	'babyList' : (req , res) => {	
																	Baby.find({})
																									.exec(function(err , babyResult) {
																																											if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																											if (!babyResult) {
																																																						config.response(res , 404 , {'message' : 'babys cannot be found'});
																																																																																									return;		}
																																																						config.response(res , 200 , babyResult);
																						});
	},

	'babyDetail' : (req , res) => {		bValue = req.params.baby;	

				if (req.params && req.params.baby) {
																			
			async.waterfall([
				
				(callback) => {
																Baby.findOne({'baby' : new RegExp(bValue, 'i')})
																																									.exec((err , babyResult) => {
																																																									callback(null , babyResult);	});
																																																	}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this baby'});
																																																																					return;		}
																												config.response(res , 200 , finalResult);																																														});
																			} else {
																									config.response(res , 404 , {'message' : 'No baby id found'});		}
	},

	'babyAdd' : (req , res) => {		bValue = req.body , baby = new Baby(bValue);
			
			baby.save(function(err , babyResult) {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , babyResult);																																												});
	},

	'babyUpdate' : (req , res) => {	bValue = req.body.baby , bParam = req.params.baby;

					if (req.params && req.params.baby) {

			Baby.findOneAndUpdate({'baby' : new RegExp(bParam, 'i')} , bValue , (err) => {
																																												if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});						});
													}
														else {
																			config.response(res , 404 , {'message' : 'No baby id found'});		}
	},

	'babyDelete' : (req , res) => {	bParam = req.params.baby;

				if (req.params && req.params.baby) {

			Baby.findOneAndRemove({'baby' : new RegExp(bParam, 'i')} , function(err) {
																																											if (err) {
																																																	config.response(res , 404 , err);
																																																																		return;	}

																																																	config.response(res , 204 , {'message' : 'Successful request.'});														});
												} else {
																	config.response(res , 404 , {'message' : 'No baby id found'});		}
	},

}