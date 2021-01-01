var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Folktale = require('../models/folktale') , config = require('../config/config') , folktale = '' , fValue = '' , fParam = '' ,

eyonId = '' , country = '' , countryId = '' , Country = require('../models/country');

module.exports = {

	'folktaleName' : (req , res) => {		folktale = req.params.folktale;
	
		Folktale.findOne({'url' : new RegExp(folktale, 'i')})
																													.exec((err , folktaleResult) => {
																																														
																													if (err) {
																																									config.compiledError(res , 400 , err);
																																																													return false;	}
																													if (!folktaleResult) {
																																									config.response(res , 404 , {'message' : 'Folktale entry does not exist in the record or is not available.'});
																																																																																																	return false;	}
																																									config.response(res , 200 , folktaleResult);				});
	} ,

	'folktales' : (req , res , next) => {

		Folktale.find({})
											.exec((err , folktaleResult) => {
																													if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																						if (folktaleResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'Folktale entries does not exist in the record or is not available.'});
																																																																																																	return false;	}
																																								config.response(res , 200 , folktaleResult);						});
	} , 

	'folktaleCountry' : (req , res , next) => {	country = req.params.country;

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

						Folktale.find({'country' : countryId._id})
																											.exec((err , folktaleResult) => {

																																	if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																						if (folktaleResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No folktale entries available for this country or state.'});
																																																																																												return false;		}
																																								config.response(res , 200 , folktaleResult);		})		}			});
	} ,

	'folktaleEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

						Folktale.find({'ethnic_group' : eyonId._id})
																												.exec((err , folktaleResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																						if (folktaleResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No folktale entries available for this ethnic group.'});
																																																																																										return false;		}
																																								config.response(res , 200 , folktaleResult);		})		}		});
	} ,
		
	'folktaleDetail' : (req , res , next) => {	folktale = req.params.folktale;

		if (req.params && req.params.folktale) {
			
			Folktale.findOne({'url' : new RegExp(folktale , 'i')})
																															.exec((err , folktaleResult) => {

																													if (err) {
																																									config.compiledError(res , 400 , err);
																																																													return false;	}
																													if (!folktaleResult) {
																																									config.response(res , 404 , {'message' : 'Folktale entry does not exist in the record or is not available.'});
																																																																																																	return false;	}
																																									config.response(res , 200 , folktaleResult);
																											})		}		
			else {
							config.response(res , 404 , {'message' : 'No folktale id provided. Please provide a valid folktale id.'});		}
	} , 

	'folktaleAdd' : (req , res , next) => {
		
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
																											config.response(res , 200 , result);									});
	} , 

	'folktaleAddSubmit' : (req , res , next) => { folktale = new Folktale(req.body);

		folktale.save((err , folktaleResult) => {
																								if (err) {
																																		config.compiledError(res , 400 , err);
																																																						return false;
																												}	else {
																																		config.response(res , 200 , folktaleResult);			}					});
	} , 

	'folktaleUpdate' : (req , res , next) => {		folktale = req.params.folktale;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																																				.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																																				.exec(callback);
																									} ,

																									'Folktale' : (callback) => {
																																								Folktale.findOne({'url' : new RegExp(folktale , 'i')})
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
																		if (!result.Folktale) {
																															config.response(res , 404 , {'message' : 'Folktale does not exist in the record or is not available.'});
																																																																																				return false;		}
																								config.response(res , 200 , result);								});
	} , 

	'folktaleUpdateSubmit' : (req , res , next) => {	fValue = req.body , folktale = req.params.folktale;

				if (req.params && req.params.folktale) {

				Folktale.findOne({'url' : new RegExp(folktale , 'i')} , (err , folktale) => {
																																		
																																				if (!folktale) {	return config.response(res , 404 , {'message' : 'Folktale entry does not exist in the record or is not available.'});	}
																	
				Folktale.findOneAndUpdate({'url' : new RegExp(folktale , 'i')} , 

									{'$set' : fValue} , {'new' : true , 'runValidators' : true} , (err , folktaleResult) => {
																																																							if (err) {																																													
																																																													config.compiledError(res , 400 , err);
																																																																																				return false;	}
																																																													config.response(res , 201 , folktaleResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No folktale id provided. Please provide a valid folktale id.'});		}
	} , 

	'folktaleDelete' : (req , res , next) => {	folktale = req.params.folktale;
		
		if (req.params.folktale) {
				
				Folktale.findOne({'url' : new RegExp(folktale , 'i')} , (err , folktale) => {

																																				if (!folktale) {
																																													return config.response(res , 404 , {'message' : 'Folktale entry does not exist in the record or is not available.'});	}
													folktale.remove((err , folktaleResult) => {
																																				if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;		}

																																						return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No folktale id provided. Please provide a valid folktale id.'});		}
	} 
	
}				