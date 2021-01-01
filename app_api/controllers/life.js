var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Life = require('../models/life') , config = require('../config/config') , life = '' , lValue = '' , lParam = '' , eyonId = '' , 

countryId = '' , country = '' , Country = require('../models/country');

module.exports = {

	'lifeName' : (req , res) => {		life = req.params.life;
	
		Life.findOne({'url' : new RegExp(life, 'i')})
																									.exec((err , lifeResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																														if (!lifeResult) {
																																								config.response(res , 404 , {'message' : 'Life entry does not exist in the record or is not available.'});
																																																																																														return false;	}
																																								config.response(res , 200 , lifeResult);				});
	} ,

	'lifes' : (req , res , next) => {

		Life.find({})
									.exec((err , lifeResult) => {
																									if (err) {
																																			config.compiledError(res , 400 , err);
																																																							return false;	}
																			if (lifeResult.length == 0) {
																																			config.response(res , 404 , {'message' : 'Life entries does not exist in the record or not available.'});
																																																																																								return false;	}
																																			config.response(res , 200 , lifeResult);				});
	} , 

	'lifeCountry' : (req , res , next) => {	country = req.params.country;

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

						Life.find({'country' : countryId._id})
																										.exec((err , lifeResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																								if (lifeResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No life entries available for this country or state.'});
																																																																																										return false;		}
																																								config.response(res , 200 , lifeResult);						})		}		});
	} ,

	'lifeEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

						Life.find({'ethnic_group' : eyonId._id})
																										.exec((err , lifeResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																								if (lifeResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No life entries available for this ethnic group.'});
																																																																																								return false;		}
																																								config.response(res , 200 , lifeResult);			})		}		});
	} ,
		
	'lifeDetail' : (req , res , next) => {	life = req.params.life;

		if (req.params && req.params.life) {
			
			Life.findOne({'url' : new RegExp(life , 'i')})
																											.exec((err , lifeResult) => {

																															if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;	}
																															if (!lifeResult) {
																																										config.response(res , 404 , {'message' : 'Life entry does not exist in the record or is not available.'});
																																																																																																return false;	}
																																										config.response(res , 200 , lifeResult);		})		}		
		else {
						config.response(res , 404 , {'message' : 'No Life id provided. Please provide a valid life id.'});
			}
	} , 

	'lifeAdd' : (req , res , next) => {
		
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

	'lifeAddSubmit' : (req , res , next) => {	life = new Life(req.body);

		life.save((err , lifeResult) => {
																				if (err) {
																														config.compiledError(res , 400 , err);
																																																		return false;
																								}	else {
																														config.response(res , 200 , lifeResult);		}			});
	} , 

	'lifeUpdate' : (req , res , next) => {		life = req.params.life;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																																.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																																.exec(callback);
																									} ,

																									'Life' : (callback) => {
																																								Life.findOne({'url' : new RegExp(life , 'i')})
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
																		if (!result.Life) {
																														config.response(res , 404 , {'message' : 'Life entry does not exist in the record or is not available.'});
																																																																																				return false;		}
																														config.response(res , 200 , result);			});
	} , 

	'lifeUpdateSubmit' : (req , res , next) => {	lValue = req.body , lParam = req.params.life;

				if (req.params && req.params.life) {

				Life.findOne({'url' : new RegExp(life , 'i')} , (err , life) => {		if (!life) {	return config.response(res , 404 , {'message' : 'Life entry does not exist in the record or is not available.'});	}													

				Life.findOneAndUpdate({'url' : new RegExp(life , 'i')} , 

									{'$set' : lValue} , {'new' : true , 'runValidators' : true} , (err , lifeResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																															return false;	}
																																																										config.response(res , 201 , lifeResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No life id provided. Please provide a valid life id.'});		}
	} , 

	'lifeDelete' : (req , res , next) => {	life = req.params.life;
		
		if (req.params.life) {
				
					Life.findOne({'url' : new RegExp(life , 'i')} , (err , life) => {		if (!life) {	return config.response(res , 404 , {'message' : 'Life entry does not exist in the record or is not available.'});	}

																				life.remove((err , lifeResult) => {
																																							if (err) {
																																													config.compiledError(res , 400 , err);
																																																																	return false;		}

																																									return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No life id provided. Please provide a valid life id.'});		}
	} 
	
}				