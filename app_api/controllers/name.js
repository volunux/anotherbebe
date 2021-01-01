var ethnic = '' , specie = '' , alpha = '' , name = '' , nValue = '' , fResult = {} , async = require('async') , config = require('../config/config');

const Baby = require('../models/models').Baby;

const Specie = require('../models/models').Specie;

const Continent = require('../models/models').Continent;

const Region = require('../models/models').Region;

const Gender = require('../models/models').Gender;

const Name = require('../models/name');

const Alphabet = require('../models/models').Alphabet;

const Eyon = require('../models/models').Eyon;

module.exports = {

	'namesAll' : (req , res , next) => {

					async.parallel({
																'Specie' : (callback) => {
																														Specie.findOne({'_id' : 'Human'})
																																															.lean({})
																																																				.select('_id')
																																																												.exec(callback);		}
			} , (err , result) => {	
																				if (err) {
																												return config.errResponse(res , 400 , err);	}
																		if (!result) {
																												return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
															if (!result.Specie) {
																												return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																			if (result) {
																												specie = result.Specie;

					Name.find({'ethnic_group' : {'$exists' : true} , 'specie' : specie._id})		

																								.lean({})

																								.limit(20)

																								.select('name ethnic_group gender -_id')

																								.exec((err , entryResult) => {

																									if (err) {
																																									return config.errResponse(res , 400 , err);		}
																								if (entryResult.length == 0) {
																																									return config.response(res , 404 , {'message' : `Name entries does not exists in the record or is not available.`});	}
																																									
																																									return config.response(res , 200 , entryResult);		});		}

			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});
} , 

	'nameSpecies' : (req , res , next) => { var species = req.params.specie; 

					async.parallel({
																'Specie' : (callback) => {
																														Specie.findOne({'_id' : species})
																																															.lean({})
																																																				.select('_id')
																																																												.exec(callback);		}
			} , (err , result) => {	
																				if (err) {
																												return config.errResponse(res , 400 , err);	}
																		if (!result) {
																												return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
															if (!result.Specie) {
																												return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																			if (result) {
																												specie = result.Specie;

					Name.find({'ethnic_group' : {'$exists' : true} , 'specie' : specie._id})

																								.lean({})

																								.limit(20)

																								.select('name ethnic_group -_id')

																								.exec((err , entryResult) => {

																									if (err) {
																																									return config.errResponse(res , 400 , err);		}
																								if (entryResult.length == 0) {
																																									return config.response(res , 404 , {'message' : `Name entries does not exists in the record or is not available.`});	}
																																									
																																									return config.response(res , 200 , entryResult);		});		}

			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});
} , 

	'nameInfo' : (req , res) => {		name = req.params.name , ethnic = req.body.ethnic , specie = req.body.specie;

		if (req.params && req.params.name) {

					async.parallel({
														'Eyon' : (callback) => {
																													Eyon.findOne({'_id' : ethnic})
																																													.lean({})
																																																		.select('_id')
																																																										.exec(callback);		} ,

														'Specie' : (callback) => {
																													Specie.findOne({'_id' : specie})
																																														.lean({})
																																																			.select('_id')
																																																											.exec(callback);	}
			} , (err , result) => {	
																								if (err) {
																															return config.errResponse(res , 400 , err);	}
																						if (!result) {
																															return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																				if (!result.Eyon) {
																															return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																			if (!result.Specie) {
																															return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																							if (result) {
																															$eyon = result.Eyon , $specie = result.Specie;

			Name.findOne({'name' : name , 'ethnic_group' : $eyon._id , 'specie' : $specie._id})
																																													.lean({})

																																													.select('name ethnic_group specie gender -_id')

																																													.exec((err , entryResult) => {
																													if (err) {
																																							return config.errResponse(res , 400 , err);			}
																													if (!entryResult) {
																																							return config.response(res , 404 , {'message' : 'Name entry does not exists in the record or is not available.'});	}

																																							return config.response(res , 200 , entryResult);		});					}

			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});			}					});			}

			else {	return config.response(res , 404 , {'message' : `No Name id provided. Please provide a valid Name id.`});		}
	} ,

	'names' : (req , res , next) => {

		Name.find({})
									.exec((err , entryResult) => {

																			if (err) {
																																			return config.errResponse(res , 400 , err);		}
																		if (entryResult.length == 0) {
																																			return config.response(res , 404 , {'message' : 'Name entries does not exists in the record or is not available.'});		}

																																			return config.response(res , 200 , entryResult);				});
	} , 

	'nameByGender' : (req , res , next) => {	ethnic = req.params.ethnic , gender = req.params.gender;

		if (req.params && req.params.ethnic) {

				async.parallel({
													'Eyon' : (callback) => {
																												Eyon.findOne({'_id' : ethnic})
																																												.lean({})
																																																	.select('_id')
																																																									.exec(callback);		} ,
													'Gender' : (callback) => {
																												Gender.findOne({'_id' : gender})
																																												.lean({})
																																																	.select('_id')
																																																									.exec(callback);		} ,
													'Specie' : (callback) => {
																												Specie.findOne({'_id' : 'Human'})
																																													.lean({})
																																																		.select('_id')
																																																										.exec(callback);	}
				} , (err , result) => {
																								if (err) {
																															return config.errResponse(res , 400 , err);	}
																						if (!result) {
																															return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																				if (!result.Eyon) {
																															return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																			if (!result.Specie) {
																															return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																			if (!result.Gender) {
																															return config.response(res , 404 , {'message' : `Gender entry does not exists in the record or is not available.`});		}
																							if (result) {
																															$gender = result.Gender , $eyon = result.Eyon , $specie = result.Specie;

							Name.find({'ethnic_group' : $eyon._id , 'specie' : $specie._id , 'gender' : $gender._id })
																																																				.lean({})

																																																				.exec((err , entryResult) => {
																														if (err) {
																																					return config.errResponse(res , 400 , err);		}
																					if (entryResult.length == 0) {
																																					return config.response(res , 404 , {'message' : `Name entries not available for specified gender under this ethnic group.`});		}

																																					return config.response(res , 200 , entryResult);			});		}
	
			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});		}

			else {	return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});		}

	} , 

	'nameByHuman' : (req , res , next) => {		ethnic = req.params.ethnic , alphabet = req.params.alphabet;

		if (req.params && req.params.ethnic) {

					async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.findOne({'_id' : ethnic})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,

																	'Alphabet' : (callback) => {
																																Alphabet.findOne({'_id' : alphabet})
																																																			.lean({})
																																																								.select('_id')
																																																																.exec(callback);		} ,
																	'Specie' : (callback) => {
																																Specie.findOne({'_id' : 'Human'})
																																																	.lean({})
																																																						.select('_id')
																																																														.exec(callback);	}
			} , (err , result) => {
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																	if (!result.Alphabet) {
																														return config.response(res , 404 , {'message' : `Alphabet entry does not exists in the record or is not available.`});		}
																						if (result) {	
																														$alphabet = result.Alphabet , $eyon = result.Eyon , $specie = result.Specie;

						Name.find({'ethnic_group' : $eyon._id , 'specie' : $specie._id , 'alphabet' : $alphabet._id })
																																																						.lean({})

																																																						.select('name gender -_id')

																																																						.exec((err , entryResult) => {
														if (err) {
																														return config.errResponse(res , 400 , err);		}
														if (entryResult.length == 0) {
																														return config.response(res , 404 , {'message' : `Name entries not available for this Ethnic Group for this alphabet.`});	}
																														
																														return config.response(res , 200 , entryResult);		});				}

			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});			}

			else {	return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});		}
} , 

	'nameByAnimal' : (req , res , next) => {	ethnic = req.params.ethnic , alphabet = req.params.alphabet;

		if (req.params && req.params.ethnic) {

					async.parallel({
														'Eyon' : (callback) => {
																													Eyon.findOne({'_id' : ethnic})
																																													.lean({})
																																																		.select('_id')
																																																										.exec(callback);		} ,

														'Alphabet' : (callback) => {
																													Alphabet.findOne({'_id' : alphabet})
																																															.lean({})
																																																				.select('_id')
																																																												.exec(callback);		} ,
														'Specie' : (callback) => {
																													Specie.findOne({'_id' : 'Animal'})
																																															.lean({})
																																																				.select('_id')
																																																												.exec(callback);	}
			} , (err , result) => {
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																	if (!result.Alphabet) {
																														return config.response(res , 404 , {'message' : `Alphabet entry does not exists in the record or is not available.`});		}
																						if (result) {	
																														$alphabet = result.Alphabet , $eyon = result.Eyon , $specie = result.Specie;

						Name.find({'ethnic_group' : $eyon._id , 'specie' : $specie._id , 'alphabet' : $alphabet._id })
																																																						.lean({})

																																																						.select('name gender -_id')

																																																						.exec((err , entryResult) => {
														if (err) {
																														return config.errResponse(res , 400 , err);		}
														if (entryResult.length == 0) {
																														return config.response(res , 404 , {'message' : `Animal Name entries not available for this Ethnic Group for this alphabet.`});	}
																														
																														return config.response(res , 200 , entryResult);		});				}
			
			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});			}
			
			else {	return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});		}
	} , 

	'nameByPlant' : (req , res , next) => {		ethnic = req.params.ethnic , alphabet = req.params.alphabet;

		if (req.params && req.params.ethnic) {

					async.parallel({
														'Eyon' : (callback) => {
																													Eyon.findOne({'_id' : ethnic})
																																													.lean({})
																																																		.select('_id')
																																																										.exec(callback);		} ,

														'Alphabet' : (callback) => {
																													Alphabet.findOne({'_id' : alphabet})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,
														'Specie' : (callback) => {
																													Specie.findOne({'_id' : 'Plant'})
																																														.lean({})
																																																			.select('_id')
																																																											.exec(callback);	}
			} , (err , result) => {
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																	if (!result.Alphabet) {
																														return config.response(res , 404 , {'message' : `Alphabet entry does not exists in the record or is not available.`});		}
																						if (result) {	
																														$alphabet = result.Alphabet , $eyon = result.Eyon , $specie = result.Specie;

						Name.find({'ethnic_group' : $eyon._id , 'specie' : $specie._id , 'alphabet' : $alphabet._id})
																																																					.lean({})

																																																					.select('name -_id')

																																																					.exec((err , entryResult) => {
														if (err) {
																														return config.errResponse(res , 400 , err);		}
														if (entryResult.length == 0) {
																														return config.response(res , 404 , {'message' : `Plant Name entries not available for this Ethnic Group for this alphabet.`});	}
																														
																														return config.response(res , 200 , entryResult);		});				}
			
			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});			}
			
			else {	return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});		}
	} , 

	'nameEthnicByHuman' : (req , res , next) => {		ethnic = req.params.ethnic;

		if (req.params && req.params.ethnic) {

					async.parallel({
														'Eyon' : (callback) => {
																													Eyon.findOne({'_id' : ethnic})
																																													.lean({})
																																																		.select('_id')
																																																										.exec(callback);		} ,
														'Specie' : (callback) => {
																													Specie.findOne({'_id' : 'Human'})
																																														.lean({})
																																																			.select('_id')
																																																											.exec(callback);	}
			} , (err , result) => {
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																						if (result) {		
																														eyon = result.Eyon , specie = result.Specie;

				Name.find({'ethnic_group' : eyon._id , 'specie' : specie._id })
																																				.lean({})

																																				.exec((err , entryResult) => {
																											if (err) {
																																											return config.errResponse(res , 400 , err);		}
																											if (entryResult.length == 0) {
																																											return config.response(res , 404 , {'message' : `Name entries not available for this Ethnic Group.`});	}

																																											return config.response(res , 200 , entryResult);			});			}
				
				else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});		}

				else {	return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});		}
} , 

	'nameEthnicByAnimal' : (req , res , next) => {	ethnic = req.params.ethnic;

		if (req.params && req.params.ethnic) {

					async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.findOne({'_id' : ethnic})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,
																	'Specie' : (callback) => {
																																Specie.findOne({'_id' : 'Animal'})
																																																		.lean({})
																																																							.select('_id')
																																																															.exec(callback);	}
			} , (err , result) => {
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																						if (result) {		
																														eyon = result.Eyon , specie = result.Specie;

				Name.find({'ethnic_group' : eyon._id , 'specie' : specie._id})
																																				.lean({})

																																				.exec((err , entryResult) => {
																											if (err) {
																																											return config.errResponse(res , 400 , err);		}
																											if (entryResult.length == 0) {
																																											return config.response(res , 404 , {'message' : `Animal name entries not available for this Ethnic Group.`});	}

																																											return config.response(res , 200 , entryResult);			});			}
				
				else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});		}

				else {	return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});		}
	} , 

	'nameEthnicByPlant' : (req , res , next) => {		ethnic = req.params.ethnic;

		if (req.params && req.params.ethnic) {

					async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.findOne({'_id' : ethnic})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,
																	'Specie' : (callback) => {
																																Specie.findOne({'_id' : 'Plant'})
																																																	.lean({})
																																																						.select('_id')
																																																														.exec(callback);	}
			} , (err , result) => {
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																						if (result) {		
																														eyon = result.Eyon , specie = result.Specie;

				Name.find({'ethnic_group' : eyon._id , 'specie' : specie._id })
																																				.lean({})

																																				.exec((err , entryResult) => {
																											if (err) {
																																											return config.errResponse(res , 400 , err);		}
																											if (entryResult.length == 0) {
																																											return config.response(res , 404 , {'message' : `Plant name entries not available for this Ethnic Group.`});	}

																																											return config.response(res , 200 , entryResult);			});			}
				
				else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});		}

				else {	return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});		}
	} , 
		
	'nameDetail' : (req , res , next) => {	name = req.params.name , ethnic = req.body.ethnic;

		if (req.params && req.params.name) {

					async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.findOne({'_id' : ethnic})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,
																	'Specie' : (callback) => {
																																Specie.findOne({'_id' : 'Human'})
																																																	.lean({})
																																																						.select('_id')
																																																														.exec(callback);	}
			} , (err , result) => {
																							if (err) {
																														return config.errResponse(res , 400 , err);		}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																						if (result) {
																														$eyon = result.Eyon , $specie = result.Specie;

						Name.findOne({'name' : name , 'ethnic_group' : $eyon._id , 'specie' : $specie._id })
																																																	.lean({})

																																																	.exec((err , entryResult) => {
																							if (err) {
																															return config.errResponse(res , 400 , err);		}
																			if (!entryResult) {
																															return config.response(res , 404 , {'message' : `Name entry does not exists in the record or is not available for this Ethnic Group.`});	}

																															return config.response(res , 200 , entryResult);		});		}
			
			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});		}

			else {	return config.response(res , 404 , {'message' : `No Name id provided. Please provide a valid Name id.`});		}

	} , 

	'nameAnimalDetail' : (req , res , next) => {	name = req.params.name , ethnic = req.body.ethnic;

		if (req.params && req.params.name) {

					async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.findOne({'_id' : ethnic})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,
																	'Specie' : (callback) => {
																																Specie.findOne({'_id' : 'Animal'})
																																																		.lean({})
																																																							.select('_id')
																																																															.exec(callback);	}
			} , (err , result) => {
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																						if (result) {
																														$eyon = result.Eyon , $specie = result.Specie;

						Name.findOne({'name' : name , 'ethnic_group' : $eyon._id , 'specie' : $specie._id })
																																																	.lean({})

																																																	.select('-baby -_id')

																																																	.exec((err , entryResult) => {
																							if (err) {
																															return config.errResponse(res , 400 , err);		}
																			if (!entryResult) {
																															return config.response(res , 404 , {'message' : `Animal Name entry does not exists in the record or is not available for this Ethnic Group.`});	}

																															return config.response(res , 200 , entryResult);		});		}
			
			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});		}

			else {	return config.response(res , 404 , {'message' : `No Name id provided. Please provide a valid Name id.`});		}
	} , 

	'namePlantDetail' : (req , res , next) => {	name = req.params.name , ethnic = req.body.ethnic;

		if (req.params && req.params.name) {

					async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.findOne({'_id' : ethnic})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,
																	'Specie' : (callback) => {
																																Specie.findOne({'_id' : 'Plant'})
																																																	.lean({})
																																																						.select('_id')
																																																														.exec(callback);	}
			} , (err , result) => {
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																						if (result) {
																														$eyon = result.Eyon , $specie = result.Specie;

						Name.findOne({'name' : name , 'ethnic_group' : $eyon._id , 'specie' : $specie._id })
																																																	.lean({})

																																																	.select('-baby -_id')

																																																	.exec((err , entryResult) => {
																							if (err) {
																															return config.errResponse(res , 400 , err);		}
																			if (!entryResult) {
																															return config.response(res , 404 , {'message' : `Plant Name entry does not exists in the record or is not available for this Ethnic Group.`});	}

																															return config.response(res , 200 , entryResult);		});		}
			
			else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});		}

			else {	return config.response(res , 404 , {'message' : `No Name id provided. Please provide a valid Name id.`});		}

	} , 

	'nameAdd' : (req , res , next) => {
		
			async.parallel({
												'Eyon' : (callback) => {
																										Eyon.find({})
																																	.lean({})
																																						.select('_id')
																																														.hint({'_id' : 1 })
																																																								.exec(callback);		} ,
											'Region' : (callback) => {
																										Region.find({})
																																		.lean({})
																																							.select('_id')
																																															.hint({'_id' : 1 })
																																																									.exec(callback);	} ,
											'Continent' : (callback) => {
																										Continent.find({})
																																				.lean({})
																																									.select('_id')
																																																	.hint({'_id' : 1 })
																																																											.exec(callback);	} ,
											'Alphabet' : (callback) => {
																										Alphabet.find({})
																																			.lean({})
																																								.select('_id')
																																																.hint({'_id' : 1 })
																																																										.exec(callback);		} ,
												'Gender' : (callback) => {
																										Gender.find({})
																																		.lean({})
																																							.select('_id')
																																															.hint({'_id' : 1 })
																																																									.exec(callback);		} ,
												'Specie' : (callback) => {
																										Specie.find({})
																																		.lean({})
																																							.select('_id')
																																															.hint({'_id' : 1 })
																																																									.exec(callback);		} ,
													'Baby' : (callback) => {
																										Baby.find({})
																																	.lean({})
																																						.select('_id')
																																														.hint({'_id' : 1 })
																																																								.exec(callback);		}
			} , (err , result) => {
																				if (err) {
																											return config.errResponse(res , 400 , err);		}
																		if (!result) {
																											return config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});		}
										if (result.Eyon.length == 0) {
																											return config.response(res , 404 , {'message' : `Ethnic Group entries does not exists in the record or is not available.`});		}
									if (result.Region.length == 0) {
																											return config.response(res , 404 , {'message' : `Region entries does not exists in the record or is not available.`});					}
								if (result.Continent.length == 0) {
																											return config.response(res , 404 , {'message' : `Continent entries does not exists in the record or is not available.`});				}
								if (result.Alphabet.length == 0) {
																											return config.response(res , 404 , {'message' : `Alphabet entries does not exists in the record or is not available.`});				}
									if (result.Gender.length == 0) {
																											return config.response(res , 404 , {'message' : `Gender entries does not exists in the record or is not available.`});					}
									if (result.Specie.length == 0) {
																											return config.response(res , 404 , {'message' : `Specie entries does not exists in the record or is not available.`});					}
										if (result.Baby.length == 0) {
																											return config.response(res , 404 , {'message' : `Baby entries does not exists in the record or is not available.`});						}

																											return config.response(res , 200 , result);			});
	} , 

	'nameAddSubmit' : (req , res , next) => {	name = new Name(req.body);

			name.save((err , entryResult) => {
																					if (err) {
																											return config.errResponse(res , 400 , err);				 }

																											return config.response(res , 200 , entryResult);		})
	} , 

	'nameUpdate' : (req , res , next) => {	name = req.params.name , ethnic = req.body.ethnic , specie = req.body.specie;

		async.parallel({
												'Eyon' : (callback) => {
																										Eyon.find({})
																																	.lean({})
																																						.select('_id')
																																														.hint({'_id' : 1 })
																																																								.exec(callback);		} ,
												'Region' : (callback) => {
																										Region.find({})
																																		.lean({})
																																							.select('_id')
																																															.hint({'_id' : 1 })
																																																									.exec(callback);	} ,
											'Continent' : (callback) => {
																										Continent.find({})
																																				.lean({})
																																									.select('_id')
																																																	.hint({'_id' : 1 })
																																																											.exec(callback);	} ,
											'Alphabet' : (callback) => {
																										Alphabet.find({})
																																			.lean({})
																																								.select('_id')
																																																.hint({'_id' : 1 })
																																																										.exec(callback);		} ,
												'Gender' : (callback) => {
																										Gender.find({})
																																		.lean({})
																																							.select('_id')
																																															.hint({'_id' : 1 })
																																																									.exec(callback);		} ,
												'Specie' : (callback) => {
																										Specie.find({})
																																		.lean({})
																																							.select('_id')
																																															.hint({'_id' : 1 })
																																																									.exec(callback);		} ,
												'Baby' : (callback) => {
																										Baby.find({})
																																	.lean({})
																																						.select('_id')
																																														.hint({'_id' : 1 })
																																																								.exec(callback);		} ,
												'eEyon' : (callback) => {
																										Eyon.findOne({'_id' : ethnic})
																																										.lean({})
																																															.select('_id')
																																																							.hint({'_id' : 1 })
																																																																	.exec(callback);	} ,
											'eSpecie' : (callback) => {
																										Specie.findOne({'_id' : specie})
																																											.lean({})
																																																.select('_id')
																																																								.hint({'_id' : 1 })
																																																																		.exec(callback);	} 
			} , (err , result) => {
																				if (err) {
																											return config.errResponse(res , 400 , err);		}
																		if (!result) {
																											return config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});		}
										if (result.Eyon.length == 0) {
																											return config.response(res , 404 , {'message' : `Ethnic Group entries does not exists in the record or is not available.`});		}
									if (result.Region.length == 0) {
																											return config.response(res , 404 , {'message' : `Region entries does not exists in the record or is not available.`});					}
								if (result.Continent.length == 0) {
																											return config.response(res , 404 , {'message' : `Continent entries does not exists in the record or is not available.`});				}
								if (result.Alphabet.length == 0) {
																											return config.response(res , 404 , {'message' : `Alphabet entries does not exists in the record or is not available.`});				}
									if (result.Gender.length == 0) {
																											return config.response(res , 404 , {'message' : `Gender entries does not exists in the record or is not available.`});					}
									if (result.Specie.length == 0) {
																											return config.response(res , 404 , {'message' : `Specie entries does not exists in the record or is not available.`});					}
										if (result.Baby.length == 0) {
																											return config.response(res , 404 , {'message' : `Baby entries does not exists in the record or is not available.`});						}			
															if (!result.eEyon) {
																											return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});			}
														if (!result.eSpecie) {
																											return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});						}
																		if (result) {
																										 eyon = result.eEyon , fResult = result , specie = result.eSpecie;

						Name.findOne({'name' : name , 'ethnic_group' : eyon._id , 'specie' : specie._id})
																																															.lean({})

																																															.exec((err , entryResult) => {
																					if (err) {
																																	return config.errResponse(res , 400 , err);		}
																					if (!entryResult) {
																																	return config.response(res , 404 , {'message' : `Name entry does not exists in the record or is not available.`});	}
																fResult.Name = entryResult;
																																	return config.response(res , 200 , fResult);		});		}
		else {
						return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});
	} , 

	'nameUpdateSubmit' : (req , res , next) => {	nValue = req.body , name = req.params.name , ethnic = req.body.prevEthnic , specie = req.body.prevSpecie;
							
							async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.findOne({'_id' : ethnic})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,
																	'Specie' : (callback) => {
																																Specie.findOne({'_id' : specie})
																																																	.lean({})
																																																						.select('_id')
																																																														.exec(callback);	}
									} , (err , result) => {	
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																						if (result) {
																														$eyon = result.Eyon , $specie = result.Specie;

					Name.findOneAndUpdate({'name' : name , 'ethnic_group' : $eyon._id , 'specie' : $specie._id } , {'$set' : nValue} , {'new' : true})
																																																																							.lean({})

																																																																							.exec((err , entryResult) => {
																							if (err) {																
																													return config.errResponse(res , 400 , err);		}

																													return config.response(res , 201 , entryResult);		});		}

					else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});		}		});
	} , 

	'nameDelete' : (req , res , next) => {	name = req.params.name , ethnic = req.body.ethnic , specie = req.body.specie;

							async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.findOne({'_id' : ethnic})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,
																	'Specie' : (callback) => {
																																Specie.findOne({'_id' : specie})
																																																	.lean({})
																																																						.select('_id')
																																																														.exec(callback);	}
									} , (err , result) => {	
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																						if (result) {
																														$eyon = result.Eyon , $specie = result.Specie;

				Name.findOne({'name' : name , 'ethnic_group' : $eyon._id , 'specie' : $specie._id })
																																															.lean({})

																																															.select('name ethnic_group specie -_id')
																																															
																																															.exec((err , entryResult) => {
																					if (err) {
																																	return config.errResponse(res , 400 , err);		}
																					if (!entryResult) {
																																	return config.response(res , 404 , {'message' : `Name entry does not exists in the record or is not available.`});	}

																																	return config.response(res , 200 , entryResult);		});		}		});  
		} , 

	'nameDeleteSubmit' : (req , res , next) => {	name = req.params.name , ethnic = req.body.ethnic , specie = req.body.specie;

					async.parallel({
																	'Eyon' : (callback) => {
																																Eyon.findOne({'_id' : ethnic})
																																																.lean({})
																																																					.select('_id')
																																																													.exec(callback);		} ,
																	'Specie' : (callback) => {
																																Specie.findOne({'_id' : specie})
																																																	.lean({})
																																																						.select('_id')
																																																														.exec(callback);	}
									} , (err , result) => {	
																							if (err) {
																														return config.errResponse(res , 400 , err);	}
																					if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																			if (!result.Eyon) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (!result.Specie) {
																														return config.response(res , 404 , {'message' : `Specie entry does not exists in the record or is not available.`});		}
																					if (result) {
																													$eyon = result.Eyon , $specie = result.Specie;

				Name.findOneAndDelete({'name' : name , 'ethnic_group' : $eyon._id , 'specie' : $specie._id })
																																																			.lean({})

																																																			.select('name -_id')
																																																			
																																																			.exec((err , entryResult) => {
																									if (err) {
																																return config.errResponse(res , 400 , err);		}
																					if (!entryResult) {
																																return config.response(res , 404 , {'message' : `Name entry does not exists in the record or is not available.`});	}

																																return config.response(res , 204 , {'message' : `Entry successfully removed from the record.`});		});	}
				else {
								config.response(res , 404 , {'message' : `An error has occured. Please try again.`});			}		});
	} , 

	'nameVote' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Vote a Name' });
	} 

}	
