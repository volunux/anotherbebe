var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Food = require('../models/food') , config = require('../config/config') , food = '' , fValue = '' , fParam = '' , eyonId = '' ,

country = '' , countryId = '' , Country = require('../models/country');

module.exports = {

	'foodName' : (req , res) => {		food = req.params.food;
	
		Food.findOne({'url' : new RegExp(food, 'i')})
																									.exec((err , foodResult) => {

																													if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																													if (!foodResult) {
																																							config.response(res , 404 , {'message' : 'Food entry does not exist in the record or or is not available.'});
																																																																																														return false;	}
																																							config.response(res , 200 , foodResult);			});
	} ,

	'foods' : (req , res , next) => {

		Food.find({})
									.exec((err , foodResult) => {
																										if (err) {
																																				config.compiledError(res , 400 , err);
																																																								return false;	}
																				if (foodResult.length == 0) {
																																				config.response(res , 404 , {'message' : 'Food entries does not exist in the record or is not available.'});
																																																																																											return false;	}
																																				config.response(res , 200 , foodResult);				});
	} , 

	'foodCountry' : (req , res , next) => {	country = req.params.country;

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

						Food.find({'country' : countryId._id})
																										.exec((err , foodResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																								if (foodResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No food entries available for this country or state.'});
																																																																																										return false;		}
																																								config.response(res , 200 , foodResult);		})		}			});
	} ,

	'foodEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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
																																																																																							return false;			} 	
					if (eyonId) {

						Food.find({'ethnic_group' : eyonId._id})
																											.exec((err , foodResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																								if (foodResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No food entries available for this ethnic group.'});
																																																																																								return false;		}
																																								config.response(res , 200 , foodResult);		})		}			});
	} ,
		
	'foodDetail' : (req , res , next) => {	food = req.params.food;

		if (req.params && req.params.food) {
			
			Food.findOne({'url' : new RegExp(food , 'i')})
																											.exec((err , foodResult) => {
																																										
																																if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;	}
																																if (!foodResult) {
																																											config.response(res , 404 , {'message' : 'Food entry does not exist in the record or is not available.'});
																																																																																																	return false;	}
																																											config.response(res , 200 , foodResult);			})		}		
					else {
										config.response(res , 404 , {'message' : 'No Food id provided. Please provide a valid food id.'});
							}
	} , 

	'foodAdd' : (req , res , next) => {
						
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

	'foodAddSubmit' : (req , res , next) => {	 food = new Food(req.body);

		food.save((err , foodResult) => {
																				if (err) {
																													config.compiledError(res , 400 , err);
																																																	return false;
																								}	else {	
																													config.response(res , 200 , foodResult);		}			});
	} , 

	'foodUpdate' : (req , res , next) => {		food = req.params.food;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																																	.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																																	.exec(callback);
																									} ,

																									'Food' : (callback) => {
																																								Food.findOne({'url' : new RegExp(food , 'i')})
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
																		if (!result.Food) {
																														config.response(res , 404 , {'message' : 'Food entry does not exist in the record or is not available.'});
																																																																																				return false;		}
																														config.response(res , 200 , result);																												});
	} , 

	'foodUpdateSubmit' : (req , res , next) => {	fValue = req.body , food = req.params.food;

				if (req.params && req.params.food) {

				Food.findOne({'url' : new RegExp(food , 'i')} , (err , food) => {		if (!food) {	return config.response(res , 404 , {'message' : 'Food entry does not exist in the record or is not available.'});	}
																	
				Food.findOneAndUpdate({'url' : new RegExp(food , 'i')} , 

									{'$set' : fValue} , {'new' : true , 'runValidators' : true} , (err , foodResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																															return false;	}
																																																										config.response(res , 201 , foodResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No food id provided. Please provide a valid food id.'});		}
	} , 

	'foodDelete' : (req , res , next) => {	food = req.params.food;
		
		if (req.params.food) {
				
					Food.findOne({'url' : new RegExp(food , 'i')} , (err , food) => {		if (!food) { return config.response(res , 404 , {'message' : 'Food entry does not exist in the record or is not available.'});	}
																				
																					food.remove((err , foodResult) => {
																																							if (err) {
																																													config.compiledError(res , 400 , err);
																																																																	return false;		}

																																									return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No food id provided. Please provide a valid food id.'});		}
	} 
	
}				