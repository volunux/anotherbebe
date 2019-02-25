var Eyon = require('../models/eyon') , config = require('../config/db') , async = require('async') , eValue = '' , eyon = '' , eParam = '';

module.exports = {

	'eyonName' : (req , res) => {	eValue = req.params.eyon;
			
			Eyon.findOne({'eyon' : new RegExp(eValue, 'i')})
																													.exec((err , eyonName) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!eyonName) {

																																																						config.response(res , 404 , {'message' : '404'});
																																																																																									return;		}
																																																						config.response(res , 200 , eyonName);
																																		});
	},

	'eyonList' : (req , res) => {	
		
		Eyon.find({})
									.exec((err , eyonResult) => {
																								if (err) {
																																			config.response(res , 404 , err);
																																																				return;	}
																								if (!eyonResult) {
																																			config.response(res , 404 , {'message' : 'Ethnic Groups not available.'});
																																																																									return;		}
																																			config.response(res , 200 , eyonResult);
																						});
	},

	'eyonDetail' : (req , res) => {		eValue = req.params.eyon;	

				if (req.params && req.params.eyon) {
																			
			async.waterfall([
				
				(callback) => {
																Eyon.findOne({'eyon' : new RegExp(eValue, 'i')})
																																									.exec((err , eyonResult) => {
																																																									callback(null , eyonResult);	});
																																																	}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this eyon'});
																																																																					return;		}
																												config.response(res , 200 , finalResult);																																														});
																			} else {
																									config.response(res , 404 , {'message' : 'No eyon id found'});		}
	},

	'eyonAdd' : (req , res) => {		eValue = req.body , eyon = new Eyon(eValue);
			
			eyon.save(function(err , eyonResult) {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , eyonResult);																																												});
	},

	'eyonUpdate' : (req , res) => {	eValue = req.body.eyon , eParam = req.params.eyon;

					if (req.params && req.params.eyon) {

			Eyon.findOneAndUpdate({'eyon' : new RegExp(eParam, 'i')} , eValue , (err) => {
																																												if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});						});
													}
														else {
																			config.response(res , 404 , {'message' : 'No eyon id found'});		}
	},

	'eyonDelete' : (req , res) => {	eParam = req.params.eyon;

				if (req.params && req.params.eyon) {

			Eyon.findOneAndRemove({'eyon' : new RegExp(eParam, 'i')} , function(err) {
																																											if (err) {
																																																	config.response(res , 404 , err);
																																																																		return;	}

																																																	config.response(res , 204 , {'message' : 'Successful request.'});														});
												} else {
																	config.response(res , 404 , {'message' : 'No eyon id found'});		}
	},

}