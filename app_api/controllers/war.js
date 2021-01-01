var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Country = require('../models/country') , War = require('../models/war') , config = require('../config/config') ,

war = '' , wValue = '' , wParam = '' , eyonId = '' , countryId = '' , country = '';

module.exports = {

	'warName' : (req , res) => {		war = req.params.war;
	
		War.findOne({'url' : new RegExp(war, 'i')})
																									.exec((err , warResult) => {
																																							
																																if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;	}
																																if (!warResult) {
																																										config.response(res , 404 , {'message' : 'War entry does not exist in the record or or is not available.'});
																																																																																																	return false;	}
																																										config.response(res , 200 , warResult);					});
	} ,

	'wars' : (req , res , next) => {

			War.find({})
										.exec((err , warResult) => {
																									if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																							if (warResult.length == 0) {
																																							config.response(res , 404 , {'message' : 'War entries does not exist in the record or is not available.'});
																																																																																													return false;	}
																																							config.response(res , 200 , warResult);				});
	} , 	

	'warCountry' : (req , res , next) => {	country = req.params.country;

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

						War.find({'country' : countryId._id})
																									.exec((err , warResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																								if (warResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No war entries available for this country or state.'});
																																																																																									return false;		}
																																								config.response(res , 200 , warResult);			})				}
					else {
									config.response(res , 404 , {'message' : 'An error has occured. Please try again.'});
																																																				return false;		}			});
	} ,

	'warEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

						War.find({'ethnic_group' : eyonId._id})
																										.exec((err , warResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																								if (warResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No war entries available for this ethnic group.'});
																																																																																							return false;		}
																																								config.response(res , 200 , warResult);			})		}
					else {
									config.response(res , 404 , {'message' : 'An error has occured. Please try again.'});
																																																				return false;		}		});
	} ,
		
	'warDetail' : (req , res , next) => {	war = req.params.war;

		if (req.params && req.params.war) {
			
			War.findOne({'url' : new RegExp(war , 'i')})
																										.exec((err , warResult) => {

																																	if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;	}
																																	if (!warResult) {
																																											config.response(res , 404 , {'message' : 'War entry does not exist in the record or is not available.'});
																																																																																																return false;	}
																																											config.response(res , 200 , warResult);
																																																															return false;		})		
					}		else {
											config.response(res , 404 , {'message' : 'No war id provided. Please provide a valid war id.'});		}
	} , 

	'warAdd' : (req , res , next) => {		
		
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
																											config.response(res , 200 , result);											});
	} , 

	'warAddSubmit' : (req , res , next) => {		war = new War(req.body);

		war.save((err , warResult) => {
																			if (err) {
																													config.compiledError(res , 400 , err);
																																																	return false;
																							}	else {
																													config.response(res , 200 , warResult);		}				})
	} , 

	'warUpdate' : (req , res , next) => {		war = req.params.war;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																															.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																															.exec(callback);
																									} ,

																									'War' : (callback) => {
																																								War.findOne({'url' : new RegExp(war , 'i')})
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
																		if (!result.War) {
																														config.response(res , 404 , {'message' : 'War entry does not exist in the record or is not available.'});
																																																																																			return false;		}
																														config.response(res , 200 , result);					})
	} , 

	'warUpdateSubmit' : (req , res , next) => {	wValue = req.body , war = req.params.war;

				if (req.params && req.params.war) {

				War.findOne({'url' : new RegExp(war , 'i')} , (err , war) => {		if (!war) {	return config.response(res , 404 , {'message' : 'War entry does not exist in the record or is not available.'});	}
				
				War.findOneAndUpdate({'url' : new RegExp(war , 'i')} ,

								{'$set' : wValue} , {'new' : true , 'runValidators' : true} , (err , warResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																														return false;	}
																																																										config.response(res , 201 , warResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No war id provided. Please provide a valid war id.'});		}
	} , 

	'warDelete' : (req , res , next) => {	war = req.params.war;
		
		if (req.params.war) {
				
				War.findOne({'url' : new RegExp(war , 'i')} , (err , war) => {	if (!war) {		return config.response(res , 404 , {'message' : 'War entry does not exist in the record or is not available.'});	}
																	
																		war.remove((err , warResult) => {
																																				if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;		}

																																						return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No war id provided. Please provide a valid war id.'});		}
	} 
	
}				