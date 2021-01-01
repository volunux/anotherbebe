var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Law = require('../models/law') , config = require('../config/config') , law = '' , lValue = '' , lParam = '' , eyonId = '' ,

country = '' , countryId = '' , Country = require('../models/country');

module.exports = {

	'lawName' : (req , res) => {		law = req.params.law;
	
		Law.findOne({'url' : new RegExp(law, 'i')})
																								.exec((err , lawResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																															if (!lawResult) {
																																								config.response(res , 404 , {'message' : 'Law entry does not exist in the record or is not available.'});
																																																																																															return false;		}
																																								config.response(res , 200 , lawResult);					});
	} ,

	'laws' : (req , res , next) => {

		Law.find({})
									.exec((err , lawResult) => {
																								if (err) {
																																		config.compiledError(res , 400 , err);
																																																						return false;	}
																			if (lawResult.length == 0) {
																																		config.response(res , 404 , {'message' : 'Law entries does not exist in the record or is not available.'});
																																																																																								return false;	}
																																		config.response(res , 200 , lawResult);					});
	} , 

	'lawCountry' : (req , res , next) => {	country = req.params.country;

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

						Law.find({'country' : countryId._id})
																										.exec((err , lawResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																								if (lawResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No law entries available for this country or state.'});
																																																																																									return false;		}
																																								config.response(res , 200 , lawResult);			})		}			});
	} ,

	'lawEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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
																																																																																						return false;		} 	
					if (eyonId) {

						Law.find({'ethnic_group' : eyonId._id})
																										.exec((err , lawResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																								if (lawResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No law entries available for this ethnic group.'});
																																																																																							return false;		}
																																								config.response(res , 200 , lawResult);			})		}			});
	} ,
		
	'lawDetail' : (req , res , next) => {	law = req.params.law;

		if (req.params && req.params.law) {
			
			Law.findOne({'url' : new RegExp(law , 'i')})
																										.exec((err , lawResult) => {

																																			if (err) {
																																												config.compiledError(res , 400 , err);
																																																																return false;		}
																																			if (!lawResult) {
																																												config.response(res , 404 , {'message' : 'Law entry does not exist in the record or is not available.'});
																																																																																																	return false;		}
																																												config.response(res , 200 , lawResult);		})		}		
			else {
							config.response(res , 404 , {'message' : 'No Law id provided. Please provide a valid law id.'});
						}
	} , 

	'lawAdd' : (req , res , next) => {
		
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
																											config.response(res , 200 , result);			});
	} , 

	'lawAddSubmit' : (req , res , next) => {	law = new Law(req.body);

		law.save((err , lawResult) => {
																		if (err) {
																												config.compiledError(res , 400 , err);
																						}	else {
																												config.response(res , 200 , lawResult);		}							});
	} , 

	'lawUpdate' : (req , res , next) => {		law = req.params.law;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																																				.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																																				.exec(callback);
																									} ,

																									'Law' : (callback) => {
																																								Law.findOne({'url' : new RegExp(law , 'i')})
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
																		if (!result.Law) {
																														config.response(res , 404 , {'message' : 'Law entry does not exist in the record or is not available.'});
																																																																																			return false;		}
																														config.response(res , 200 , result);				});
	} , 

	'lawUpdateSubmit' : (req , res , next) => {	lValue = req.body , law = req.params.law;

				if (req.params && req.params.law) {

				Law.findOne({'url' : new RegExp(law , 'i')} , (err , law) => {	if (!law) {	return config.response(res , 404 , {'message' : 'Law entry does not exist in the record or is not available.'});	}

				Law.findOneAndUpdate({'url' : new RegExp(law , 'i')} , 

									{'$set' : lValue} , {'new' : true , 'runValidators' : true} , (err , lawResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																														return false;	}
																																																										config.response(res , 201 , lawResult);										});			});
			} else {
								config.response(res , 404 , {'message' : 'No law id provided. Please provide a valid law id.'});		}
	} , 

	'lawDelete' : (req , res , next) => {	law = req.params.law;
		
		if (req.params.law) {

							Law.findOne({'url' : new RegExp(law , 'i')} , (err , law) => {	if (!law) {	return config.response(res , 404 , {'message' : 'Law entry does not exist in the record or is not available.'});	}
																					law.remove((err , lawResult) => {
																																							if (err) {
																																													config.compiledError(res , 400 , err);
																																																																	return false;		}

																																									return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No law id provided. Please provide a valid law id.'});		}
	} 
	
}				