var ethnic = '' , async = require('async') , Name = require('../models/name') , Dress = require('../models/dress') , War = require('../models/war') ,

Food = require('../models/food') , Life = require('../models/life') , Festival = require('../models/festival') , History = require('../models/history') , Religion = require('../models/religion') ,

Mythology = require('../models/mythology') , Law = require('../models/law') , Legend = require('../models/legend') , Folktale = require('../models/folktale') , Proverb = require('../models/proverb') , 

Video = require('../models/video') , Book = require('../models/book') , Country = require('../models/country') , Gender = require('../models/gender') ,

Alphabet = require('../models/alphabet')  , Baby = require('../models/baby') , Eyon = require('../models/eyon') , Specie = require('../models/specie') , Century = require('../models/century') ,

Individual = require('../models/individual') , Region = require('../models/region') , Photo = require('../models/photo') , Genre = require('../models/genre') , Continent = require('../models/continent') ,

Sound = require('../models/sound') , config = require('../config/config') , art = '' , country = '';

var Art = require('../../app_api/models/models').Art;

module.exports = {

	'art' : (req , res , next) => {

			Art.find({})
										.exec((err , artResult) => {
																									if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																							if (artResult.length == 0) {
																																							config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																	return false;	}
																																							config.response(res , 200 , artResult);																		});
	} , 	

	'book' : (req , res , next) => {

			Book.find({})
										.exec((err , bookResult) => {
																									if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																									if (bookResult)	 {
																																							config.response(res , 200 , bookResult);		}	
																							if (bookResult.length == 0) {
																																							config.response(res , 200 , {'message' : 'You have no entries in this category.'});
																																																																																	return false;	}

																																																									});
	} , 	

	'dress' : (req , res , next) => {

			Dress.find({})
										.exec((err , dressResult) => {
																										if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																								if (dressResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																		return false;	}
																																								config.response(res , 200 , dressResult);																	});
	} , 	

	'festival' : (req , res , next) => {

			Festival.find({})
												.exec((err , festivalResult) => {
																													if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;	}
																									if (festivalResult.length == 0) {
																																											config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																					return false;	}
																																											config.response(res , 200 , festivalResult);													});
	} , 	

	'folktale' : (req , res , next) => {

			Folktale.find({})
												.exec((err , folktaleResult) => {
																													if (err) {
																																									config.compiledError(res , 400 , err);
																																																													return false;	}
																							if (folktaleResult.length == 0) {
																																									config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																			return false;	}
																																									config.response(res , 200 , folktaleResult);																});
	} , 	

	'food' : (req , res , next) => {

			Food.find({})
										.exec((err , foodResult) => {
																									if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																							if (foodResult.length == 0) {
																																							config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																	return false;	}
																																							config.response(res , 200 , foodResult);																		});
	} , 	

	'history' : (req , res , next) => {

			History.find({})
											.exec((err , historyResult) => {
																												if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;	}
																									if (historyResult.length == 0) {
																																										config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																				return false;	}
																																										config.response(res , 200 , historyResult);															});
	} , 	

	'individual' : (req , res , next) => {

			Individual.find({})
													.exec((err , individualResult) => {
																															if (err) {
																																													config.compiledError(res , 400 , err);
																																																																	return false;	}
																											if (individualResult.length == 0) {
																																													config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																							return false;	}
																																													config.response(res , 200 , individualResult);												});
	} , 	

	'law' : (req , res , next) => {

			Law.find({})
										.exec((err , lawResult) => {
																									if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																							if (lawResult.length == 0) {
																																							config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																	return false;	}
																																							config.response(res , 200 , lawResult);																		});
	} , 	

	'legend' : (req , res , next) => {

			Legend.find({})
											.exec((err , legendResult) => {
																											if (err) {
																																									config.compiledError(res , 400 , err);
																																																													return false;	}
																									if (legendResult.length == 0) {
																																									config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																			return false;	}
																																									config.response(res , 200 , legendResult);																	});
	} , 	

	'life' : (req , res , next) => {

			Life.find({})
										.exec((err , lifeResult) => {
																									if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																							if (lifeResult.length == 0) {
																																							config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																	return false;	}
																																							config.response(res , 200 , lifeResult);																		});
	} , 	

	'mythology' : (req , res , next) => {

			Mythology.find({})
												.exec((err , mythologyResult) => {
																														if (err) {
																																												config.compiledError(res , 400 , err);
																																																																return false;	}
																										if (mythologyResult.length == 0) {
																																												config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																						return false;	}
																																												config.response(res , 200 , mythologyResult);												});
	} , 	

	'name' : (req , res , next) => {

			Name.find({})
										.exec((err , nameResult) => {
																									if (err) {
																																							config.compiledError(res , 400 , err);
																																																											return false;	}
																							if (nameResult.length == 0) {
																																							config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																	return false;	}
																																							config.response(res , 200 , nameResult);																		});
	} , 	

	'photo' : (req , res , next) => {

			Photo.find({})
										.exec((err , photoResult) => {
																										if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																								if (photoResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																		return false;	}
																																								config.response(res , 200 , photoResult);																		});
	} , 	

	'proverb' : (req , res , next) => {

			Proverb.find({})
											.exec((err , proverbResult) => {
																												if (err) {
																																										config.compiledError(res , 400 , err);
																																																														return false;	}
																									if (proverbResult.length == 0) {
																																										config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																				return false;	}
																																										config.response(res , 200 , proverbResult);																});
	} , 	

	'religion' : (req , res , next) => {

			Religion.find({})
												.exec((err , religionResult) => {
																													if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;	}
																									if (religionResult.length == 0) {
																																											config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																					return false;	}
																																											config.response(res , 200 , religionResult);															});
	} , 	

	'sound' : (req , res , next) => {

			Sound.find({})
										.exec((err , soundResult) => {
																										if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																								if (soundResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																		return false;	}
																																								config.response(res , 200 , soundResult);																		});
	} , 	

	'video' : (req , res , next) => {

			Video.find({})
										.exec((err , videoResult) => {
																										if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																								if (videoResult.length == 0) {
																																								config.response(res , 404 , {'message' : 'You have no entries in this category.'});
																																																																																		return false;	}
																																								config.response(res , 200 , videoResult);																		});
	} , 	

	
}				