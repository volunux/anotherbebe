var async = require('async') , config = require('../config/config') , ethnic = '' , article = '' , $articleBody = '' , country = '' , $models = require('../models/models');

const Eyon = require('../models/models').Eyon;

const Country = require('../models/models').Country;

const Century = require('../models/models').Century;

const Continent = require('../models/models').Continent;

const Region = require('../models/models').Region;

const Upload = require('../models/models').Upload;

var postS3 = require('../../app_server/config/buckets/s3/postS3') , aws = require('aws-sdk');

aws.config.update(postS3);

var s3 = new aws.S3();

module.exports = ($ModelName , $ModelType) => {

			const $Model = $models[$ModelName];

	return {

	'entryAll' : (req , res , next) => {

			$Model.find({})	.lean({})

											.hint({'slug' : 1})

											.limit(20)

											.select(`title country ethnic_group slug -_id`)

											.exec((err , entryResult) => {

																				if (err) {
																																	return config.errResponse(res , 400 , err);			}
																	if (entryResult.length == 0) {
																																	return config.response(res , 404 , {'message' : `${$ModelType} entries does not exists in the record or is not available.`});		}

																																	return config.response(res , 200 , entryResult);				});
	} ,

	'entryInfo' : (req , res , next) => {	article = req.params.article;
	
			if (req.params && req.params.article) {

			$Model.findOne({'slug' : article })
																					.lean({})

																					.select(`title slug -_id`)

																					.exec((err , entryResult) => {

																							if (err) {
																																			return config.errResponse(res , 400 , err);		}
																							if (!entryResult) {
																																			return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
																																		
																																			return config.response(res , 200 , entryResult);		})		}
			else {
							return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
	} ,

	'entryEthnicList' : (req , res , next) => {

		Eyon.find({})
									.lean({})

									.select('_id')

									.exec((err , eyonResult) => {

																			if (err) {
																																			return config.errResponse(res , 400 , err);	}
																			if (eyonResult.length == 0) {
																																			return config.response(res , 404 , {'message' : `Ethnic Group entries does not exists in the record or is not available.`});		}

																																			return config.response(res , 200 , eyonResult);			});
	} ,

	'entryCountryList' : (req , res , next) => {	
			
		Country.find({})
										.lean({})

										.select('_id')

										.exec((err , countryResult) => {

																			if (err) {
																																					return config.errResponse(res , 400 , err);		}
																			if (countryResult.length == 0) {
																																					return config.response(res , 404 , {'message' : `Country entries does not exists in the record or is not available.`});		}

																																					return config.response(res , 200 , countryResult);				});
	} ,

	'entryCountry' : (req , res , next) => {	country = req.params.country.split('-').join(' ');

		if (req.params && req.params.country) {

							async.parallel({
																	'Country' : (callback) => {
																																Country.findOne({'_id' : country })
																																																		.lean({})
																																																							.select('_id')
																																																															.exec(callback);		}
			} , (err , result) => {
																	if (err) {
																													return config.errResponse(res , 400 , err);			}
																	if (!result) {
																													return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																	if (!result.Country) {
																													return config.response(res , 404 , {'message' : `Country entry does not exists in the record or is not available.`});		} 	
																	if (result.Country) {
																													$country = result.Country;

		$Model.find({'country' : $country._id})			.lean({})

																								.limit(20)

																								.select(`title country ethnic_group slug -_id`)

																								.hint({'country' : 1})

																								.exec((err , entryResult) => {

																															if (err) {
																																								return config.errResponse(res , 400 , err);			}
																								if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : `No ${$ModelType} entries available for this Country or State.`});			}

																																								return config.response(res , 200 , entryResult);				})		}

		else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});			}			});		} 
		
		else {	return config.response(res , 404 , {'message' : `No Country id provided. Please provide a valid Country id.`});			}
	} ,

	'entryEthnic' : (req , res , next) => {	ethnic = req.params.ethnic.split('-').join(' ');

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
																												return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																	if (!result.Eyon) {
																												return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		} 	
																	if (result.Eyon) {
																												$eyon = result.Eyon;

		$Model.find({'ethnic_group' : $eyon._id})		.lean({})

																								.limit(20)

																								.select(`title country ethnic_group slug -_id`)

																								.hint({'ethnic_group' : 1})

																								.exec((err , entryResult) => {

																															if (err) {
																																								return config.errResponse(res , 400 , err);			}
																								if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : `No ${$ModelType} entries available for this Ethnic Group.`});			}

																																								return config.response(res , 200 , entryResult);				})		}
	
		else {	return config.response(res , 404 , {'message' : `An error has occured. Please try again.`});			}			});		} 
		
		else {	return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});			}
	} ,
		
	'entryDetail' : (req , res , next) => {	article = req.params.article;

		if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article})																											.lean({})

												.populate({'path' : 'author' , 'select' : 'full_name -_id'})					.lean({})

												.populate({'path' : 'votes' , 'select' : 'votes voters -_id'})				.lean({})

												.select(`title main_body author votes century continent region country ethnic_group slug -_id`)

												.exec((err , entryResult) => {
																												
																					if (err) {
																															return config.errResponse(res , 400 , err);		}
																				if (!entryResult) {
																															return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
																															
																															return config.response(res , 200 , entryResult);		})	}		
		
		else {	return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}
	} , 

	'entryAdd' : (req , res , next) => {		
		
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
																	'Century' : (callback) => {
																																	Century.find({})
																																									.lean({})
																																														.select('_id')
																																																						.hint({'_id' : 1 })
																																																																.exec(callback);		} ,
						} , (err , result) => {	

															if (err) {
																											return config.errResponse(res , 400 , err);		}
															if (!result) {
																											return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
										if (result.Eyon.length == 0) {
																											return config.response(res , 404 , {'message' : `Ethnic Group entries does not exists in the record or is not available.`});		}
								if (result.Country.length == 0) {
																											return config.response(res , 404 , {'message' : `Country entries does not exists in the record or is not available.`});				}
							if (result.Continent.length == 0) {
																											return config.response(res , 404 , {'message' : `Continent entries does not exists in the record or is not available.`});				}
								if (result.Region.length == 0) {
																											return config.response(res , 404 , {'message' : `Region entries does not exists in the record or is not available.`});					}
								if (result.Century.length == 0) {
																											return config.response(res , 404 , {'message' : `Century entries does not exists in the record or is not available.`});					}

																											return config.response(res , 200 , result);				});
	} , 

	'entryAddSubmit' : (req , res , next) => {		article = new $Model(req.body);
		
		article.save((err , entryResult) => {
																					if (err) {
																											return config.errResponse(res , 400 , err);			}	
																					else {
																											entryResult.photos.forEach((item) => {

												Upload.updateOne( {'Key' : item.Key } , { '$set' : {	'entry_slug' : entryResult.slug } } ).then((entryUpdate) => {

													console.log(entryUpdate);			

													return config.response(res , 200 , entryResult);	})		});		}				});
	} , 

	'entryUpdate' : (req , res , next) => {		article = req.params.article;

		if (req.params && req.params.article) {

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
																	'Century' : (callback) => {
																																	Century.find({})
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
																	[$ModelName] : (callback) => {
																																	$Model.findOne({'slug' : article})
																																																		.lean({})

																																																		.select(`title main_body country ethnic_group century region continent slug -_id`)

																																																		.exec(callback)		}	
			} , (err , result) => {	
																		if (err) {
																														return config.errResponse(res , 400 , err);			}
																				if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
												if (result.Eyon.length == 0) {
																														return config.response(res , 404 , {'message' : `Ethnic Group entries does not exists in the record or is not available.`});		}
											if (result.Country.length == 0) {
																														return config.response(res , 404 , {'message' : `Country entries does not exists in the record or is not available.`});					}
										if (result.Continent.length == 0) {
																														return config.response(res , 404 , {'message' : `Continent entries does not exists in the record or is not available.`});				}
											if (result.Region.length == 0) {
																														return config.response(res , 404 , {'message' : `Region entries does not exists in the record or is not available.`});					}
										if (result.Century.length == 0) {
																														return config.response(res , 404 , {'message' : `Century entries does not exists in the record or is not available.`});					}
														if (!result[$ModelName]) {
																														return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});			}

																														return config.response(res , 200 , result);			});		}

		else {	return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}
	} , 

	'entryUpdateSubmit' : (req , res , next) => {	$articleBody = req.body , article = req.params.article;

				if (req.params && req.params.article) {
																	
				$Model.findOneAndUpdate({'slug' : article} , {'$set' : $articleBody} , {'new' : true })
																																																.lean({})

																																																.populate({'path' : 'author' , 'select' : 'full_name -_id'})							.lean({})

																																																.select(`-_id title main_body author country ethnic_group century region continent slug`)

																																																.exec((err , entryResult) => {

																				if (err) {						return config.errResponse(res , 400 , err);			}

																				if (!entryResult) {		return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});	}

																				if (entryResult) {		return config.response(res , 201 , entryResult);	}		});		}
		
		else {	return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}
	} , 

	'entryDelete' : (req , res , next) => {	article = req.params.article;

		if (req.params && req.params.article) {

				$Model.findOne({'slug' : article })
																						.lean({})

																						.hint({'slug' : 1})

																						.select(`title slug -_id`)

																						.exec((err , entryResult) => {

																								if (err) {
																																				return config.errResponse(res , 400 , err);		}
																								if (!entryResult) {
																																				return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}

																																				return config.response(res , 200 , entryResult);		})		}

		else {	return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
	} , 

	'entryDeleteSubmit' : (req , res , next) => {	article = req.params.article;
		
		if (req.params && req.params.article) {
				
			$Model.findOneAndDelete({'slug' : article})
																								.lean({})

																								.hint({'slug' : 1})

																								.select('-_id slug')

																								.exec((err , entryResult) => {

																									if (err) {				return config.errResponse(res , 400 , err);			}

																							if (!entryResult) {		return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});	}

																							if (entryResult) {		return config.response(res , 204 , {'message' : `Entry successfully removed from the record.`});		}		});		}

		else {	return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}			
	} ,

	'entryDeleteSubmit1' : (req , res , next) => {	article = req.params.article;

		if (req.params && req.params.article) {
										
				$Model.findOneAndDelete({'slug' : article})
																										.lean({})

																										.hint({'slug' : 1})

																										.select(`slug photos -_id`)

																														.exec((err , entryResult) => {
																								if (err) {
																																			return config.errResponse(res , 400 , err);		}
																								if (!entryResult) {	
																																			return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
																							
																								if (entryResult && entryResult.photos.length != 0) {

				param1 = {'Bucket' : process.env.posts_bucket , 'Delete' : {
																																			'Objects' : entryResult.photos ,
																																																				'Quiet' : false } };

																s3.deleteObjects(param1 , (err, data) => {
																																						if (err) {
																																												console.log(err);	}
																																					if (data) {
																																											entryResult.photos.forEach((item) => {
															Upload.deleteOne({'Key' : item.Key})
																																	.exec((err , result) => {					
																																														if (err) {
																																																				console.log(err);		}

																																																				console.log(result);		}) });	}		});
													async.parallel({
																										'Comment' : (callback) => {
																																										$Model.deleteComments(entryResult.slug)
																																																															.exec(callback);			} ,
																										'Reply' : (callback) => {
																																										$Model.deleteReplies(entryResult.slug)
																																																															.exec(callback);			} ,
																										'Vote' : (callback) => {
																																										$Model.deleteVotes(entryResult.slug)
																																																															.exec(callback);			} ,
																										'commentVote' : (callback) => {
																																										$Model.deleteCommentVotes(entryResult.slug)
																																																															.exec(callback);			} ,
																										'replyVote' : (callback) => {
																																										$Model.deleteReplyVotes(entryResult.slug)
																																																															.exec(callback);			} ,
														} , (err , result) => {
																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (result) {
																																						return config.response(res , 204 , {'message' : `Entry successfully removed from the record.`});		} });			}
																								else if (entryResult) {
													async.parallel({
																										'Comment' : (callback) => {
																																										$Model.deleteComments(entryResult.slug)
																																																															.exec(callback);			} ,
																										'Reply' : (callback) => {
																																										$Model.deleteReplies(entryResult.slug)
																																																															.exec(callback);			} ,
																										'Vote' : (callback) => {
																																										$Model.deleteVotes(entryResult.slug)
																																																															.exec(callback);			} ,
																										'commentVote' : (callback) => {
																																										$Model.deleteCommentVotes(entryResult.slug)
																																																															.exec(callback);			} ,
																										'replyVote' : (callback) => {
																																										$Model.deleteReplyVotes(entryResult.slug)
																																																															.exec(callback);			} ,
														} , (err , result) => {
																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (result) {
																																						return config.response(res , 204 , {'message' : `Entry successfully removed from the record.`});		} });			}		})		}	
	
		else {	return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
	} , 
	
}

}