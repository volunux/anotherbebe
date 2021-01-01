var ethnic = '' , async = require('async') , Eyon = require('../models/eyon') , Country = require('../models/country') , config = require('../config/config') ,

art = '' , aValue = '' , country = '';

var Art = require('../../app_api/models/models').Art;

const modelType = 'Art';

module.exports = {

	'entryInfo' : (req , res) => {	art = req.params.art;
	
			if (req.params && req.params.art) {

					Art.findOne({'slug' : art })																		
																			.lean({})

																			.select(`title slug -_id`)
																			
																			.exec((err , entryResult) => {

																							if (err) {
																																			return config.errResponse(res , 400 , err);		}
																							if (!entryResult) {
																																			return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
																																		
																																			return config.response(res , 200 , entryResult);		})		}
			else {
							return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
	} ,

	'arts' : (req , res , next) => {

			Art.find({})		.lean({})

											.hint({'slug' : 1})

											.limit(20)

											.select(`-_id title country ethnic_group slug`)

											.exec((err , entryResult) => {
																											if (err) {
																																								return config.errResponse(res , 400 , err);			}
																								if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'Art entries does not existss in the record or is not available.'});		}
																																							
																																								return config.response(res , 200 , entryResult);				});
	} , 	

	'artCountry' : (req , res , next) => {	country = req.params.country.split('-').join(' ');

							async.parallel({
																		'Country' : (callback) => {
																																Country.findOne({'_id' : country })
																																																		.lean({})
																																																							.select('_id')
																																																															.exec(callback);		}
			} , (err , result) => {	
																if (err) {
																													return config.errResponse(res , 400 , err);		}
																if (!result) {
																													return config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});		}
																if (!result.Country) {
																													return config.response(res , 404 , {'message' : 'Country entry does not existss in the record or is not available.'});		} 	

					if (result.Country) { var country = result.Country;

			Art.find({'country' : country._id})				.lean({})

																								.hint({'country' : 1})

																								.limit(20)

																								.select(`-_id title country ethnic_group slug`)

																								.exec((err , entryResult) => {

																															if (err) {
																																								return config.errResponse(res , 400 , err);		}
																								if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'No Art entries available for this Country or State.'});		}
																																							
																																								return config.response(res , 200 , entryResult);		})			}
					else {
									return config.response(res , 404 , {'message' : 'An error has occured. Please try again.'});		}			});
	} ,

	'artEthnic' : (req , res , next) => {	ethnic = req.params.ethnic.split('-').join(' ');

		if (req.params && req.params.ethnic) {

							async.parallel({
																	'Eyon' : (callback) => {
																														Eyon.findOne({'_id' : ethnic })
																																														.lean({})
																																																			.select('_id')
																																																											.exec(callback);		}
			} , (err , result) => {	
																	if (err) {
																												return config.errResponse(res , 400 , err);			}
																	if (!result) {
																												return config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});		}
																	if (!result.Eyon) {
																												return config.response(res , 404 , {'message' : 'Ethnic Group entry does not exists in the record or is not available.'});		} 	
																	if (result.Eyon) {
																												var eyon = result.Eyon;

		Art.find({'ethnic_group' : eyon._id})				.lean({})

																								.hint({'ethnic_group' : 1})

																								.limit(20)

																								.select(`-_id title country ethnic_group slug`)

																								.exec((err , entryResult) => {

																															if (err) {
																																								return config.errResponse(res , 400 , err);			}
																								if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : `No Art entries available for this Ethnic Group.`});			}
																																						
																																								return config.response(res , 200 , entryResult);				})		}
		else {
						return config.response(res , 404 , {'message' : 'An error has occured. Please try again.'});			}			});		} 
		else {
						return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});			}
	} ,
		
	'artDetail' : (req , res , next) => {	art = req.params.art;

		if (req.params && req.params.art) {
			
			Art.findOne({'slug' : art})
																	.lean({})

																	.populate({'path' : 'author' , 'select' : 'full_name -_id'})							.lean({})

																	.select(`-_id title main_body author country ethnic_group slug`)

																	.exec((err , entryResult) => {

																		console.log(entryResult);
																																	if (err) {
																																											return config.errResponse(res , 400 , err);		}
																																if (!entryResult) {
																																											return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
																																											
																																											return config.response(res , 200 , entryResult);		})	}		
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
	} , 

	'artAdd' : (req , res , next) => {		
		
								async.parallel({
																	'Eyon' : (callback) => {
																																	Eyon.find({})
																																								.lean({})
																																													.select('_id')
																																																					.hint({'_id' : 1 })
																																																															.exec(callback);		} ,
																	'Country' : (callback) => {
																																	Country.find({})
																																									.lean({})
																																														.select('_id')
																																																						.hint({'_id' : 1 })
																																																																.exec(callback);	} ,
						} , (err , result) => {	

															if (err) {
																											return config.errResponse(res , 400 , err);		}
															if (!result) {
																											return config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});		}
										if (result.Eyon.length == 0) {
																											return config.response(res , 404 , {'message' : 'Ethnic Group entries does not exists in the record or is not available.'});		}
										if (result.Country.length == 0) {
																											return config.response(res , 404 , {'message' : 'Country entries does not exists in the record or is not available.'});				}

																											return config.response(res , 200 , result);				});
	} , 

	'artAddSubmit' : (req , res , next) => {		art = new Art(req.body);
		
		art.save((err , entryResult) => {
																			if (err) {
																									return config.errResponse(res , 400 , err);			}	
																			else {
																									return config.response(res , 200 , entryResult);		}				});
	} , 

	'artUpdate' : (req , res , next) => {		art = req.params.art;

								async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.find({})
																																								.lean({})
																																													.select('_id')
																																																					.hint({'_id' : 1 })
																																																															.exec(callback);		} ,
																	'Country' : (callback) => {
																																Country.find({})
																																									.lean({})
																																														.select('_id')
																																																						.hint({'_id' : 1 })
																																																																.exec(callback);	} ,

																	'Art' : (callback) => {
																																Art.findOne({'slug' : art})
																																														.lean({})

																																														.select(`-_id title main_body country ethnic_group slug`)

																																														.exec(callback)		}	
			} , (err , result) => {	
																		if (err) {
																														return config.errResponse(res , 400 , err);			}
																		if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
												if (result.Eyon.length == 0) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entries does not exists in the record or is not available.`});		}
												if (result.Country.length == 0) {
																														return config.response(res , 404 , {'message' : `Country entries does not exists in the record or is not available.`});		}
																		if (!result.Art) {
																														return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}

																														return config.response(res , 200 , result);			});
	} , 

	'artUpdateSubmit' : (req , res , next) => {	aValue = req.body , art = req.params.art;

				if (req.params && req.params.art) {
																	
				Art.findOneAndUpdate({'slug' : art} , {'$set' : aValue} , {'new' : true , 'runValidators' : true})
																																																					.lean({})

																																																					.populate({'path' : 'author' , 'select' : 'full_name -_id'})							.lean({})
							
																																																					.select(`-_id title main_body author country ethnic_group slug`)

																																																					.exec((err , entryResult) => {

																				if (err) {						return config.errResponse(res , 400 , err);			}

																				if (!entryResult) {		return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});	}

																				if (entryResult) {		return config.response(res , 201 , entryResult);	}		});	
			} else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
	} , 

	'entryDeleteSubmit' : (req , res , next) => {	article = req.params.article;

		if (req.params && req.params.article) {

				Art.findOne({'slug' : article })																		
																					.lean({})

																					.select(`title slug -_id`)
																				
																					.exec((err , entryResult) => {

																								if (err) {
																																				return config.errResponse(res , 400 , err);		}
																								if (!entryResult) {
																																				return config.response(res , 404 , {'message' : `${ModelType} entry does not exists in the record or is not available.`});		}
																																			
																																				return config.response(res , 200 , entryResult);		})		}
				else {
								return config.response(res , 404 , {'message' : `No ${ModelType} id provided. Please provide a valid ${ModelType} id.`});			}
	} , 

	'artDelete' : (req , res , next) => {	art = req.params.art;
		
		if (req.params && req.params.art) {
				
			Art.findOneAndDelete({'slug' : art})
																					.lean({})

																					.select('-_id slug')

																					.exec((err , entryResult) => {
																																		
																									if (err) {				return config.errResponse(res , 400 , err);			}
																							
																							if (!entryResult) {		return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});	}

																							if (entryResult) {		return config.response(res , 204 , {'message' : `Entry successfully removed from the record.`});		}		});		} 	
			else {
							return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
	} 
	
}				