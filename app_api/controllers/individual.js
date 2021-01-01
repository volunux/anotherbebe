var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Individual = require('../models/individual') , config = require('../config/config') , individual = '' , iValue = '' , iParam = '' ,

eyonId = '' , country = '' , countryId = '' , Country = require('../models/country');

module.exports = {

	'individualName' : (req , res) => {		individual = req.params.individual;
	
		Individual.findOne({'url' : new RegExp(individual, 'i')})
																															.exec((err , individualResult) => {
																																				
																										if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																										if (!individualResult) {
																																							config.response(res , 404 , {'message' : 'Individual entry does not exist in the record or is not available.'});
																																																																																															return false;	}
																																							config.response(res , 200 , individualResult);					});
	} ,

	'individuals' : (req , res , next) => {

		Individual.find({})
												.exec((err , individualResult) => {
																																if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;	}
																							if (individualResult.length == 0) {
																																										config.response(res , 404 , {'message' : 'Individual entries does not in the record or is not available.'});
																																																																																																	return false;	}
																																										config.response(res , 200 , individualResult);		});
	} , 

	'individualCountry' : (req , res , next) => {	country = req.params.country;

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

						Individual.find({'country' : countryId._id})
																												.exec((err , individualResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																						if (individualResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No individual entries available for this country or state.'});
																																																																																													return false;		}
																																								config.response(res , 200 , individualResult);		})		}			});
	} ,

	'individualEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

						Individual.find({'ethnic_group' : eyonId._id})
																													.exec((err , individualResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																					if (individualResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No individual entries available for this ethnic group.'});
																																																																																											return false;		}
																																								config.response(res , 200 , individualResult);			})			}			});
	} ,
		
	'individualDetail' : (req , res , next) => {	individual = req.params.individual;

		if (req.params && req.params.individual) {
			
			Individual.findOne({'url' : new RegExp(individual , 'i')})
																																.exec((err , individualResult) => {

																												if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																										if (!individualResult) {
																																							config.response(res , 404 , {'message' : 'Individual entry does not exist in the record or is not available.'});
																																																																																																return false;	}
																																							config.response(res , 200 , individualResult);		})		}		
				else {
								config.response(res , 404 , {'message' : 'No Individual id provided. Please provide a valid individual id.'});
					}
	} , 

	'individualAdd' : (req , res , next) => {
		
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

	'individualAddSubmit' : (req , res , next) => {		individual = new Individual(req.body);

		individual.save((err , individualResult) => {
																										if (err) {
																																				config.compiledError(res , 400 , err);
																																																								return false;
																														}	else {
																																				config.response(res , 200 , individualResult);		}				})
	} , 

	'individualUpdate' : (req , res , next) => {		individual = req.params.individual;

		async.parallel({
																									'Eyon' : (callback) => {
																																									Eyon.find({})
																																																																							.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																									Country.find({})
																																																																							.exec(callback);
																									} ,

																									'Individual' : (callback) => {
																																									Individual.findOne({'url' : new RegExp(individual , 'i')})
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
																if (!result.Individual) {
																														config.response(res , 404 , {'message' : 'Individual does not exist in the record or is not available.'});
																																																																																				return false;		}
																								config.response(res , 200 , result);					});
	} , 

	'individualUpdateSubmit' : (req , res , next) => {	iValue = req.body , individual = req.params.individual;

				if (req.params && req.params.individual) {

				Individual.findOne({'url' : new RegExp(individual , 'i')} , (err , individual) => {
																											
																																				if (!individual) {	return config.response(res , 404 , {'message' : 'Individual entry does not exist in the record or is not available.'});	}
																	
				Individual.findOneAndUpdate({'url' : new RegExp(individual , 'i')} , 

									{'$set' : iValue} , {'new' : true , 'runValidators' : true} , (err , individualResult) => {
																																																							if (err) {																																													
																																																													config.compiledError(res , 400 , err);
																																																																																					return false;	}
																																																													config.response(res , 201 , individualResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No individual id provided. Please provide a valid individual id.'});		}
	} , 

	'individualDelete' : (req , res , next) => {	individual = req.params.individual;
		
		if (req.params.individual) {
				
				Individual.findOne({'url' : new RegExp(individual , 'i')} , (err , individual) => {
																																							
																																		if (!individual) {
																																												return config.response(res , 404 , {'message' : 'Individual entry does not exist in the record or is not available.'});	}
									individual.remove((err , individualResult) => {
																																		if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}

																																				return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No individual id provided. Please provide a valid individual id.'});		}
	} 
	
}				