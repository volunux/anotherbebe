var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Dress = require('../models/dress') , config = require('../config/config') , dress = '' , dValue = '' , dParam = '' , eyonId = '' ,

country = '' , countryid = '' , Country = require('../models/country');

module.exports = {

	'dressName' : (req , res) => {	dress = req.params.dress;
	
		Dress.findOne({'url' : new RegExp(dress, 'i')})
																										.exec((err , dressResult) => {

																																if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;	}
																																if (!dressResult) {
																																											config.response(res , 404 , {'message' : 'Dress entry does not exist in the record or or is not available'});
																																																																																																		return false;	}
																																											config.response(res , 200 , dressResult);							});
	} ,

	'dress' : (req , res , next) => {

		Dress.find({})
										.exec((err , dressResult) => {
																											if (err) {
																																					config.compiledError(res , 400 , err);
																																																									return false;	}
																				if (dressResult.lenth == 0) {
																																					config.response(res , 404 , {'message' : 'Dress entries does nt exist in the record or is not available.'});
																																																																																												return false;	}
																																					config.response(res , 200 , dressResult);							});
	} , 

	'dressCountry' : (req , res , next) => {	country = req.params.country;

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

						Dress.find({'country' : countryId._id})
																										.exec((err , dressResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																							if (dressResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No dress entries available for this country or state.'});
																																																																																										return false;		}
																																								config.response(res , 200 , dressResult);			})		}			});
	} ,

	'dressEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

				Dress.find({'ethnic_group' : eyonId._id})
																										.exec((err , dressResult) => {

																															if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																							if (dressResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'No dresss entries available for this ethnic group.'});
																																																																																									return false;		}
																																								config.response(res , 200 , dressResult);			})		}			});
	} ,
		
	'dressDetail' : (req , res , next) => {	dress = req.params.dress;

		if (req.params && req.params.dress) {
			
			Dress.findOne({'url' : new RegExp(dress , 'i')})
																												.exec((err , dressResult) => {

																																if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;	}
																																if (!dressResult) {
																																											config.response(res , 404 , {'message' : 'Dress entry does not exist in the record or is not available.'});
																																																																																																	return false;	}
																																											config.response(res , 200 , dressResult);		})		}		
					else {
									config.response(res , 404 , {'message' : 'No Dress id provided. Please provide a valid dress id'});		}
	} , 

	'dressAdd' : (req , res , next) => {
		
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
																														config.response(res , 200 , result);																															});
	} , 

	'dressAddSubmit' : (req , res , next) => { dress = new Dress(req.body);

		dress.save((err , dressResult) => {
																				if (err) {
																														config.compiledError(res , 400 , err);
																																																		return false;
																								}	else {
																														config.response(res , 200 , dressResult);		}					})
	} , 

	'dressUpdate' : (req , res , next) => {		dress = req.params.dress;

		async.parallel({
																									'Eyon' : (callback) => {
																																								Eyon.find({})
																																																																				.exec(callback);
																									} ,

																									'Country' : (callback) => {
																																								Country.find({})
																																																																				.exec(callback);
																									} ,

																									'Dress' : (callback) => {
																																								Dress.findOne({'url' : new RegExp(dress , 'i')})
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
																		if (!result.Dress) {
																														config.response(res , 404 , {'message' : 'Dress entry does not exist in the record or is not available.'});
																																																																																				return false;		}
																														config.response(res , 200 , result);																																															});
	} , 

	'dressUpdateSubmit' : (req , res , next) => {	dValue = req.body , dress = req.params.dress;

				if (req.params && req.params.dress) {

				Dress.findOne({'url' : new RegExp(dress , 'i')} , (err , dress) => {	if (!dress) {	return config.response(res , 404 , {'message' : 'Dress entry does not exist in the record or is not available.'});	}
																	
				Dress.findOneAndUpdate({'url' : new RegExp(dress , 'i')} , 

								{'$set' : dValue} , {'new' : true , 'runValidators' : true} , (err , dressResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																															return false;	}
																																																										config.response(res , 201 , dressResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No dress id provided. Please provide a valid dress id.'});		}
	} , 

	'dressDelete' : (req , res , next) => {	dress = req.params.dress;
		
		if (req.params.dress) {
				
				Dress.findOne({'url' : new RegExp(dress , 'i')} , (err , dress) => {	if (!dress) {	return config.response(res , 404 , {'message' : 'Dress entry does not exist in the record or is not available.'});	}
																	
																				dress.remove((err , dressResult) => {
																																							if (err) {
																																													config.compiledError(res , 400 , err);
																																																																	return false;		}

																																									return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No dress id provided. Please provide a valid dress id.'});		}
	} 
	
}				