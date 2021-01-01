const async = require('async');

const Eyon = require('../models/models').Eyon;

const Country = require('../models/models').Country;

const Century = require('../models/models').Century;

const Continent = require('../models/models').Continent;

const Region = require('../models/models').Region;

const Legend = require('../models/models').Legend; 

const Genre = require('../models/models').Genre;

const Upload = require('../models/models').Upload;

const LegendComment = require('../models/models').LegendComment;

const LegendReply = require('../models/models').LegendReply;

const LegendCommentVote = require('../models/models').LegendCommentVote;

const LegendReplyVote = require('../models/models').LegendReplyVote;

const LegendVote = require('../models/models').LegendVote;

const config = require('../config/config');

const legendDelete = require('../config/deleteObject/photoObject');

const modelType = 'Legend';

var ethnic = '' , country = '' , legend = '' , pValue = '' , pParam = '' , eyonId = '' , countryId = '' , userVote = {'voted' : false , 'newVote' : '' };

module.exports = {

	'entryAll' : (req , res , next) => {

									Legend.find({})																										.lean({})

									.hint({'slug' : 1})

									.limit(20)
									
									.select(`-_id title ethnic_group country continent region century genre slug photo_detail.location`)

									.exec((err , entryResult) => {

																				if (err) {
																																				return config.errResponse(res , 400 , err);		}
																				if (entryResult.length == 0) {
																																				return config.response(res , 404 , {'message' : `${modelType} entries does not exists in the record or is not available.`});		}

																																				return config.response(res , 200 , entryResult);		});
	} , 

	'entryEthnicList' : (req , res , next) => {

		Eyon.find({})
									.lean({})

									.select('_id')

									.hint({'_id' : 1})

									.exec((err , entryResult) => {
																						
																			if (err) {
																																			return config.errResponse(res , 400 , err);	}
																		if (entryResult.length == 0) {
																																			return config.response(res , 404 , {'message' : `Ethnic Group entries does not exists in the record or is not available.`});		}

																																			return config.response(res , 200 , entryResult);			});
	} ,

	'entryCountryList' : (req , res , next) => {	
			
		Country.find({})
										.lean({})

										.select('_id')

										.hint({'_id' : 1})

										.exec((err , entryResult) => {

																			if (err) {
																																					return config.errResponse(res , 400 , err);		}
																			if (entryResult.length == 0) {
																																					return config.response(res , 404 , {'message' : `Country entries does not exists in the record or is not available.`});		}

																																					return config.response(res , 200 , entryResult);				});
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
																													return config.errResponse(res , 400 , err);		}
																		if (!result) {
																													return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																		if (!result.Eyon) {
																													return config.response(res , 404 , {'message' : `Ethnic Group entry does not exists in the record or is not available.`});		}
																		if (result.Eyon) {
																													var eyon = result.Eyon;

									Legend.find({'ethnic_group' : eyon._id})													.lean({})

									.hint({'ethnic_group' : 1})

									.limit(20)

									.select(`-_id title continent country century ethnic_group genre region slug photo_detail.location`)

									.exec((err , entryResult) => {
																									if (err) {
																																									return config.errResponse(res , 400 , err);		}
																									if (entryResult.length == 0) {
																																									return config.response(res , 404 , {'message' : `No ${modelType} entries available for this Ethnic Group.`});		}
																																									
																																									return config.response(res , 200 , entryResult);		})		}			});		} 
		else {
						return config.response(res , 404 , {'message' : `No Ethnic Group id provided. Please provide a valid Ethnic Group id.`});			}
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
																														return config.errResponse(res , 400 , err);		}
																		if (!result) {
																														return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
																		if (!result.Country) {
																														return config.response(res , 404 , {'message' : `Country entry does not exists in the record or is not available.`});		} 
																		
																		if (result.Country) {		var country = result.Country;

									Legend.find({'country' : country._id})															.lean({})

									.hint({'country' : 1})

									.limit(20)
									
									.select(`-_id title continent country century ethnic_group genre region slug photo_detail.location`)

									.exec((err , entryResult) => {

																								if (err) {
																																									return config.errResponse(res , 400 , err);		}
																								if (entryResult.length == 0) {
																																									return config.response(res , 404 , {'message' : `No ${modelType} entries available for this Country or State.`});		}

																																									return config.response(res , 200 , entryResult);			})	}		});				}
		else {
						return config.response(res , 404 , {'message' : `No Country id provided. Please provide a valid Country id.`});		}
	} ,
		
	'entryDetail' : (req , res , next) => {	legend = req.params.legend;

		if (req.params && req.params.legend) {
																
													Legend.findOne({'slug' : legend })																					.lean({})

													.populate({'path' : 'author' , 'select' : 'full_name -_id'})							.lean({})

													.populate({'path' : 'votes' , 'select' : 'voters votes -_id'})						.lean({})

													.select(`-_id title date legend_body author continent country century ethnic_group genre region slug photo_detail.location`)

													.exec((err , entryResult) => {

																		if (err) {
																																	return config.errResponse(res , 400 , err);		}
																		if (!entryResult) {
																																	return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
																		if (entryResult) {
																																	return config.response(res , 200 , entryResult)		}			});					}
		else {
						return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
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
																	'Genre' : (callback) => {
																																	Genre.find({})
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
																											return config.response(res , 404 , {'message' : `Country entries does not exists in the record or is not available.`});					}
							if (result.Genre.length == 0) {
																											return config.response(res , 404 , {'message' : `Genre entries does not exists in the record or is not available.`});						}
							if (result.Continent.length == 0) {
																											return config.response(res , 404 , {'message' : `Continent entries does not exists in the record or is not available.`});				}
							if (result.Region.length == 0) {
																											return config.response(res , 404 , {'message' : `Region entries does not exists in the record or is not available.`});					}
							if (result.Century.length == 0) {
																											return config.response(res , 404 , {'message' : `Century entries does not exists in the record or is not available.`});					}
																											
																											return config.response(res , 200 , result);			});
	} , 

	'entryAddSubmit' : (req , res , next) => {	var legend = new Legend(req.body) , key = legend.photo_detail.location.split('/').pop();

		legend.save((err , entryResult) => {
																					if (err) {

																						if (req.body.photo_detail.location) {

																												legendDelete.delete(req.body.photo_detail.location);

																												return config.errResponse(res , 400 , err); 				}

																												return config.errResponse(res , 400 , err); 				}
																					else {
																									Upload.updateOne( {'Key' : key } , { '$set' : {	'entry_slug' : entryResult.slug } } , {'upsert' : true} ).then((entryUpdate) => {

																										return config.response(res , 200 , entryResult);	})		}			});
	} , 

	'entryUpdate' : (req , res , next) => {		legend = req.params.legend;

		async.parallel({
																	'Eyon' : (callback) => {
																																	Eyon.find({})
																																								.lean({})
																																													.select('_id')
																																																					.hint({'_id' : 1 })
																																																															.exec(callback);			} ,
																	'Country' : (callback) => {
																																	Country.find({})
																																									.lean({})
																																														.select('_id')
																																																						.hint({'_id' : 1 })
																																																																.exec(callback);		} ,
																	'Region' : (callback) => {
																																	Region.find({})
																																									.lean({})
																																														.select('_id')
																																																						.hint({'_id' : 1 })
																																																																.exec(callback);		} ,
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
																	'Genre' : (callback) => {
																																	Genre.find({})
																																									.lean({})
																																														.select('_id')
																																																						.hint({'_id' : 1 })
																																																																.exec(callback);		} ,
																	'Legend' : (callback) => {
																																	Legend.findOne({'slug' : legend })
																																																	.lean({})

													.select(`-_id title date legend_body continent country century ethnic_group genre region slug artist findspot medium credit language dimension length`)
																																																						
																																																	.exec(callback) }	
			} , (err , result) => {	

							if (err) {
																											return config.errResponse(res , 400 , err);		}
							if (!result) {
																											return config.response(res , 404 , {'message' : `Data cannot be retrieved.`});		}
							if (result.Eyon.length == 0) {
																											return config.response(res , 404 , {'message' : `Ethnic Group entries does not exists in the record or is not available.`});		}
							if (result.Country.length == 0) {
																											return config.response(res , 404 , {'message' : `Country entries does not exists in the record or is not available.`});					}
							if (result.Genre.length == 0) {
																											return config.response(res , 404 , {'message' : `Genre entries does not exists in the record or is not available.`});						}
							if (result.Continent.length == 0) {
																											return config.response(res , 404 , {'message' : `Continent entries does not exists in the record or is not available.`});				}
							if (result.Region.length == 0) {
																											return config.response(res , 404 , {'message' : `Region entries does not exists in the record or is not available.`});					}
							if (result.Century.length == 0) {
																											return config.response(res , 404 , {'message' : `Century entries does not exists in the record or is not available.`});					}
							if (!result.Legend) {
																											return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});			}
			
																											return config.response(res , 200 , result);		});
	} , 

	'entryUpdateSubmit' : (req , res , next) => {	pValue = req.body , legend = req.params.legend , key = pValue.photo_detail ? (pValue.photo_detail.location ? pValue.photo_detail.location.split('/').pop() : '') : '';

								if (pValue.photo_detail) {

											if (!pValue.photo_detail.location) {

														delete pValue.photo_detail;		}		}

				if (req.params && req.params.legend) {

				Legend.findOne({'slug' : legend })
																				.lean({})

																				.select('photo_detail.location slug -_id')

																				.exec((err , entryResult) => {
								if (!entryResult) {	
																										return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});	}

					if (entryResult.photo_detail.location && pValue.photo_detail) {
									
								Legend.findOneAndUpdate({'slug' : legend } , {'$set' : pValue } , {'new' : true , 'setDefaultsOnInsert' : true , 'context' : true })

								.lean({})

								.select(`-_id title date legend_body photo_detail.location author continent country century ethnic_group genre region slug`)

								.populate({'path' : 'author' , 'select' : 'full_name -_id'})								.lean({})

								.populate({'path' : 'votes' , 'select' : 'entry_slug voters votes -_id'})		.lean({})

								.exec((err , entryUpdate) => {
																								if (err) {
																														if (req.body.photo_detail.location) {

																														legendDelete.delete(req.body.photo_detail.location);

																														return config.errResponse(res , 400 , err); 				}

																														return config.errResponse(res , 400 , err);		}
																			if (entryUpdate) {
																														if (entryResult.photo_detail.location) {

																														legendDelete.delete(entryResult.photo_detail.location);		}

																														Upload.updateOne( {'Key' : key } , { '$set' : {	'entry_slug' : entryResult.slug } } ).then((entryUpdate1) => {

																															return config.response(res , 201 , entryUpdate);	})		}			}); 	}
					else {

								if (pValue.photo_detail) {

											if (!pValue.photo_detail.location) {

														delete pValue.photo_detail;		}		}

								Legend.findOneAndUpdate({'slug' : legend } , {'$set' : pValue } , {'new' : true , 'setDefaultsOnInsert' : true , 'context' : true })

								.lean({})

								.select(`-_id title date legend_body photo_detail.location author continent country century ethnic_group genre region slug`)

								.populate({'path' : 'author' , 'select' : 'full_name -_id'})								.lean({})

								.populate({'path' : 'votes' , 'select' : 'entry_slug voters votes -_id'})		.lean({})

								.exec((err , entryUpdate) => {
																								if (err) {
																														if (req.body.photo_detail.location) {

																														legendDelete.delete(req.body.photo_detail.location);

																														return config.errResponse(res , 400 , err); 				}

																														return config.errResponse(res , 400 , err);		}
																			if (entryUpdate) {
																														Upload.updateOne( {'Key' : key } , { '$set' : {	'entry_slug' : entryResult.slug } } ).then((entryUpdate1) => {

																															return config.response(res , 201 , entryUpdate);	})		}		});		}			});		} 
			else {
							return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
	} , 

	'entryDelete' : (req , res , next) => {	legend = req.params.legend;

		if (req.params && req.params.legend) {

				Legend.findOne({'slug' : legend })																		
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

	'entryDeleteSubmit' : (req , res , next) => {	legend = req.params.legend;

		if (req.params && req.params.legend) {
										
				Legend.findOneAndDelete({'slug' : legend})
																														.lean({})

																														.select(`-_id slug photo_detail.location`)

																														.exec((err , entryResult) => {
																								if (err) {
																																			return config.errResponse(res , 400 , err);		}
																								if (!entryResult) {	
																																			return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
																								if (entryResult) {
																																			legendDelete.delete(entryResult.photo_detail.location);
													async.parallel({
																										'Comment' : (callback) => {
																																										Legend.deleteComments(entryResult.slug)
																																																															.exec(callback);			} ,
																										'Reply' : (callback) => {
																																										Legend.deleteReplies(entryResult.slug)
																																																															.exec(callback);			} ,
																										'Vote' : (callback) => {
																																										Legend.deleteVotes(entryResult.slug)
																																																															.exec(callback);			} ,
																										'commentVote' : (callback) => {
																																										Legend.deleteCommentVotes(entryResult.slug)
																																																															.exec(callback);			} ,
																										'replyVote' : (callback) => {
																																										Legend.deleteReplyVotes(entryResult.slug)
																																																															.exec(callback);			} ,
														} , (err , result) => {
																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (result) {
																																						return config.response(res , 204 , {'message' : `Entry successfully removed from the record.`});		} });			}			})		}	
			else {
							return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
	} ,

	'entryAllDeleteSubmit' : (req , res , next) => {

				Legend.deleteMany({})
														.lean({})

														.select(`-_id slug photo_detail.location`)

														.exec((err , entryResult) => {

																								if (err) {
																																			return config.errResponse(res , 400 , err);		}
																		if (entryResult.deletedCount) {	
																																			return config.response(res , 404 , {'message' : `${modelType} entries does not exists in the record or is not available.`});		}
																								if (entryResult) {
																																			return config.response(res , 204 , {'message' : `Entries successfully removed from the record.`});		}			});	
	} ,

	'entryVote' : (req , res , next) => { legend = req.params.legend;

		if (req.params && req.params.legend) {

			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select(`title slug -_id`)

																			.exec((err , entryResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`}); 	}
				if (entryResult) {
															Legend.findVotes(legend)
																										.lean({})

																										.populate({'path' : 'users' , 'select' : 'full_name -_id'})									.lean({})

																										.populate({'path' : 'entry' , 'select' : 'title slug -_id'})								.lean({})

																										.select({'entry_slug' : 1 , 'voters' : 1 , 'votes' : 1})

																										.exec((err , voteResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);			}
																											if (!voteResult) {	
																																						return config.response(res , 404 , {'message' : `Vote does not exists in the record or is not available for this entry.`});  }
																																						
																																						return config.response(res , 200 , voteResult);						});		}			});			} 	
			else {
							return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
		} ,

	'entryAddVote' : (req , res , next) => { legend = req.params.legend;

		if (req.params && req.params.legend) {

			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select(`slug -_id`)

																			.exec((err , entryResult) => {

																										if (err) {
																																					return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																					return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`}); 	}
			if (entryResult) {
													Legend.findVotes(legend)
																								.lean({})

																								.select('entry_slug voters')

																								.exec((err , voterResult) => {
																													
																																	if (err) {
																																												return config.errResponse(res , 400 , err);			}

																														else if (!voterResult) {		var vote = new LegendVote({'entry_slug' : legend , 'votes' : 1 , 'voters' : [req.body.author]});

																					vote.save((err , voteSave) => {
																																						if (err) {
																																														return config.errResponse(res , 400 , err);			}

																																														return config.response(res , 200 , voteSave);			});			}
																																						else {
							voterResult.voters.find((id) => {

							if (id == req.body.author) {	userVote.voted = true;

										return true;		}		});
																															if (userVote.voted) {
																																											return config.response(res , 400 , {'message' : `You can't vote more than once for an entry.`});		}		
																															else {

			LegendVote.findOneAndUpdate({'entry_slug' : entryResult.slug } , {'$addToSet' : {'voters' : req.body.author } , '$inc' : {'votes' : 1 }} , {'new' : true })

																	.lean({})

																	.select({'votes' : 1 , 'entry_slug' : 1 , 'voters' : 1 , '_id' : 0})

																	.exec((err , voteResult) => {
																																	if (err) {
																																											return config.errResponse(res , 400 , err);		}

																																											return config.response(res , 201 , voteResult); 		});		}			}				})		}			});			} 	
			else {
							return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
		} ,

	'commentVote' : (req , res , next) => { comment = req.params.comment;

		if (req.params && req.params.comment) {

			LegendComment.findOne({'slug' : comment })
																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , commentResult) => {

																											if (err) {
																																								return config.errResponse(res , 400 , err);		}
																											if (!commentResult) {
																																								return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available.`}); 	}
				if (commentResult) {
															
						LegendCommentVote.findOne({'comment_slug' : comment })
																																		.lean({})

																																		.populate({'path' : 'users' , 'select' : 'full_name -_id'})									.lean({})

																																		.populate({'path' : 'entry' , 'select' : 'title slug -_id'})								.lean({})

																																		.populate({'path' : 'comment' , 'select' : 'text slug -_id'})								.lean({})

																																		.select({'createdAt' : 0 , 'updatedAt' : 0})

																																		.exec((err , voteResult) => {
																									if (err) {
																																				return config.errResponse(res , 400 , err);			}
																									if (!voteResult) {	
																																				return config.response(res , 404 , {'message' : `Vote does not exists in the record or is not available for this comment entry.`});  }
																																				
																																				return config.response(res , 200 , voteResult);						});		}			});			} 	
			else {
							config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid Comment id.`});		}
		} ,

	'commentAddVote' : (req , res , next) => { var { legend , comment } = req.params;

		if (req.params && req.params.legend) {

			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select(`slug -_id`)

																			.exec((err , entryResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`}); 	}
					if (entryResult && req.params.comment) {

			LegendComment.findOne({'slug' : comment })
																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , commentResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!commentResult) {
																																						return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available.`}); 	}
				if (commentResult) {

			LegendCommentVote.findOne({'comment_slug' : comment})
																													.lean({})

																													.select(`slug voters -_id`)

																													.exec((err , voterResult) => {
																													
																											if (err) {
																																						return config.errResponse(res , 400 , err);			}

																											if (!voterResult) {		var vote = new LegendCommentVote({'entry_slug' : legend , 'comment_slug' : comment , 'votes' : 1 , 'voters' : [req.body.author]});

										return vote.save((err , voteSave) => {
																														if (err) {
																																						return config.errResponse(res , 400 , err);			}

																																						return config.response(res , 200 , voteSave);			});			}
							voterResult.voters.find((id) => {

										if (id == req.body.author) {		userVote.voted = true;

												return true;		}		});
																															if (userVote.voted) {
																																											return config.response(res , 400 , {'message' : `You can't vote more than once for a comment entry.`});		}		
																															else {

		LegendCommentVote.findOneAndUpdate({'comment_slug' : comment } , {'$addToSet' : {'voters' : req.body.author } , '$inc' : {'votes' : 1}} , {'new' : true })

																	.lean({})

																	.select({'votes' : 1 , '_id' : 0})

																	.exec((err , voteResult) => {
																																	if (err) {
																																											return config.errResponse(res , 400 , err);		}

																																											return config.response(res , 201 , voteResult); 		});		}		});		}		});		}
					else {
									return config.response(res , 404 , {'message' : `No comment id provided. Please provide a valid comment id.`});		}			});			} 	
					else {
									return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
		} ,

	'replyVote' : (req , res , next) => { reply = req.params.reply;

		if (req.params.reply) {

					LegendReply.findOne({'slug' : reply })
																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , replyResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (!replyResult) {
																																						return config.response(res , 404 , {'message' : `Reply entry does not exists in the record or is not available.`}); 	}
				if (replyResult) {
															
						LegendReplyVote.findOne({'reply_slug' : reply })
																																		.lean({})

																																		.populate({'path' : 'users' , 'select' : 'full_name -_id'})									.lean({})

																																		.populate({'path' : 'entry' , 'select' : 'title slug -_id'})								.lean({})

																																		.populate({'path' : 'comment' , 'select' : 'text slug -_id'})								.lean({})

																																		.populate({'path' : 'reply' , 'select' : 'text slug -_id'})									.lean({})

																																		.select({'createdAt' : 0 , 'updatedAt' : 0})

																																		.exec((err , voteResult) => {
																									if (err) {
																																				return config.errResponse(res , 400 , err);			}
																									if (!voteResult) {	
																																				return config.response(res , 404 , {'message' : `Vote does not exists in the record or is not available for this reply entry.`});  }
																																				
																																				return config.response(res , 200 , voteResult);						});		}			});			} 	
			else {
							return config.response(res , 404 , {'message' : `No reply id provided. Please provide a valid  id.`});		}
		} ,

	'replyAddVote' : (req , res , next) => { var { legend , comment , reply } = req.params;

		if (req.params && req.params.legend) {

			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select(`slug -_id`)

																			.exec((err , entryResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`}); 	} 
					if (entryResult && req.params.comment) {

			LegendComment.findOne({'slug' : comment })
																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , commentResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!commentResult) {
																																						return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available.`}); 	}
					if (commentResult && req.params.reply) {

					LegendReply.findOne({'slug' : reply })
																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , replyResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!replyResult) {
																																						return config.response(res , 404 , {'message' : `Reply entry does not exists in the record or is not available.`}); 	}
									if (replyResult) {

					LegendReplyVote.findOne({'reply_slug' : reply})
																												.lean({})

																												.select(`slug voters -_id`)

																												.exec((err , voterResult) => {
																													
																														if (err) {
																																						return config.errResponse(res , 400 , err);			}

																		if (!voterResult) {	var vote = new LegendReplyVote({'entry_slug' : legend , 'comment_slug' : comment , 'reply_slug' : reply , 'votes' : 1 , 'voters' : [req.body.author]});

										return vote.save((err , voteSave) => {
																														if (err) {
																																						return config.errResponse(res , 400 , err);			}

																																						return config.response(res , 200 , voteSave);			});			}
							voterResult.voters.find((id) => {

										if (id == req.body.author) {		userVote.voted = true;

												return true;		}		});
																															if (userVote.voted) {
																																											return config.response(res , 400 , {'message' : `You can\'t vote more than once for a reply entry.`});		}		
																															else {

		LegendReplyVote.findOneAndUpdate({'reply_slug' : reply} , {'$addToSet' : {'voters' : req.body.author } , '$inc' : {'votes' : 1}} , {'new' : true })

																	.lean({})

																	.select({'votes' : 1 , '_id' : 0})

																	.exec((err , voteResult) => {
																																	if (err) {
																																											return config.errResponse(res , 400 , err);		}

																																											return config.response(res , 201 , voteResult); 		});		} 		}) }		})		}
					else {
									return config.response(res , 404 , {'message' : `No reply id provided. Please provide a valid reply id.`});		}				}); 		}
					else {
									return config.response(res , 404 , {'message' : `No comment id provided. Please provide a valid comment id.`});		}			});		}
					else {
									return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
		} ,

	'entryComment' : (req , res) => { 	legend = req.params.legend;
		
		if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})
																		
																			.select(`title slug -_id`)
																							
																			.exec((err , entryResult) => {

																											if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																							return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
				if (entryResult) {

		Legend.findComment(legend)
		
		.lean({})

		.populate({'path' : 'replies' , 'select' : 'text slug commentAuthorName updatedAt author -_id' , 'options' : {'limit' : 100} , 

							'populate' : [{'path' : 'author' , 'select' : 'full_name _id'} , {'path' : 'votes' , 'select' : 'votes'} ]})									.lean({})

		.select('text author updatedAt slug entry_slug')

																		.exec((err , commentResult) => {
												if (err) {
																														return config.response(res , 400 , err);	}
												if (commentResult.length == 0) {
																														return config.response(res, 404 , {'message' : `Comments do not exists in the record or is not available for this entry.`});			}
			$entryComment = {
												'legend' : entryResult ,

												'comments' : commentResult	};
																														return config.response(res , 200 , $entryComment);			});			}			})		}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
	} ,

	'entryCommentDetail' : (req , res , next) => { var { legend , comment } = req.params;

			if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																											if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																							return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
				if (entryResult) {

			if (req.params && req.params.comment) {

			LegendComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
					
																		.lean({})

																		.populate({'path' : 'author' , 'select' : 'full_name -_id'})			.lean({})

																		.populate({'path' : 'entry' , 'select' : 'title -_id'})						.lean({})

																		.populate({'path' : 'replies' , 'select' : 'text slug updatedAt author -_id' , 'options' : {'limit' : 2} ,

																		'populate' : [{'path' : 'author' , 'select' : 'full_name -_id'} , {'path' : 'votes' , 'select' : 'votes'}]})
																		
																		.lean({})

																		.populate({'path' : 'votes' , 'select' : 'entry_slug voters votes -_id'})	.lean({})
																		
																		.select('slug text author updatedAt entry_slug -_id')

																		.exec((err , commentResult) => {
																		
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!commentResult) {
																																									return config.response(res, 404 , {'message' : `Comment entry does not exists or is not available for this entry.`});			}
									$entryComment = {	'legend' : entryResult ,

																		'comment' : commentResult		};
																																									return config.response(res , 200 , $entryComment);			});				}
				else {
								return config.response(res , 404 , {'message' : `No comment id provided. Please provide a valid comment id.`});		}			}			 	});	 		}
				else {
								return config.response(res , 404 , {'message' : `No Legend id provided. Please provide a valid legend id.`});			}
		} , 

	'entryAddComment' : (req , res) => { var  legend = req.params.legend;

		if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																										if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}

																																						return config.response(res , 200 , entryResult);					});	 }
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
	} ,

	'entryAddCommentSubmit' : (req , res) => {	var comment = new LegendComment(req.body) , legend = req.params.legend;

				comment.set('entry_slug' , legend);

		if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
				comment.save((err , commentResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}	
																												else {
			$entryComment = {	'legend' : entryResult ,

												'comment' : commentResult		};
																																						return config.response(res , 200 , $entryComment);		}			});			});	 }
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
	} ,

	'entryCommentUpdate' : (req , res , next) => {  var { legend , comment } = req.params;

		if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																										if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
					if (entryResult) {

			if (req.params && req.params.comment) {

			LegendComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																								.lean({})

																																								.populate({'path' : 'author' , 'select' : 'full_name -_id'})			

																																								.lean({})

																																								.select('text slug updatedAt -_id')

																																								.exec((err , commentResult) => {
																									if (err) {
																																						return config.response(res , 400 , err);	}
																									if (!commentResult) {
																																						return config.response(res, 404 , {'message' : `Comment does not exists in the record or is not available for this entry.`});		}
										$entryComment = {	'legend' : entryResult ,

																			'comment' : commentResult		};
																																									return config.response(res , 200 , $entryComment);			});				}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});		}			}				});	 		}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
	} ,

	'entryCommentUpdateSubmit' : (req , res , next) => { var { legend , comment } = req.params;

		if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																										if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
						if (entryResult) {

				if (req.params && req.params.comment) {

		LegendComment.findOneAndUpdate({'slug' : comment , 'entry_slug' : entryResult.slug} , {'$set' : req.body } , {'new' : true , 'setDefaultsOnInsert' : true , 'context' : true })

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})			

									.lean({})

									.select({'text' : 1 , 'entry_slug' : 1 , 'updatedAt' : 1 , 'slug' : 1})

									.exec((err , commentResult) => {
																												if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!commentResult) {
																																							return config.response(res , 404 , {'message' : `Comment does not exists in the record or is not available for this entry.`});	}
									$commentUpdate = {	'legend' : entryResult ,

																			'comment' : commentResult		};
																																							return config.response(res , 201 , $commentUpdate); 			});  		} 
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});			}			}		}); 		} 
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
		} , 

	'entryCommentDeleteAll' : (req , res , next) => {	legend = req.params.legend;

				if (req.params && req.params.legend) {

				Legend.findOne({'slug' : legend })
																				.lean({})

																				.select(`slug -_id`)

																				.exec((err , entryResult) => {

																												if (err) {
																																							return config.errResponse(res , 400 , err);		}	
																												if (!entryResult) {	
																																							return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});	}

				LegendComment.deleteMany({'entry_slug' : legend })
																												.exec((err , commentDeleteAll) => {

																												if (err) {
																																		return config.errResponse(res , 400 , err);		}

																																		return config.response(res , 204 , {'message' : `Entry comments successfully removed from record.`});		});			});		} 
			else {
							return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
		} , 

	'entryCommentDelete' : (req , res , next) => { var { legend , comment } = req.params;

		if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																									if (err) {
																																					return config.errResponse(res , 400 , err);		}
																									if (!entryResult) {
																																					return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
						if (entryResult) {

			if (req.params && req.params.comment) {

			LegendComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																								.lean({})

																																								.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																								.lean({})

																																								.select('text slug updatedAt -_id')

																																								.exec((err , commentResult) => {
																								if (err) {
																																					return config.response(res , 400 , err);	}
																								if (!commentResult) {
																																					return config.response(res, 404 , {'message' : `Comment does not exists in the record or is not available for this entry.`});		}
										$legendComment = {	'legend' : entryResult ,

																			'comment' : commentResult		};
																																									return config.response(res , 200 , $legendComment);			});				}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});		}			}				});	 		}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
		} , 

	'entryCommentDeleteSubmit' : (req , res , next) => { var { legend , comment } = req.params;

		if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																										if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
				if (req.params && req.params.comment) {

			LegendComment.findOneAndDelete({'slug' : comment , 'entry_slug' : entryResult.slug})

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})

									.lean({})

									.select({'text' : 1 , 'entry_slug' : 1 , 'updatedAt' : 1 , 'slug' : 1 , '_id' : 0})

									.exec((err , commentDelete) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																											else if (!commentDelete) {
																																									return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available.`});		}

																																									return config.response(res , 204 , commentDelete); 			});  	} 
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});			} 		}); 		} 
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
		} , 

	'entryReply' : (req , res) => { 	legend = req.params.legend;
		
		if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})
																		
																			.select('title slug -_id')
																							
																			.exec((err , entryResult) => {

																										if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
				if (entryResult) {
														Legend.findReply(legend)
																										.lean({})

																										.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																										.lean({})

																										.select('text slug updatedAt -_id')

																										.exec((err , replyResult) => {
														if (err) {
																																return config.response(res , 400 , err);	}
														if (replyResult.length == 0) {
																																return config.response(res, 404 , {'message' : `Replies do not exists in the record or is not available for this entry.`});			}
					$entryReply = {
														'legend' : entryResult ,

														'replies' : replyResult	};
																																return config.response(res , 200 , $entryReply);			});			}			});		}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
	} ,

	'entryReplyDetail' : (req , res , next) => { var { legend , reply } = req.params;

			if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																											if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																							return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
					if (entryResult) {

			if (req.params && req.params.reply) {

			LegendReply.findOne({'slug' : reply , 'entry_slug' : entryResult.slug})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})								.lean({})																																							

																																							.populate({'path' : 'entry' , 'select' : 'title slug -_id'})								.lean({})

																																							.populate({'path' : 'comment' , 'select' : 'text slug -_id'})								.lean({})

																																							.select('text slug updatedAt entry_slug comment_slug -_id')

																																							.exec((err , replyResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!replyResult) {
																																									return config.response(res, 404 , {'message' : `Reply entry does not exists or is not available for this entry.`});			}
									$entryReply = {	'legend' : entryResult  ,

																	'reply' : replyResult		};
																																									return config.response(res , 200 , $entryReply);			});				}
				else {
								return config.response(res , 404 , {'message' : `No reply id provided. Please provide a valid reply id.`});		}			}	 	});	 		}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
		} , 

	'entryAddReplytoComment' : (req , res) => { var  legend = req.params.legend , comment = req.params.comment;

		if (req.params && req.params.legend) {

			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																											if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																							return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}

			LegendComment.findOne({'entry_slug' : entryResult.slug , 'slug' : comment})
																																								.lean({})

																																								.populate({'path' : 'author' , 'select' : 'full_name -_id'})							.lean({})

																																								.select('text slug entry_slug author -_id')

																																								.exec((err , commentResult) => {
																											if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!commentResult) {
																																							return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available.`});		}
							$entryComment = {	'legend' : entryResult ,

																'comment' : commentResult		};
																																							return config.response(res , 200 , $entryComment);	});		})		}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
	} ,

	'entryAddReplyToCommentSubmit' : (req , res) => {	var reply = new LegendReply(req.body) , legend = req.params.legend , comment = req.params.comment;

		if (req.body.commentauthorname) {

					reply.commentAuthorName = req.body.commentauthorname;		}

		if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																												if (err) {
																																								return config.errResponse(res , 400 , err);		}
																												if (!entryResult) {
																																								return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
			if (entryResult) {

				if (req.params && req.params.comment) {

			LegendComment.findOne({'slug' : comment })
																							.lean({})

																							.select('text slug -_id')
																							
																							.exec((err , commentResult) => {

																												if (err) {
																																								return config.errResponse(res , 400 , err);		}
																												if (!commentResult) {
																																								return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available.`});		}
			if (commentResult) {

				reply.set('entry_slug' , entryResult.slug);

				reply.set('comment_slug' , commentResult.slug);

				reply.populate({'path' : 'author' , 'select' : 'full_name -_id'});

																		reply.save((err , replyResult) => {
																																				if (err) {
																																										return config.errResponse(res , 400 , err);		}	
																																					else {
											$entryReply = {	'legend' : entryResult ,

																			'comment' : commentResult ,

																			'reply' : replyResult		};
																																									return config.response(res , 200 , $entryReply);		}			});			}				});			}
				else {
								return config.response(res , 404 , {'message' : `No comment id provided. Please provide a valid comment id.`});		}				}				});	 		}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
	} ,

	'entryReplyUpdate' : (req , res , next) => { var { legend , comment , reply } = req.params;

			if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});	}
			if (req.params && req.params.comment) {

			LegendComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																								.lean({})

																																								.populate({'path' : 'author' , 'select' : 'full_name -_id'})									.lean({})

																																								.populate({'path' : 'entry' , 'select' : 'title -_id'})												.lean({})

																																								.select('text slug updatedAt entry_slug -_id')

																																								.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!commentResult) {
																																									return config.response(res, 404 , {'message' : `Comment entry does not exists or is not available for this entry.`});			}
			if (req.params && req.params.reply) {

			LegendReply.findOne({'slug' : reply , 'entry_slug' : entryResult.slug})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})											.lean({})

																																							.populate({'path' : 'entry' , 'select' : 'title slug -_id'})											.lean({})

																																							.populate({'path' : 'comment' , 'select' : 'text slug -_id'})											.lean({})

																																							.select('text slug updatedAt entry_slug comment_slug -_id')

																																							.exec((err , replyResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!replyResult) {
																																									return config.response(res, 404 , {'message' : `Reply entry does not exists or is not available for this entry.`});			}
									$legendComment = {	'legend' : entryResult  ,

																		'comment' : commentResult ,

																		'reply' : replyResult		};
																																									return config.response(res , 200 , $legendComment);			});				}
				else {
								return config.response(res , 404 , {'message' : `No reply id provided. Please provide a valid reply id.`});		}					});				}
				else {
								return config.response(res , 404 , {'message' : `No comment id provided. Please provide a valid reply id.`});		} 			});	 			}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
		} , 

	'entryReplyUpdateSubmit' : (req , res , next) => { var { legend , comment , reply } = req.params;

			if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																										if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
			if (req.params && req.params.comment) {

			LegendComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																								.lean({})

																																								.select('text slug -_id')

																																								.exec((err , commentResult) => {
																											if (err) {
																																								return config.errResponse(res , 400 , err);	}
																											if (!commentResult) {
																																								return config.response(res, 404 , {'message' : `Comment entry does not exists or is not available for this entry.`});			}
			if (req.params && req.params.reply) {

		LegendReply.findOneAndUpdate({'slug' : reply , 'entry_slug' : entryResult.slug} , {'$set' : req.body } , {'new' : true , 'setDefaultsOnInsert' : true , 'context' : true })

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})									.lean({})

									.populate({'path' : 'entry' , 'select' : 'title slug -_id'})									.lean({})

									.populate({'path' : 'comment' , 'select' : 'text slug -_id'})									.lean({})

									.select({'text' : 1 , 'entry_slug' : 1 , 'comment_slug' : 1 , 'updatedAt' : 1 , 'slug' : 1})

									.exec((err , replyResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!replyResult) {
																																									return config.response(res , 404 , {'message' : `Reply entry does not exists in the record or is not available.`});		}
										$replyUpdate = {	'legend' : entryResult ,

																			'comment' : commentResult	,

																			'reply' : replyResult };
																																									return config.response(res , 201 , $replyUpdate); 			});			}
				else {
								return config.response(res , 404 , {'message' : `No reply id provided. Please provide a valid reply id.`});		}					});				}
				else {
								return config.response(res , 404 , {'message' : `No comment id provided. Please provide a valid reply id.`});		} 			});	 			}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
		} , 

	'entryReplyDeleteAll' : (req , res , next) => {	legend = req.params.legend;

				if (req.params && req.params.legend) {

				Legend.findOne({'slug' : legend })
																				.lean({})

																				.select(`slug -_id`)

																				.exec((err , entryResult) => {

																												if (err) {
																																							return config.errResponse(res , 400 , err);		}	
																												if (!entryResult) {	
																																							return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});	}

				LegendReply.deleteMany({'entry_slug' : legend })
																											.lean({})

																											.select(`slug -_id`)

																											.exec((err , replyDeleteAll) => {

																												if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (replyDeleteAll) {
																																							return config.response(res , 404 , {'message' : 'Replies does not exists in the record is not available for this entry.'})		}

																																							return config.response(res , 201 , {'message' : `Entry replies successfully removed from record.`});		});			});		} 
			else {
							return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
		} , 

	'entryReplyDelete' : (req , res , next) => { var { legend , comment , reply } = req.params;

			if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																											if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																							return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
			if (req.params && req.params.comment) {

			LegendComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																								.lean({})

																																								.populate({'path' : 'author' , 'select' : 'full_name -_id'})									.lean({})

																																								.populate({'path' : 'entry' , 'select' : 'title -_id'})												.lean({})

																																								.select('text slug updatedAt entry_slug -_id')

																																								.exec((err , commentResult) => {
																											if (err) {
																																							return config.errResponse(res , 400 , err);	}
																											if (!commentResult) {
																																							return config.response(res, 404 , {'message' : `Comment entry does not exists or is not available for this entry.`});			}
			if (req.params && req.params.reply) {

			LegendReply.findOne({'slug' : reply , 'entry_slug' : entryResult.slug})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})									.lean({})

																																							.populate({'path' : 'entry' , 'select' : 'title -_id'})												.lean({})

																																							.populate({'path' : 'comment' , 'select' : 'text slug -_id'})									.lean({})

																																							.select('text slug updatedAt entry_slug comment_slug -_id')

																																							.exec((err , replyResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!replyResult) {
																																									return config.response(res, 404 , {'message' : `Reply entry does not exists or is not available for this entry.`});			}
									$entryReply = {	'legend' : entryResult  ,

																		'comment' : commentResult ,

																		'reply' : replyResult	};
																																									return config.response(res , 200 , $entryReply);			});				}
				else {
								return config.response(res , 404 , {'message' : `No reply id provided. Please provide a valid reply id.`});		}					});				}
				else {
								return config.response(res , 404 , {'message' : `No comment id provided. Please provide a valid reply id.`});		} 			});	 			}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
		} , 

	'entryReplyDeleteSubmit' : (req , res , next) => { var { legend , comment , reply } = req.params;

			if (req.params && req.params.legend) {
			
			Legend.findOne({'slug' : legend })
																			.lean({})

																			.select('title slug -_id')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : `${modelType} entry does not exists in the record or is not available.`});		}
			if (req.params && req.params.comment) {

			LegendComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																								.lean({})

																																								.populate('author' , {'full_name' : 1 , '_id' : 0})													.lean({})

																																								.populate('entry' , {'title' : 1 , 'slug' : 1 , '_id' : 0})									.lean({})

																																								.populate('comment' , {'text' : 1 , 'slug' : 1 , '_id' : 0})								.lean({})

																																								.select('text slug updatedAt entry_slug -_id')

																																								.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!commentResult) {
																																									return config.response(res, 404 , {'message' : `Comment entry does not exists or is not available for this entry.`});			}
			if (req.params && req.params.reply) {

			LegendReply.findOneAndDelete({'slug' : reply , 'entry_slug' : entryResult.slug})

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})									.lean({})

									.populate({'path' : 'entry' , 'select' : 'title slug -_id'})									.lean({})

									.populate({'path' : 'comment' , 'select' : 'text slug -_id'})									.lean({})

									.select('text slug updatedAt entry_slug comment_slug -_id')

									.exec((err , replyUpdate) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!replyUpdate) {
																																									return config.response(res , 404 , {'message' : `Reply entry does not exists in the record or is not available.`});		}

																																									return config.response(res , 201 , replyUpdate); 			});  		}
				else {
								return config.response(res , 404 , {'message' : `No reply id provided. Please provide a valid reply id.`});		}					});				}
				else {
								return config.response(res , 404 , {'message' : `No comment id provided. Please provide a valid reply id.`});		} 			});	 			}
				else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});			}
		} , 


	'objectDelete' : (req , res , next) => {	legend = req.params.object;

		if (req.params && req.params.object) {
																							legendDelete.objectDelete(req, res , next , legend);												
			}	else {
								return config.response(res , 404 , {'message' : `No ${modelType} id provided. Please provide a valid ${modelType} id.`});		}
		
	} 
	
}				