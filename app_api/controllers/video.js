var ethnic = '' , alpha = '' , async = require('async') , Eyon = require('../models/eyon') , Country = require('../models/country') , Century = require('../models/century') , Specie = require('../models/specie') ,

Video = require('../models/video') , Genre = require('../models/genre') ,  Continent = require('../models/continent') , Region = require('../models/region') , config = require('../config/config') ,

vValue = '' , vParam = '' , video = '' , ethnic = '' , eyonId = '' , countryId = '' , country = '' , vConfig = require('../config/deleteObject/videoObject');

module.exports = {

	'videoName' : (req , res) => {		video = req.params.video;
	
		Video.findOne({'url' : new RegExp(video, 'i')})
																										.exec((err , videoResult) => {

																														if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;	}
																														if (!videoResult) {
																																								config.response(res , 404 , {'message' : 'Video entry does not exist in the record or or is not available.'});
																																																																																																return false;	}
																																								config.response(res , 200 , videoResult);						});
	} ,

	'videos' : (req , res , next) => {

		Video.find({})
									.exec((err , videoResult) => {
																										if (err) {
																																				config.compiledError(res , 400 , err);
																																																								return false;		}
																				if (videoResult.length == 0) {
																																				config.response(res , 404 , {'message' : 'Video entries does not exist in the record or is not available.'});
																																																																																											return false;		}
																																				config.response(res , 200 , videoResult);									});
	} , 

	'videoEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

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

			Video.find({'ethnic_group' : eyonId._id})
																								.exec((err , videoResult) => {
																																								if (err) {
																																															config.compiledError(res , 400 , err);
																																																																					return false;		}
																															if (videoResult.length == 0) {
																																															config.response(res , 404 , {'message' : 'No video entries available for this ethnic group.'});
																																																																																															return false;	}
																																															config.response(res , 200 , videoResult);				})		}			});
	} ,

	'videoCountry' : (req , res , next) => {	country = req.params.country;

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

			Video.find({'country' : countryId._id})
																							.exec((err , videoResult) => {
																																							if (err) {
																																																config.compiledError(res , 400 , err);
																																																																						return false;		}
																																if (videoResult.length == 0) {
																																																config.response(res , 404 , {'message' : 'No video entries available for this country or state.'});
																																																																																																		return false;	}
																																																config.response(res , 200 , videoResult);			})	}		});
	} ,
		
	'videoDetail' : (req , res , next) => {	video = req.params.video;

		if (req.params && req.params.video) {
			
			Video.findOne({'url' : new RegExp(video , 'i')})
																												.exec((err , videoResult) => {

																													if (err) {
																																								config.compiledError(res , 400 , err);
																																																												return false;		}
																													if (!videoResult) {
																																								config.response(res , 404 , {'message' : 'Video entry does not exist in the record or is not available.'});
																																																																																															return false;		}
																																								config.response(res , 200 , videoResult);		})		}		
				else {
								config.response(res , 404 , {'message' : 'No Video id provided. Please provide a valid video id.'});			}
	} , 

	'videoAdd' : (req , res , next) => {		
		
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
																											config.response(res , 200 , result);			});
	} , 

'videoAddSubmit' : (req , res , next) => {	video = new Video(req.body);

		video.save((err , videoResult) => {
																					if (err) {
																													config.compiledError(res , 400 , err);
																																																	return false;		}	
																						else {
																													config.response(res , 200 , videoResult);		}			});
	} , 

	'videoUpdate' : (req , res , next) => {		video = req.params.video;

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

																									'Video' : (callback) => {
																																											Video.findOne({'url' : new RegExp(video , 'i')})
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
															if (!result.Video) {
																											config.response(res , 404 , {'message' : 'Video entry does not exist in the record or is not available.'});
																																																																																	return false;		}
																											config.response(res , 200 , result);		});
	} , 

	'videoUpdateSubmit' : (req , res , next) => {	vValue = req.body , video = req.params.video;

				if (req.params && req.params.video) {

				Video.findOne({'url' : new RegExp(video , 'i')} , (err , video) => {	if (!video) {	return config.response(res , 404 , {'message' : 'Video entry does not exist in the record or is not available.'});	}
				
				Video.findOneAndUpdate({'url' : new RegExp(video , 'i')} ,

								{'$set' : vValue} , {'new' : true , 'runValidators' : true} , (err , videoResult) => {
																																																				if (err) {																																													
																																																										config.compiledError(res , 400 , err);
																																																																															return false;	}
																																																										config.response(res , 201 , videoResult);										});		});
			} else {
								config.response(res , 404 , {'message' : 'No video id provided. Please provide a valid video id.'});		}
	} , 

	'videoDelete' : (req , res , next) => {	video = req.params.video;
		
		if (req.params.video) {

			Video.findOne({'url' : new RegExp(video , 'i')} , (err , video) => {

				if (!video) {	return config.response(res , 404 , {'message' : 'Video entry does not exist in the record or is not available.'});	}

						if (video.video_detail.location != null && video.video_detail.location != undefined) {
										
										vConfig.delete(video.video_detail.location);

												video.remove((err , videoResult) => {
																															if (err) {
																																					config.compiledError(res , 400 , err);
																																																									return false;		}

																																					config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});			})	}
																			else {
																							video.remove((err , videoResult) => {
																																										if (err) {
																																																config.compiledError(res , 400 , err);
																																																																				return false;		}

																																												return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})		}			});			
			}	else {
								config.response(res , 404 , {'message' : 'No video id provided. Please provide a valid video id.'});		}
	} ,

	'videoVote' : (req , res , next) => { vValue = req.params.video

		Video.findOne({'url' : vValue } , (err, video) => {
					
					if (video) {														
												video.vote = video.vote + 1;
	
						video.save((err , videoResult) => {
																								if (err) {
																														config.compiledError(res , 400 , err);
																																																		return false;		} 
																									else {
																														res.json({'vote' : videoResult.vote });			}				});		}			});	
		} ,

	'objectDelete' : (req , res , next) => {	video = req.params.object;

		if (video) {
														vConfig.objectDelete(req , res , video);
																																	
			}	else {
								config.response(res , 404 , {'message' : 'No video id provided. Please provide a valid video id.'});		}
		
	} 
	
}				