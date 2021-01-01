const async = require('async');

const config = require('../config/config');

var Eyon = require('../models/eyon') , eValue = '' , eyon = '' , eParam = '';

module.exports = {

	'eyonName' : (req , res) => {	eyon = req.params.eyon;
			
			Eyon.findOne({'_id' : eyon })
																		.lean({})

																		.exec((err , entryResult) => {

																					if (err) {
																												return config.errResponse(res , 400 , err);		}
																	if (!entryResult) {
																												return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record is not available.`});		}

																												return config.response(res , 200 , entryResult);		});
	} ,

	'eyonList' : (req , res) => {
			
			Eyon.find({})
										.lean({})

										.select('_id')

										.hint({'_id' : 1})

										.exec((err , entryResult) => {
																				
																					if (err) {
																																							return config.errResponse(res , 400 , err);		}
																					if (entryResult.length == 0) {
																																							return config.response(res , 404 , {'message' : `Ethnic Group entries does not exists in the record or is not available.`});		}

																																							return config.response(res , 200 , entryResult);				});
	} ,

	'eyonDetail' : (req , res) => {		eyon = req.params.eyon;	

				if (req.params && req.params.eyon) {
																			
				Eyon.findOne({'$text' : {'$search' : eyon }})
																												.lean({})

																												.exec((err , eyonResult) => {

																																			if (err) {
																																									config.errResponse(res , 400 , err);
																																																													return false;	}
																														if (!eyonResult) {
																																									config.response(res , 404 , {'message' : 'Ethnic Group entry does not exists in this record or is not available.'});
																																																																																																			return false;	}
																																									config.response(res , 200 , eyonResult);		});
								} else {
														config.response(res , 404 , {'message' : 'No eyon id provided. Please provide a valid ethnic group id.'});		}
	} ,

	'eyonAdd' : (req , res) => {	eValue = req.body , eyon = new Eyon(eValue);
			
			eyon.save((err , eyonResult) => {
																				if (err) {
																										config.errResponse(res , 400 , err);
																																															return false;	}
																										config.response(res , 200 , eyonResult);									});
	},

	'eyonUpdate' : (req , res) => {	eValue = req.body.eyon , eyon = req.params.eyon;

				if (req.params && req.params.eyon) {

				Eyon.findOne({'$text' : {'$search' : eyon }} , (err , eyon) => {		if (!eyon) {	return config.response(res , 404 , {'message' : 'Ethnic entry does not exists in the record or is not available.'});	}
																	
				Eyon.findOneAndUpdate({'$text' : {'$search' : eyon }} , 

									{'$set' : eValue} , {'new' : true , 'runValidators' : true} , (err , eyonResult) => {
																																																				if (err) {																																													
																																																										config.errResponse(res , 400 , err);
																																																																															return false;	}
																																																										config.response(res , 201 , eyonResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No ethnic id provided. Please provide a valid ethnic id.'});		}
	} ,

	'eyonDelete' : (req , res) => {	eyon = req.params.eyon;

		if (req.params.eyon) {
				
				Eyon.findOne({'$text' : {'$search' : eyon }} , (err , eyon) => {
																																							if (!eyon) {
																																														return config.response(res , 404 , {'message' : 'Ethnic entry does not exists in the record or is not available.'});	}
																				eyon.remove((err , eyonResult) => {
																																							if (err) {
																																													config.errResponse(res , 400 , err);
																																																																	return false;		}

																																									return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No ethnic id provided. Please provide a valid ethnic id.'});		}
	} ,

}