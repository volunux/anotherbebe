var Alphabet = require('../models/alphabet') , config = require('../config/db') , async = require('async') , aValue = '' , alphabet = '' , aParam = '';

module.exports = {

	'alphabetName' : (req , res) => {	aValue = req.params.alphabet;
			
			Alphabet.findOne({'alphabet' : new RegExp(aValue, 'i')}) .exec((err , alphabetName) => {
																																												if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																												if (!alphabetName) {

																																																						config.response(res , 404 , {'message' : '404'});
																																																																																									return;		}
																																																						config.response(res , 200 , alphabetName);
																																		});
	},

	'alphabetList' : (req , res) => {	
																	Alphabet.find({})
																									.exec(function(err , alphabetResult) {
																																											if (err) {
																																																						config.response(res , 404 , err);
																																																																							return;	}
																																											if (!alphabetResult) {
																																																						config.response(res , 404 , {'message' : 'alphabets cannot be found'});
																																																																																									return;		}
																																																						config.response(res , 200 , alphabetResult);
																						});
	},

	'alphabetDetail' : (req , res) => {		aValue = req.params.alphabet;	

				if (req.params && req.params.alphabet) {
																			
			async.waterfall([
				
				(callback) => {
																Alphabet.findOne({'alphabet' : new RegExp(aValue, 'i')})
																																									.exec((err , alphabetResult) => {
																																																									callback(null , alphabetResult);	});
																																																	},
],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																													return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Titles not available for this alphabet'});
																																																																					return;		}
																												config.response(res , 200 , finalResult);																																														});
																			} else {
																									config.response(res , 404 , {'message' : 'No alphabet id found'});		}
	},

	'alphabetAdd' : (req , res) => {		aValue = req.body , alphabet = new Alphabet(aValue);
			
			alphabet.save(function(err , alphabetResult) {
																											if (err) {
																																	config.response(res , 404 , err);
																																																			return;	}
																																	
																																	config.response(res , 200 , alphabetResult);																																												});
	},

	'alphabetUpdate' : (req , res) => {	aValue = req.body.alphabet , aParam = req.params.alphabet;

					if (req.params && req.params.alphabet) {

			Alphabet.findOneAndUpdate({'alphabet' : new RegExp(aParam, 'i')} , aValue , (err) => {
																																												if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});						});
													}
														else {
																			config.response(res , 404 , {'message' : 'No alphabet id found'});		}
	},

	'alphabetDelete' : (req , res) => {	aParam = req.params.alphabet;

				if (req.params && req.params.alphabet) {

			Alphabet.findOneAndRemove({'alphabet' : new RegExp(aParam, 'i')} , function(err) {
																																											if (err) {
																																																	config.response(res , 404 , err);
																																																																		return;	}

																																																	config.response(res , 204 , {'message' : 'Successful request.'});														});
												} else {
																	config.response(res , 404 , {'message' : 'No alphabet id found'});		}
	},

}