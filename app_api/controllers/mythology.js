var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Mythology = require('../models/mythology') , config = require('../config/config') , mythology = '' , mValue = '' , mParam = '' ,

eyonId = '' , country = '' , countryId = '' , Country = require('../models/country');

module.exports = {

	'mythologyName' : (req , res) => {		mythology = req.params.mythology;
	
		Mythology.findOne({'url' : new RegExp(mythology, 'i')})
																														.exec((err , mythologyResult) => {

																											if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																										if (!mythologyResult) {
																																							config.response(res , 404 , {'message' : 'Mythology entry does not exist in the record or is not available.'});
																																																																																															return false;	}
																																							config.response(res , 200 , mythologyResult);					});
	},

	'mythologys' : (req , res , next) => {

		Mythology.find({})
												.exec((err , mythologyResult) => {

																				if (err) {
																																							config.compiledError(res , 400 , err);
																																																										return false;		}
																				if (mythologyResult.length == 0) {
																																							config.response(res , 404 , {'message' : 'Mythology entries does not exist in the record or is not available.'});
																																																																																																	return false;		}
																																							config.response(res , 200 , mythologyResult);				});
	} , 

	'mythologyCountry' : (req , res , next) => {	country = req.params.country;

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
																														config.response(res , 404 , {'message' : 'Country does not exist in the record or is not available.'});
																																																																																			return false;		} 	
					if (countryId) {

						Mythology.find({'country' : countryId._id})
																												.exec((err , mythologyResult) => {

																						if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																						if (mythologyResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No mythology entries available for this country or state.'});
																																																																																													return false;		}
																																								config.response(res , 200 , mythologyResult);			})		}		});
	} ,

	'mythologyEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

						Mythology.find({'ethnic_group' : eyonId._id})
																												.exec((err , mythologyResult) => {

																					if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																					if (mythologyResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No mythology entries available for this ethnic group.'});
																																																																																										return false;		}
																																								config.response(res , 200 , mythologyResult);			})		}		});
	} ,
		
	'mythologyDetail' : (req , res , next) => {	mythology = req.params.mythology;

		if (req.params && req.params.mythology) {
			
			Mythology.findOne({'url' : new RegExp(mythology , 'i')})
																																.exec((err , mythologyResult) => {

																												if (err) {
																																									config.compiledError(res , 400 , err);
																																																													return false;	}
																												if (!mythologyResult) {
																																									config.response(res , 404 , {'message' : 'Mythology entry does not exist in the record or is not available.'});
																																																																																																	return false;	}
																																									config.response(res , 200 , mythologyResult);		})		}		
			else {
							config.response(res , 404 , {'message' : 'No Mythology id provided. Please provie a valid mythology valid.'});		}
	} , 

	'mythologyAdd' : (req , res , next) => {
		
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
																											config.response(res , 200 , result);					});
	} , 

	'mythologyAddSubmit' : (req , res , next) => { mythology = new Mythology(req.body);

		mythology.save((err , mythologyResult) => {
																								if (err) {
																																		config.compiledError(res , 400 , err);
																																																						return false;
																												}	else {
																																		config.response(res , 200 , mythologyResult);		}			});
	} , 

	'mythologyUpdate' : (req , res , next) => {		mythology = req.params.mythology;

		async.parallel({
																									'Eyon' : (callback) => {
																																									Eyon.find({})
																																																																						.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																									Country.find({})
																																																																						.exec(callback);
																									} ,

																									'Mythology' : (callback) => {
																																									Mythology.findOne({'url' : new RegExp(mythology , 'i')})
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
																	if (!result.Mythology) {
																														config.response(res , 404 , {'message' : 'Mythology entry does not exist in the record or is not available.'});
																																																																																						return false;		}
																														config.response(res , 200 , result);			});
	} , 

	'mythologyUpdateSubmit' : (req , res , next) => {	mValue = req.body , mParam = req.params.mythology;

				if (req.params && req.params.mythology) {

				Mythology.findOne({'url' : new RegExp(mythology , 'i')} , (err , mythology) => {
																																				
																																					if (!mythology) {	return config.response(res , 404 , {'message' : 'Mythology entry does not exist in the record or is not available.'});	}
																	
				Mythology.findOneAndUpdate({'url' : new RegExp(mythology , 'i')} , 

									{'$set' : mValue} , {'new' : true , 'runValidators' : true} , (err , mythologyResult) => {
																																																							if (err) {																																													
																																																													config.compiledError(res , 400 , err);
																																																																																				return false;	}
																																																													config.response(res , 201 , mythologyResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No mythology id provided. Please provide a valid mythology id.'});		}
	} , 

	'mythologyDelete' : (req , res , next) => {	mythology = req.params.mythology;
		
		if (req.params.mythology) {
				
				Mythology.findOne({'url' : new RegExp(mythology , 'i')} , (err , mythology) => {

																																				if (!mythology) {
																																													return config.response(res , 404 , {'message' : 'Mythology entry does not exist in the record or is not available.'});	}
												mythology.remove((err , mythologyResult) => {
																																				if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;		}

																																						return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No mythology id provided. Please provide a valid mythology id.'});		}
	} 
	
}				