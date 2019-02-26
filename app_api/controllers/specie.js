var Specie = require('../models/specie') , config = require('../config/db') , async = require('async') , sValue = '' , specie = '' , sParam = '';

module.exports = {

	'specieName' : (req , res) => {	sValue = req.params.specie;
			
			Specie.findOne({'specie' : new RegExp(sValue, 'i')})
																													.exec((err , specieName) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!specieName) {

																																																						config.response(res , 404 , {'message' : '404'});
																																																																																									return;		}
																																																						config.response(res , 200 , specieName);
																																		});
	},

	'specieList' : (req , res) => {	
																	Specie.find({})
																									.exec(function(err , specieResult) {
																																											if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																											if (!specieResult) {
																																																						config.response(res , 404 , {'message' : 'species cannot be found'});
																																																																																									return;		}
																																																						config.response(res , 200 , specieResult);
																						});
	},

	'specieDetail' : (req , res) => {		sValue = req.params.specie;	

				if (req.params && req.params.specie) {
																			
			async.waterfall([
				
				(callback) => {
																Specie.findOne({'specie' : new RegExp(sValue, 'i')})
																																										.exec((err , specieResult) => {
																																																										callback(null , specieResult);	});
																																																	}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this specie'});
																																																																					return;		}
																												config.response(res , 200 , finalResult);																																														});
																			} else {
																									config.response(res , 404 , {'message' : 'No specie id found'});		}
	},

	'specieAdd' : (req , res) => {		sValue = req.body , specie = new Specie(sValue); 

			specie.save(function(err , specieResult) {
																								if (err) {
																														config.response(res , 404 , err);
																																															return;	}
																														
																														config.response(res , 200 , specieResult);																																												});
	},

	'specieUpdate' : (req , res) => {	sValue = req.body.specie , sParam = req.params.specie;

					if (req.params && req.params.specie) {

			Specie.findOneAndUpdate({'specie' : new RegExp(sParam, 'i')} , sValue , (err) => {
																																												if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});						});
													}
														else {
																			config.response(res , 404 , {'message' : 'No specie id found'});		}
	},

	'specieDelete' : (req , res) => {	sParam = req.params.specie;

				if (req.params && req.params.specie) {

			Specie.findOneAndRemove({'specie' : new RegExp(sParam, 'i')} , function(err) {
																																											if (err) {
																																																	config.response(res , 404 , err);
																																																																		return;	}

																																																	config.response(res , 204 , {'message' : 'Successful request.'});														});
												} else {
																	config.response(res , 404 , {'message' : 'No specie id found'});		}
	},

}