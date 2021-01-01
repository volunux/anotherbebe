var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , History = require('../models/history') , config = require('../config/config') , history = '' , hValue = '' , hParam = '' ,

eyonId = '' , country = '' , countryId = '' , Country = require('../models/country');

module.exports = {

	'historyName' : (req , res) => {		history = req.params.history;
	
		History.findOne({'url' : new RegExp(history, 'i')})
																												.exec((err , historyResult) => {

																													if (err) {
																																									config.compiledError(res , 400 , err);
																																																													return false;	}
																													if (!historyResult) {
																																									config.response(res , 404 , {'message' : 'History entry does not exist in the record or is not available.'});
																																																																																																		return false;	}
																																									config.response(res , 200 , historyResult);			});
	} ,

	'historys' : (req , res , next) => {

		History.find({})
											.exec((err , historyResult) => {
																												if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																						if (historyResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'History entries does not exist in the record or is not available'});
																																																																																															return false;	}
																																								config.response(res , 200 , historyResult);				});
	} , 

	'historyCountry' : (req , res , next) => {	country = req.params.country;

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

						History.find({'country' : countryId._id})
																											.exec((err , historyResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																						if (historyResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No history entries available for this country or state.'});
																																																																																											return false;		}
																																								config.response(res , 200 , historyResult);		})		}		});
	} ,

	'historyEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

						History.find({'ethnic_group' : eyonId._id})
																												.exec((err , historyResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																							if (historyResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No history entries available for this ethnic group.'});
																																																																																									return false;		}
																																								config.response(res , 200 , historyResult);		})		}		});
	} ,
		
	'historyDetail' : (req , res , next) => {	history = req.params.history;

		if (req.params && req.params.history) {
			
			History.findOne({'url' : new RegExp(history , 'i')})
																														.exec((err , historyResult) => {

																															if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;	}
																															if (!historyResult) {
																																										config.response(res , 404 , {'message' : 'History entry does not exist in the record or is not available.'});
																																																																																																	return false;	}
																																										config.response(res , 200 , historyResult);			})		}		
					else {
									config.response(res , 404 , {'message' : 'No History id provided. Please provide a valid history id.'});		}
	} , 

	'historyAdd' : (req , res , next) => {
		
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
																											config.response(res , 200 , result);																																															});
	} , 

	'historyAddSubmit' : (req , res , next) => {	history = new History(req.body);

		history.save((err , historyResult) => {
																							if (err) {
																																	config.compiledError(res , 400 , err);
																																																					return false;
																											}	else {
																																	config.response(res , 200 , historyResult);		}					});
	} , 

	'historyUpdate' : (req , res , next) => {		history = req.params.history;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																																				.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																																				.exec(callback);
																									} ,

																									'History' : (callback) => {
																																								History.findOne({'url' : new RegExp(history , 'i')})
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
															if (!result.History) {
																											config.response(res , 404 , {'message' : 'History entry does not exist in the record or is not available.'});
																																																																																		return false;		}
																											config.response(res , 200 , result);			});
	} , 

	'historyUpdateSubmit' : (req , res , next) => {	hValue = req.body , history = req.params.history;

				if (req.params && req.params.history) {

				History.findOne({'url' : new RegExp(history , 'i')} , (err , history) => {
																	
																																				if (!history) {	return config.response(res , 404 , {'message' : 'History entry does not exist in the record or is not available.'});	}	
				History.findOneAndUpdate({'url' : new RegExp(history , 'i')} , 

						{'$set' : hValue} , {'new' : true , 'runValidators' : true} , (err , historyResult) => {
																																																			if (err) {																																													
																																																									config.compiledError(res , 400 , err);
																																																																															return false;	}
																																																									config.response(res , 201 , historyResult);										});			});
			} else {
								config.response(res , 404 , {'message' : 'No history id provided. Please provide a valid history id.'});		}
	} , 

	'historyDelete' : (req , res , next) => {	history = req.params.history;
		
		if (req.params.history) {
				
				History.findOne({'url' : new RegExp(history , 'i')} , (err , history) => {
																																			
																																							if (!history) {
																																															return config.response(res , 404 , {'message' : 'History entry does not exist in the record or is not available.'});	}
																	history.remove((err , historyResult) => {
																																							if (err) {
																																													config.compiledError(res , 400 , err);
																																																																	return false;		}

																																									return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No history id provided. Please provide a valid history id.'});		}
	} 
	
}				