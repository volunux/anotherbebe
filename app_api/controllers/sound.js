var ethnic = '' , alpha = '' , async = require('async') , Eyon = require('../models/eyon') , Country = require('../models/country') , Century = require('../models/century') , Specie = require('../models/specie') ,

Sound = require('../models/sound') , Genre = require('../models/genre') ,  Continent = require('../models/continent') , Region = require('../models/region') , config = require('../config/config') ,

sValue = '' , sParam = '' , sound = '' , ethnic = '' , eyonId = '' , countryId = '' , country = '' , sConfig = require('../config/deleteObject/soundObject');

module.exports = {

	'soundName' : (req , res) => {		sound = req.params.sound;
	
		Sound.findOne({'url' : new RegExp(sound, 'i')})
																										.exec((err , soundResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																														if (!soundResult) {
																																								config.response(res , 404 , {'message' : 'Sound entry does not exist in the record or or is not available.'});
																																																																																																return false;	}
																																								config.response(res , 200 , soundResult);					});
	} ,

	'sounds' : (req , res , next) => {

		Sound.find({})
									.exec((err , soundResult) => {
																										if (err) {
																																				config.compiledError(res , 400 , err);
																																																								return false;		}
																				if (soundResult.length == 0) {
																																				config.response(res , 404 , {'message' : 'Sound entries does not exist in the record or is not available.'});
																																																																																											return false;		}
																																				config.response(res , 200 , soundResult);									});
	} , 

	'soundEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

			Sound.find({'ethnic_group' : eyonId._id})
																								.exec((err , soundResult) => {
																																								if (err) {
																																															config.compiledError(res , 400 , err);
																																																																					return false;		}
																															if (soundResult.length == 0) {
																																															config.response(res , 404 , {'message' : 'No sound entries available for this ethnic group.'});
																																																																																															return false;	}
																																															config.response(res , 200 , soundResult);				})		}			});
	} ,

	'soundCountry' : (req , res , next) => {	country = req.params.country;

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

			Sound.find({'country' : countryId._id})
																							.exec((err , soundResult) => {
																																							if (err) {
																																																config.compiledError(res , 400 , err);
																																																																						return false;		}
																																if (soundResult.length == 0) {
																																																config.response(res , 404 , {'message' : 'No sound entries available for this country or state.'});
																																																																																																		return false;	}
																																																config.response(res , 200 , soundResult);			})	}		});
	} ,
		
	'soundDetail' : (req , res , next) => {	sound = req.params.sound;

		if (req.params && req.params.sound) {
			
			Sound.findOne({'url' : new RegExp(sound , 'i')})
																												.exec((err , soundResult) => {

																													if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																													if (!soundResult) {
																																								config.response(res , 404 , {'message' : 'Sound entry does not exist in the record or is not available.'});
																																																																																															return false;		}
																																								config.response(res , 200 , soundResult);		})		}		
				else {
								config.response(res , 404 , {'message' : 'No Sound id provided. Please provide a valid sound id.'});			}
	} , 

	'soundAdd' : (req , res , next) => {		
		
			async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									} ,

																									'Country' : (callback) => {
																																											Country.find({}).exec(callback);
																									} ,

																									'Region' : (callback) => {
																																											Region.find({}).exec(callback);
																									} ,

																									'Continent' : (callback) => {
																																											Continent.find({}).exec(callback);
																									} ,

																									'Century' : (callback) => {
																																											Century.find({}).exec(callback);
																									} ,

																									'Genre' : (callback) => {
																																											Genre.find({}).exec(callback);
																									} ,
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
									if (result.Genre.length == 0) {
																											config.response(res , 404 , {'message' : 'Genre entries does not exist in the record or is not available.'});
																																																																																		return false;		}
							if (result.Continent.length == 0) {
																											config.response(res , 404 , {'message' : 'Continent entries does not exist in the record or is not available.'});
																																																																																					return false;		}
									if (result.Region.length == 0) {
																											config.response(res , 404 , {'message' : 'Region entries does not exist in the record or is not available.'});
																																																																																			return false;		}
									if (result.Century.length == 0) {
																											config.response(res , 404 , {'message' : 'Century entries does not exist in the record or is not available.'});
																																																																																				return false;		}
																											config.response(res , 200 , result);																								});
	} , 

'soundAddSubmit' : (req , res , next) => {	sound = new Sound(req.body);

		sound.save((err , soundResult) => {
																					if (err) {
																													config.compiledError(res , 400 , err);
																																																	return false;		}	
																						else {
																													config.response(res , 200 , soundResult);		}			});
	} , 

	'soundUpdate' : (req , res , next) => {		sound = req.params.sound;

		async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									} ,

																									'Country' : (callback) => {
																																											Country.find({}).exec(callback);
																									} ,

																									'Genre' : (callback) => {
																																											Genre.find({}).exec(callback);
																									} ,

																									'Continent' : (callback) => {
																																											Continent.find({}).exec(callback);
																									} ,

																									'Region' : (callback) => {
																																											Region.find({}).exec(callback);
																									} ,

																									'Century' : (callback) => {
																																											Century.find({}).exec(callback);
																									} ,

																									'Sound' : (callback) => {
																																											Sound.findOne({'url' : new RegExp(sound , 'i')})
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
										if (result.Genre.length == 0) {
																											config.response(res , 404 , {'message' : 'Genre entries does not exist in the record or is not available.'});
																																																																																		return false;		}
								if (result.Continent.length == 0) {
																											config.response(res , 404 , {'message' : 'Continent entries does not exist in the record or is not available.'});
																																																																																					return false;		}
									if (result.Region.length == 0 ) {
																											config.response(res , 404 , {'message' : 'Region entries does not exist in the record or is not available.'});
																																																																																			return false;		}
									if (result.Century.legnth == 0) {
																											config.response(res , 404 , {'message' : 'Century entries does not exist in the record or is not available.'});
																																																																																				return false;		}
															if (!result.Sound) {
																											config.response(res , 404 , {'message' : 'Sound entry does not exist in the record or is not available.'});
																																																																																	return false;		}
																											config.response(res , 200 , result);		});
	} , 

	'soundUpdateSubmit' : (req , res , next) => {	sValue = req.body , sound = req.params.sound;

				if (req.params && req.params.sound) {

				Sound.findOne({'url' : new RegExp(sound , 'i')} , (err , sound) => {	if (!sound) {	return config.response(res , 404 , {'message' : 'Sound entry does not exist in the record or is not available.'});	}
				
				Sound.findOneAndUpdate({'url' : new RegExp(sound , 'i')} ,

								{'$set' : sValue} , {'new' : true , 'runValidators' : true} , (err , soundResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																															return false;	}
																																																										config.response(res , 201 , soundResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No sound id provided. Please provide a valid sound id.'});		} 
	} ,

	'soundDelete' : (req , res , next) => {	sound = req.params.sound;
		
		if (req.params.sound) {

			Sound.findOne({'url' : new RegExp(sound , 'i')} , (err , sound) => {

				if (!sound) {	return config.response(res , 404 , {'message' : 'Sound entry does not exist in the record or is not available.'});	}

						if (sound.sound_detail.location != null && sound.sound_detail.location != undefined) {
										
										sConfig.delete(sound.sound_detail.location);

												sound.remove((err , soundResult) => {
																															if (err) {
																																					config.compiledError(res , 400 , err);
																																																									return false;		}

																																					config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});			})	}
																			else {
																							sound.remove((err , soundResult) => {
																																										if (err) {
																																																config.compiledError(res , 400 , err);
																																																																				return false;		}

																																												return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})		}			});			
			}	else {
								config.response(res , 404 , {'message' : 'No sound id provided. Please provide a valid sound id.'});		}
	} ,

	'soundVote' : (req , res , next) => { sValue = req.params.sound

		Sound.findOne({'url' : sValue } , (err, sound) => {
					
					if (sound) {														
												sound.vote = sound.vote + 1;
	
						sound.save((err , soundResult) => {
																								if (err) {
																														config.compiledError(res , 400 , err);
																																																		return false;		} 
																									else {
																														res.json({'vote' : soundResult.vote });			}				});		}			});	
		} ,

	'objectDelete' : (req , res , next) => {	sound = req.params.sound;

		if (req.params.sound) {
														sConfig.objectDelete(sound);
																																	
			}	else {
								config.response(res , 404 , {'message' : 'No sound id provided. Please provide a valid sound id.'});		}
		
	} 
	
}				