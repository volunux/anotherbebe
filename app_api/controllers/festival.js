var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Festival = require('../models/festival') , config = require('../config/config') , festival = '' , fValue = '' , fParam = '' ,

eyonId = '' , country = '' , countryId = '' , Country = require('../models/country');

module.exports = {

	'festivalName' : (req , res) => {		festival = req.params.festival;

		Festival.findOne({'url' : new RegExp(festival, 'i')})
																													.exec((err , festivalResult) => {

																																		if (err) {
																																									config.compiledError(res , 400 , err);
																																																													return false;	}
																													if (!festivalResult) {
																																									config.response(res , 404 , {'message' : 'Festival entry does not exist in the record or or is not available.'});
																																																																																																		return false;	}
																																									config.response(res , 200 , festivalResult);					});
	} ,

	'festivals' : (req , res , next) => {

		Festival.find({})
											.exec((err , festivalResult) => {
																													if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;	}
																				if (festivalResult.length == 0) {
																																						config.response(res , 404 , {'message' : 'Festival entries does not exist in the record or is not available.'});
																																																																																															return false;	}
																																						config.response(res , 200 , festivalResult);					});
	} , 

	'festivalCountry' : (req , res , next) => {	country = req.params.country;

							async.parallel({
																									'Country' : (callback) => {
																																								Country.findOne({'name' : new RegExp(country , 'i')})
																																																																				.exec(callback);
																									}
			} , (err , result) => {	

				if (result) {
											 countryId = result.Country;
					}
																		if (err) {
																																		config.compiledError(res , 400 , err);
																																																						return false;		}
																		if (!result) {
																																		config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});
																																																																						return false;		}
																		if (!result.Country) {
																																		config.response(res , 404 , {'message' : 'Country entry does not exist in the record or is not available.'});
																																																																																									return false;	} 	
					if (countryId) {

						Festival.find({'country' : countryId._id})
																												.exec((err , festivalResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																						if (festivalResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No festival entries available for this country or state.'});
																																																																																												return false;		}
																																								config.response(res , 200 , festivalResult);	})		}		});
	} ,

	'festivalEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

							async.parallel({
																									'Eyon' : (callback) => {
																																						Eyon.findOne({'eyon' : new RegExp(ethnic , 'i')})
																																																															.exec(callback);
																									}
			} , (err , result) => {	

				if (result) {
											 eyonId = result.Eyon;
					}
																		if (err) {
																													config.compiledError(res , 400 , err);
																																																	return false;		}
																		if (!result) {
																													config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});
																																																																		return false;		}
																		if (!result.Eyon) {
																													config.response(res , 404 , {'message' : 'Ethnic Group entry does not exist in the record or is not available.'});
																																																																																							return false;	} 	
					if (eyonId) {

						Festival.find({'ethnic_group' : eyonId._id})
																													.exec((err , festivalResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																						if (festivalResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No festival entries available for this ethnic group.'});
																																																																																										return false;		}
																																								config.response(res , 200 , festivalResult);			})		}		});
	} ,
		
	'festivalDetail' : (req , res , next) => {	festival = req.params.festival;

		if (req.params && req.params.festival) {
			
			Festival.findOne({'url' : new RegExp(festival , 'i')})
																															.exec((err , festivalResult) => {

																															if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;	}
																													if (!festivalResult) {
																																										config.response(res , 404 , {'message' : 'Festival entry does not exist in the record or is not available.'});
																																																																																																		return false;	}
																																										config.response(res , 200 , festivalResult);			})		}		
				else {
								config.response(res , 404 , {'message' : 'No festival id provided. Please provide a valid festival id.'});		}
	} , 

	'festivalAdd' : (req , res , next) => {
		
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
																														config.response(res , 200 , result);																														});
	} , 

	'festivalAddSubmit' : (req , res , next) => {	festival = new Festival(req.body);

		festival.save((err , festivalResult) => {
																							if (err) {
																																	config.compiledError(res , 400 , err);
																																																					return false;
																											}	else {
																																	config.response(res , 200 , festivalResult);		}				});
	} , 

	'festivalUpdate' : (req , res , next) => {		festival = req.params.festival;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																																				.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																															.exec(callback);
																									} ,

																									'Festival' : (callback) => {
																																								Festival.findOne({'url' : new RegExp(festival , 'i')})
																																																																				.exec(callback) }	
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
																		if (!result.Festival) {
																														config.response(res , 404 , {'message' : 'Festival entry does not exist in the record or is not available.'});
																																																																																						return false;		}
																								config.response(res , 200 , result);																																																						});
	} , 

	'festivalUpdateSubmit' : (req , res , next) => {	fValue = req.body , festival = req.params.festival;

				if (req.params && req.params.festival) {

				Festival.findOne({'url' : new RegExp(festival , 'i')} , (err , festival) => {

																																						if (!festival) {	return config.response(res , 404 , {'message' : 'Festival entry does not exist in the record or is not available.'});	}
																	
				Festival.findOneAndUpdate({'url' : new RegExp(festival , 'i')} , 

									{'$set' : fValue} , {'new' : true , 'runValidators' : true} , (err , festivalResult) => {
																																																						if (err) {																			
																																																												config.compiledError(res , 400 , err);
																																																																																			return false;	}
																																																												config.response(res , 201 , festivalResult);										});			});
			} else {
								config.response(res , 404 , {'message' : 'No festival id provided. Please provide a valid festival id.'});		}
	} , 

	'festivalDelete' : (req , res , next) => {	festival = req.params.festival;
		
		if (req.params.festival) {
				
			Festival.findOne({'url' : new RegExp(festival , 'i')} , (err , festival) => {
																																						
																																				if (!festival) {
																																													return config.response(res , 404 , {'message' : 'Festival entry does not exist in the record or is not available.'});	}
													festival.remove((err , festivalResult) => {
																																				if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;		}

																																						return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No festival id provided. Please provide a valid festival id.'});		}
	} 
	
}				