var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Religion = require('../models/religion') , config = require('../config/config') , religion = '' , rValue = '' , religion = '' ,

eyonId = '' , country = '' , countryId = '' , Country = require('../models/country');

module.exports = {

	'religionName' : (req , res) => {		religion = req.params.religion;
	
		Religion.findOne({'url' : new RegExp(religion, 'i')})
																													.exec((err , religionResult) => {

																											if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																											if (!religionResult) {
																																							config.response(res , 404 , {'message' : 'Religion entry does not exist in the record or is not available.'});
																																																																																																	return false;	}
																																							config.response(res , 200 , religionResult);					});
	} ,

	'religions' : (req , res , next) => {

		Religion.find({})
											.exec((err , religionresult) => {
																													if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																						if (religionresult.length == 0) {
																																								config.response(res , 404 , {'message' : 'Religion entries does not exist in the record or is not available.'});
																																																																																																	return false;	}
																																								config.response(res , 200 , religionresult);					});
	} , 

	'religionCountry' : (req , res , next) => {	country = req.params.country;

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

						Religion.find({'country' : countryId._id})
																												.exec((err , religionresult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																					if (religionresult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No religion entries available for this country or state.'});
																																																																																												return false;		}
																																								config.response(res , 200 , religionresult);		})		}		});
	} ,

	'religionEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

						Religion.find({'ethnic_group' : eyonId._id})
																													.exec((err , religionresult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																						if (religionresult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No religion entries available for this ethnic group.'});
																																																																																										return false;		}
																																								config.response(res , 200 , religionresult);				})		}		});
	} ,
		
	'religionDetail' : (req , res , next) => {	religion = req.params.religion;

		if (req.params && req.params.religion) {
			
			Religion.findOne({'url' : new RegExp(religion , 'i')})
																															.exec((err , religionResult) => {
																																																
																											if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;		}
																										if (!religionResult) {
																																						config.response(res , 404 , {'message' : 'Religion entry does not exist in the record or is not available.'});
																																																																																														return false;		}
																																						config.response(res , 200 , religionResult);		})		}		
			else {
							config.response(res , 404 , {'message' : 'No Religion id provided. Please provide a valid religion id.'});
				}
	} , 

	'religionAdd' : (req , res , next) => {
		
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
																											config.response(res , 200 , result);						});
	} , 

	'religionAddSubmit' : (req , res , next) => { religion = new Religion(req.body);

		religion.save((err , religionResult) => {
																							if (err) {
																																	config.compiledError(res , 400 , err);
																																																					return false;
																											}	else {
																																	config.response(res , 200 , religionResult);		}			});
	} , 

	'religionUpdate' : (req , res , next) => {		religion = req.params.religion;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																																					.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																																					.exec(callback);
																									} ,

																									'Religion' : (callback) => {
																																								Religion.findOne({'url' : new RegExp(religion , 'i')})
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
															if (!result.Religion) {
																											config.response(res , 404 , {'message' : 'Religion entry does not exist in the record or is not available.'});
																																																																																			return false;		}
																											config.response(res , 200 , result);				});
	} , 

	'religionUpdateSubmit' : (req , res , next) => {	rValue = req.body , religion = req.params.religion;

				if (req.params && req.params.religion) {

				Religion.findOne({'url' : new RegExp(religion , 'i')} , (err , religion) => {
																																						
																																					if (!religion) {	return config.response(res , 404 , {'message' : 'Religion entry does not exist in the record or is not available.'});	}

				Religion.findOneAndUpdate({'url' : new RegExp(religion , 'i')} , 

						{'$set' : rValue} , {'new' : true , 'runValidators' : true} , (err , religionResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																																	return false;	}
																																																										config.response(res , 201 , religionResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No religion id provided. Please provide a valid religion id.'});		}
	} , 

	'religionDelete' : (req , res , next) => {	religion = req.params.religion;
		
		if (req.params.religion) {
				
				Religion.findOne({'url' : new RegExp(religion , 'i')} , (err , religion) => {
																																							
																																					if (!religion) {
																																														return config.response(res , 404 , {'message' : 'Religion entry does not exist in the record or is not available.'});	}

															religion.remove((err , religionResult) => {
																																					if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;		}

																																							return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No religion id provided. Please provide a valid religion id.'});		}
	} 
	
}				