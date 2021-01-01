const async = require('async');

const Eyon = require('../models/eyon');

const Country = require('../models/country'); 

const Century = require('../models/century'); 

const Specie = require('../models/specie');

const Photo = require('../models/photo'); 

const Genre = require('../models/genre');

const Continent = require('../models/continent');

const Region = require('../models/region');

const PhotoComment = require('../models/comment_model/photo_comment')('Photo.Comment' , 'photo.comments' , 'Photo' , 'Photo.Comment.Reply');

const PhotoReply = require('../models/comment_model/photo_reply');

const PhotoVote = require('../models/comment_model/vote');

const config = require('../config/config');

const photoDelete = require('../config/deleteObject/photoObject');

var ethnic = '' , country = '' , photo = '' , pValue = '' , pParam = '' , eyonId = '' , countryId = '' , userVote = {'voted' : '' , 'newVote' : '' };

module.exports = {

	'photoAll' : (req , res , next) => {

									Photo.find({})								.lean({})			.hint({'url' : 1})		.limit(20)
									
									.select(`-_id title date photo_detail.location author continent country century ethnic_group genre region`)

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})			.lean({})

									.populate({'path' : 'continent' , 'select' : 'name -_id'})				.lean({})

									.populate({'path' : 'country' , 'select' : 'name -_id'})					.lean({})

									.populate({'path' : 'region' , 'select' : 'name -_id'})						.lean({})

									.populate({'path' : 'genre' , 'select' : 'genre -_id'})						.lean({})

									.populate({'path' : 'century' , 'select' : 'century -_id'})				.lean({})

									.populate({'path' : 'ethnic_group' , 'select' : 'eyon -_id'})			.lean({})

									.exec((err , photoResult) => {
																									
																				if (err) {
																																				return config.errResponse(res , 400 , err);		}
																				if (photoResult.length == 0) {
																																				return config.response(res , 404 , {'message' : 'Photo entries does not exists in the record or is not available.'});		}

																																				return config.response(res , 200 , photoResult);		});
	} , 

	'photoEthnic' : (req , res , next) => {	ethnic = req.params.ethnic;

		if (req.params && req.params.ethnic) {

							async.parallel({
																						'Eyon' : (callback) => {
																																			Eyon.findOne({'eyon' : ethnic })
																																																			.lean({})
																																																								.select('eyon')
																																																																.exec(callback);
																						}
			} , (err , result) => {	

				if (result) {
											 eyonId = result.Eyon;
					}
																		if (err) {
																													return config.errResponse(res , 400 , err);		}
																		if (!result) {
																													return config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});		}
																		if (!result.Eyon) {
																													return config.response(res , 404 , {'message' : 'Ethnic Group entry does not exists in the record or is not available.'});		}
					if (eyonId) {

									Photo.find({'ethnic_group' : eyonId._id})													.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})			.lean({})

									.populate({'path' : 'continet' , 'select' : 'name -_id'})					.lean({})

									.populate({'path' : 'country' , 'select' : 'name -_id'})					.lean({})

									.populate({'path' : 'region' , 'select' : 'name -_id'})						.lean({})

									.populate({'path' : 'genre' , 'select' : 'genre -_id'})						.lean({})

									.populate({'path' : 'century' , 'select' : 'century -_id'})				.lean({})

									.populate({'path' : 'ethnic_group' , 'select' : 'eyon -_id'})			.lean({})

									.select(`-_id title date photo_detail.location author continent country century ethnic_group genre region`)

									.limit(20)
																								.exec((err , photoResult) => {
																																								
																															if (err) {
																																															return config.errResponse(res , 400 , err);		}
																															if (photoResult.length == 0) {
																																															return config.response(res , 404 , {'message' : 'No photo entries available for this ethnic group.'});		}
																																															
																																															return config.response(res , 200 , photoResult);		})		}			});		} 
		else {
						config.response(res , 404 , {'message' : 'No Ethnic Group id provided. Please provide a valid photo id.'});			}
	} ,

	'photoCountry' : (req , res , next) => {	country = req.params.country;

		if (req.params && req.params.country) {

							async.parallel({
																					'Country' : (callback) => {
																																				Country.findOne({'name' : country })
																																																						.lean({})
																																																										.select('name')
																																																																		.exec(callback);
																					}
			} , (err , result) => {	

				if (result) {
											 countryId = result.Country;
					}
																		if (err) {
																														return config.errResponse(res , 400 , err);		}
																		if (!result) {
																														return config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});		}
																		if (!result.Country) {
																														return config.response(res , 404 , {'message' : 'Country entry does not exists in the record or is not available.'});		} 
					if (countryId) {

									Photo.find({'country' : countryId._id})														.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})			.lean({})

									.populate({'path' : 'continet' , 'select' : 'name -_id'})					.lean({})

									.populate({'path' : 'country' , 'select' : 'name -_id'})					.lean({})

									.populate({'path' : 'region' , 'select' : 'name -_id'})						.lean({})

									.populate({'path' : 'genre' , 'select' : 'genre -_id'})						.lean({})

									.populate({'path' : 'century' , 'select' : 'century -_id'})				.lean({})

									.populate({'path' : 'ethnic_group' , 'select' : 'eyon -_id'})			.lean({})

									.select(`-_id title date photo_detail.location author continent country century ethnic_group genre region`)

									.limit(20)														
																								.exec((err , photoResult) => {
																												
																											if (err) {
																																												return config.errResponse(res , 400 , err);		}
																											if (photoResult.length == 0) {
																																												return config.response(res , 404 , {'message' : 'No photo entries available for this country or state.'});		}

																																												return config.response(res , 200 , photoResult);			})	}		});


		} else {
					config.response(res , 404 , {'message' : 'No Country id provided. Please provide a valid photo id.'});

		}

	} ,
		
	'photoDetail' : (req , res , next) => {	photo = req.params.photo;

		if (req.params && req.params.photo) {

									Photo.findOne({'url' : photo })																		.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})			.lean({})

									.populate({'path' : 'continet' , 'select' : 'name -_id'})					.lean({})

									.populate({'path' : 'country' , 'select' : 'name -_id'})					.lean({})

									.populate({'path' : 'region' , 'select' : 'name -_id'})						.lean({})

									.populate({'path' : 'genre' , 'select' : 'genre -_id'})						.lean({})

									.populate({'path' : 'century' , 'select' : 'century -_id'})				.lean({})

									.populate({'path' : 'ethnic_group' , 'select' : 'eyon -_id'})			.lean({})

									.select(`-_id title date photo_detail.location author continent country century ethnic_group genre region`)
																															
																															.exec((err , photoResult) => {
 
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
																																								
																																									return config.response(res , 200 , photoResult);		})		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} , 

	'photoAdd' : (req , res , next) => {		
		
			async.parallel({
																	'Eyon' : (callback) => {
																																	Eyon.find({})
																																								.lean({})
																																												.select('eyon')
																																																				.exec(callback);
																	} ,

																	'Country' : (callback) => {
																																	Country.find({})
																																									.lean({})
																																													.select('name')
																																																					.exec(callback);
																	} ,

																	'Region' : (callback) => {
																																	Region.find({})
																																									.lean({})
																																													.select('name')
																																																					.exec(callback);
																	} ,

																	'Continent' : (callback) => {
																																	Continent.find({})
																																										.lean({})
																																														.select('name')
																																																						.exec(callback);
																	} ,

																	'Century' : (callback) => {
																																	Century.find({})
																																									.lean({})
																																													.select('century')
																																																						.exec(callback);
																	} ,

																	'Genre' : (callback) => {
																																	Genre.find({})
																																								.lean({})
																																												.select('genre')
																																																				.exec(callback);
																	} ,
			} , (err , result) => {	
															
							if (err) {
																											return config.errResponse(res , 400 , err);		}
							if (!result) {
																											return config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});		}
							if (result.Eyon.length == 0) {
																											return config.response(res , 404 , {'message' : 'Ethnic Group entries does not exists in the record or is not available.'});		}
							if (result.Country.length == 0) {
																											return config.response(res , 404 , {'message' : 'Country entries does not exists in the record or is not available.'});				}
							if (result.Genre.length == 0) {
																											return config.response(res , 404 , {'message' : 'Genre entries does not exists in the record or is not available.'});					}
							if (result.Continent.length == 0) {
																											return config.response(res , 404 , {'message' : 'Continent entries does not exists in the record or is not available.'});			}
							if (result.Region.length == 0) {
																											return config.response(res , 404 , {'message' : 'Region entries does not exists in the record or is not available.'});					}
							if (result.Century.length == 0) {
																											return config.response(res , 404 , {'message' : 'Century entries does not exists in the record or is not available.'});				}
																											
																											return config.response(res , 200 , result);			});
	} , 

'photoAddSubmit' : (req , res , next) => {	photo = new Photo(req.body);

		photo.save((err , photoResult) => {
																					if (err) {
																												return config.errResponse(res , 400 , err);		}	
																					else {
																												return config.response(res , 200 , photoResult);		}			});
	} , 

	'photoUpdate' : (req , res , next) => {		photo = req.params.photo;

		async.parallel({
															'Eyon' : (callback) => {
																															Eyon.find({})
																																						.lean({})
																																											.select('eyon')
																																																			.exec(callback);
															} ,

															'Country' : (callback) => {
																															Country.find({})
																																							.lean({})
																																												.select('name')
																																																				.exec(callback);
															} ,

															'Region' : (callback) => {
																															Region.find({})
																																							.lean({})
																																												.select('name')
																																																				.exec(callback);
															} ,

															'Continent' : (callback) => {
																															Continent.find({})
																																								.lean({})
																																													.select('name')
																																																					.exec(callback);
															} ,

															'Century' : (callback) => {
																															Century.find({})
																																							.lean({})
																																												.select('century')
																																																					.exec(callback);
															} ,

															'Genre' : (callback) => {
																															Genre.find({})
																																							.lean({})
																																												.select('genre')
																																																				.exec(callback);
															} ,

															'Photo' : (callback) => {
																															Photo.findOne({'url' : photo })
																																															.lean({})
																																																				.exec(callback) }	
			} , (err , result) => {	

								if (err) {
																											return config.errResponse(res , 400 , err);		}
								if (!result) {
																											return config.response(res , 404 , {'message' : 'Data cannot be retrieved.'});		}
								if (result.Eyon.length == 0) {
																											return config.response(res , 404 , {'message' : 'Ethnic Group entries does not exists in the record or is not available.'});		}
								if (result.Country.length == 0) {
																											return config.response(res , 404 , {'message' : 'Country entries does not exists in the record or is not available.'});		}
								if (result.Genre.length == 0) {
																											return config.response(res , 404 , {'message' : 'Genre entries does not exists in the record or is not available.'});			}
								if (result.Continent.length == 0) {
																											return config.response(res , 404 , {'message' : 'Continent entries does not exists in the record or is not available.'});	}
								if (result.Region.length == 0 ) {
																											return config.response(res , 404 , {'message' : 'Region entries does not exists in the record or is not available.'});			}
								if (result.Century.legnth == 0) {
																											return config.response(res , 404 , {'message' : 'Century entries does not exists in the record or is not available.'});		}
								if (!result.Photo) {
																											return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});				}
			
																											return config.response(res , 200 , result);		});
	} , 

	'photoUpdateSubmit' : (req , res , next) => {	pValue = req.body , photo = req.params.photo;

				if (req.params && req.params.photo) {

				Photo.findOne({'url' : photo })
																				.lean({})

																				.exec((err , photoResult) => {	
								if (!photoResult) {	
																			return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});	}

					if (photoResult.photo_detail.location && pValue.photo_detail) {
									
								Photo.findOneAndUpdate({'url' : photo } , 

												{'$set' : pValue} , {'new' : true , 'runValidators' : true , 'setDefaultsOnInsert' : true , 'context' : true } , (err , photoUpdate) => {
																																																								
																																																								if (err) {
																																																														return config.errResponse(res , 400 , err);		}

																																																			if (photoUpdate) {
																																																														photoDelete.delete(photoResult.photo_detail.location);		}

																																																														return config.response(res , 201 , photoUpdate);		});		}
					else {
									Photo.findOneAndUpdate({'url' : photo } , 

													{'$set' : pValue} , {'new' : true , 'runValidators' : true , 'setDefaultsOnInsert' : true , 'context' : true } , (err , photoUpdate) => {
																																																								
																																																									if (err) {
																																																															return config.errResponse(res , 400 , err);		}

																																																															return config.response(res , 201 , photoUpdate);		});		}			});		} 
			else {
							config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});		}
	} , 

	'photoDelete' : (req , res , next) => {	photo = req.params.photo;

		if (req.params && req.params.photo) {

									Photo.findOne({'url' : photo })																		
																									.lean({})

																									.select(`-_id title url`)
																									
																									.exec((err , photoResult) => {
 
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
																																								
																																									return config.response(res , 200 , photoResult);		})		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} , 

	'photoDeleteSubmit' : (req , res , next) => {	photo = req.params.photo;

		if (req.params.photo) {

			Photo.findOne({'url' : photo })
																			.lean({})

																			.exec((err , photoResult) => {
				if (!photoResult) {	
															return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}

						if (photoResult.photo_detail.location) {
										
							Photo.findOneAndDelete({'url' : photoResult.url})
																																.exec((err , photoResult1) => {
																															
																																if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (photoResult) {
																																						photoDelete.delete(photoResult.photo_detail.location);

																																						Photo.deleteComments(photoResult.url);

																																						Photo.deleteReply(photoResult.url);		

																																						Photo.deleteVotes(photoResult.url);		}

																																						return config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});			})	}
																			else {
							
							Photo.findOneAndDelete({'url' : photoResult.url})
																																.exec((err , photoResult1) => {
																																										
																																if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (photoResult) {
																																						photoDelete.delete(photoResult.photo_detail.location);

																																						Photo.deleteComments(photoResult.url);

																																						Photo.deleteReply(photoResult.url);		

																																						Photo.deleteVotes(photoResult.url);		}

																																						return config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})		}			});			
			}	else {
								config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}
	} ,

	'photoVote' : (req , res , next) => { photo = req.params.photo;

		if (req.params.photo) {

			Photo.findOne({'url' : photo })
																			.lean({})

																			.exec((err , photoResult) => {
																														
																																if (err) {
																																											return config.errResponse(res , 400 , err);		}
																																if (!photoResult) {
																																											return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'}); 	}
					if (photoResult) {

												Photo.findVotes(photo)
																							.lean({})

																							.populate({'path' : 'users' , 'select' : 'full_name username -_id'})

																							.populate({'path' : 'entry' , 'select' : 'title url -_id'})

																							.select({'createdAt' : 0})

																							.exec((err , voterResult) => {
																													
																																if (err) {
																																											return config.errResponse(res , 400 , err);			}

																														if (!voterResult) {	
																																											return config.response(res , 404 , {'message' : 'Vote entry does not exists in the record or is not available.'});  }
																																											
																																											return config.response(res , 200 , voterResult);						})		}			});			} 	
			else {
							config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}
		} ,

	'photoAddVote' : (req , res , next) => { photo = req.params.photo , voted = '';

	console.log(req.body);

		if (req.params.photo) {

			Photo.findOne({'url' : photo })
																			.lean({})

																			.exec((err , photoResult) => {
																														
																																if (err) {
																																											return config.errResponse(res , 400 , err);		}
																																if (!photoResult) {
																																											return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'}); 	}
					if (photoResult) {

												Photo.findVotes(photo)
																							.lean({})

																							.exec((err , voterResult) => {
																													
																																if (err) {
																																											return config.errResponse(res , 400 , err);			}

																														else if (!voterResult) {		var vote = new PhotoVote({'entry_slug' : photo , 'votes' : 1 , 'voters' : [req.body.author]})

																					vote.save((err , voteSave) => {
																																			
																																			if (err) {
																																											return config.errResponse(res , 400 , err);			}

																																											return config.response(res , 200 , voteSave);			});			}
																																			else {
							voterResult.voters.find((id) => {

							if (id == req.body.author) {	userVote.voted = true;

										return true;		}		});
																															if (userVote.voted) {
																																											return config.response(res , 400 , {'message' : 'You can\'t vote more than once for an entry.'});		}		
																															else {

			PhotoVote.findOneAndUpdate({'entry_slug' : photoResult.url} , {'$addToSet' : {'voters' : req.body.author } , '$inc' : {'votes' : 1}} , {'new' : true , 'runValidators' : true })

																	.lean({})

																	.select({'votes' : 1 , '_id' : 0})

																	.exec((err , voteResult) => {
																																	if (err) {
																																											return config.errResponse(res , 400 , err);		}

																																											return config.response(res , 201 , voteResult); 		});		}			}				})		}			});			} 	
			else {
							config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}
		} ,

	'photoCommentVote' : (req , res , next) => { photo = req.params.photo , voted = '' , comment = req.params.comment;

	console.log(req.body);

		if (req.params.photo) {

			Photo.findOne({'url' : photo })
																			.lean({})

																			.exec((err , photoResult) => {
																														
																																if (err) {
																																											return config.errResponse(res , 400 , err);		}
																																if (!photoResult) {
																																											return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'}); 	}
					if (photoResult) {

			PhotoComment.findOne({'_id' : comment})
																							.lean({})

																							.exec((err , voterResult) => {
																													
																																if (err) {
																																											return config.errResponse(res , 400 , err);			}

																																if (!voterResult) {		var vote = new PhotoCommentVote({'entry_slug' : photo , 'votes' : 1 , 'voters' : [req.body.author]})

															return vote.save((err , voteSave) => {
																																			if (err) {
																																											return config.errResponse(res , 400 , err);			}

																																											return config.response(res , 200 , voteSave);			});			}
							voterResult.voters.find((id) => {

										if (id == req.body.author) {		userVote.voted = true;

												return true;		}		});
																															if (userVote.voted) {
																																											return config.response(res , 400 , {'message' : 'You can\'t vote more than once for an entry.'});		}		
																															else {

		PhotoCommentVote.findOneAndUpdate({'slug' : photoResult.url} , {'$addToSet' : {'voters' : req.body.author } , '$inc' : {'votes' : 1}} , {'new' : true , 'runValidators' : true })

																	.lean({})

																	.select({'votes' : 1 , '_id' : 0})

																	.exec((err , voteResult) => {
																																	if (err) {
																																											return config.errResponse(res , 400 , err);		}

																																											return config.response(res , 201 , voteResult); 		});		}		})		}			});			} 	
			else {
							config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}
		} ,

	'photoComment' : (req , res) => { 	photo = req.params.photo;
		
		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})
																		
																			.select('title -_id')
																							
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
										Photo.findComments(photo)
																								.lean({})

																								.populate({'path' : 'author' , 'select' : 'full_name -_id'})			.lean({})

																								.select('text updatedAt')

																								.exec((err , commentResult) => {
												if (err) {
																														return config.response(res , 400 , err);	}
												if (commentResult.length == 0) {
																														return config.response(res, 404 , {'message' : 'Comments do not exists in the record or is not available for this entry.'});			}
			$photoComment = {
												'title' : photoResult.title ,

												'comments' : commentResult	};
																														return config.response(res , 200 , $photoComment);			});				})		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	'photoCommentDetail' : (req , res , next) => { var photo = req.params.photo , comment = req.params.comment;

			if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : comment , 'entry_slug' : photoResult.url})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})			.lean({})

																																							.populate({'path' : 'entry' , 'select' : 'title -_id'})						.lean({})

																																							.populate({'path' : 'replies' , 'select' : 'text -_id' , 'options' : {'limit' : 2}})

																																							.select('slug text updatedAt entry_slug -_id')

																																							.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment entry does not exists or is not available for this entry.'});			}
									$photoComment = {	'photo' : photoResult ,

																		'comment' : commentResult		};
																																									return config.response(res , 200 , $photoComment);			});				}
				else {
								config.response(res , 404 , {'message' : 'No comment id provided. Please provide a valid comment id.'});		} 	});	 		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'photoAddComment' : (req , res) => { var  photo = req.params.photo;

		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('url title -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}

																																									return config.response(res , 200 , photoResult);					});	 }
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	'photoAddCommentSubmit' : (req , res) => {	var comment = new PhotoComment(req.body) , photo = req.params.photo;

		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('url title -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
				comment.save((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}	
																														else {
			$photoComment = {	'photo' : photoResult ,

												'comment' : commentResult		};
																																									return config.response(res , 200 , $photoComment);		}			});			});	 }
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	'photoCommentUpdate' : (req , res , next) => {  var photo = req.params.photo , comment = req.params.comment;

		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : comment , 'entry_slug' : photoResult.url})
																																								.lean({})

																																								.populate({'path' : 'author' , 'select' : 'full_name -_id'})			

																																								.lean({})

																																								.select('text slug updatedAt')

																																								.exec((err , commentResult) => {
																												if (err) {
																																									return config.response(res , 400 , err);	}
																												if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment does not exists in the record or is not available for this entry.'});		}
										$photoComment = {	'photo' : photoResult ,

																			'comment' : commentResult		};
																																									return config.response(res , 200 , $photoComment);			});				}
				else {
								config.response(res , 404 , {'message' : 'No Comment id provided. Please provide a valid comment id.'});		}		 	});	 		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	'photoCommentUpdateSubmit' : (req , res , next) => { var photo = req.params.photo , comment = req.params.comment;

		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
				if (req.params && req.params.comment) {

		PhotoComment.findOneAndUpdate({'_id' : comment , 'entry_slug' : photoResult.url} , {'$set' : req.body } , {'new' : true , 'runValidators' : true , 'setDefaultsOnInsert' : true , 'context' : true })

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})			

									.lean({})

									.select({'text' : 1 , 'entry_slug' : 1 , 'updatedAt' : 1 , 'status' : 1})

									.exec((err , commentResult) => {
																												if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!commentResult) {
																																							return config.response(res , 404 , {'message' : 'Comment does not exists in the record or is not available for this entry.'});	}
									$commentUpdate = {	'photo' : photoResult ,

																			'comment' : commentResult		};
																																							return config.response(res , 201 , $commentUpdate); 			});  		} 
				else {
									config.response(res , 404 , {'message' : 'No Comment id provided. Please provide a valid comment id.'});			} 		}); 		} 
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'photoCommentDeleteAll' : (req , res , next) => {	photo = req.params.photo;

				if (req.params && req.params.photo) {

				Photo.findOne({'url' : photo })
																				.lean({})

																				.exec((err , photoResult) => {	
								if (!photoResult) {	
																				return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});	}

				PhotoComment.findOneAndDelete({'entry_slug' : photo } , {'multi' : true } , (err , commentDeletedAll) => {
																																																										if (err) {
																																																																return config.errResponse(res , 400 , err);		}

																																																																return config.response(res , 201 , commentDeletedAll);		});			});		} 
			else {
								config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}
		} , 

	'photoCommentDelete' : (req , res , next) => { var photo = req.params.photo , cParam = req.params.comment;

		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.select('title url')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : cParam , 'entry_slug' : photoResult.url})
																																								.lean({})

																																								.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																								.lean({})

																																								.select('text updatedAt')

																																								.exec((err , commentResult) => {
																												if (err) {
																																									return config.response(res , 400 , err);	}
																												if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment does not exists in the record or is not available for this entry.'});		}
										$photoComment = {	'photo' : photoResult ,

																			'comment' : commentResult		};
																																									return config.response(res , 200 , $photoComment);			});				}
				else {
								config.response(res , 404 , {'message' : 'No Comment id provided. Please provide a valid comment id.'});		}		 	});	 		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'photoCommentDeleteSubmit' : (req , res , next) => { var {photo , comment} = req.params;

		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
				if (req.params && req.params.comment) {

			PhotoComment.findOneAndDelete({'_id' : comment , 'entry_slug' : photoResult.url})

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})

									.lean({})

									.select({'text' : 1 , 'entry_slug' : 1 , 'updatedAt' : 1 , 'status' : 1})

									.exec((err , commentUpdate) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																											else if (!commentUpdate) {
																																									return config.response(res , 404 , {'message' : 'Comment entry does not exists in the record or is not available.'});		}

																																									return config.response(res , 201 , commentUpdate); 			});  	} 
				else {
									config.response(res , 404 , {'message' : 'No Comment id provided. Please provide a valid comment id.'});			} 		}); 		} 
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'photoReply' : (req , res) => { 	photo = req.params.photo;
		
		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})
																		
																			.select('title url -_id')
																							
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
				if (photoResult) {
														Photo.findReplies(photo)
																										.lean({})

																										.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																										.lean({})

																										.select('text updatedAt')

																										.exec((err , replyResult) => {
														if (err) {
																																return config.response(res , 400 , err);	}
														if (replyResult.length == 0) {
																																return config.response(res, 404 , {'message' : 'Replies do not exists in the record or is not available for this entry.'});			}
					$photoResult = {
														'photo' : photoResult ,

														'replies' : replyResult	};
																																return config.response(res , 200 , $photoResult);			});			}			});		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	'photoReplyDetail' : (req , res , next) => { var photo = req.params.photo , reply = req.params.reply;

			if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.reply) {

			PhotoReply.findOne({'_id' : reply , 'entry_slug' : photoResult.url})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																							.lean({})																																							

																																							.populate({'path' : 'entry' , 'select' : 'title -_id'})			

																																							.lean({})

																																							.populate({'path' : 'comment' , 'select' : 'text slug -_id'})

																																							.lean({})

																																							.select('text updatedAt entry_slug comment_slug -_id')

																																							.exec((err , replyResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!replyResult) {
																																									return config.response(res, 404 , {'message' : 'Reply entry does not exists or is not available for this entry.'});			}
									$photoReply = {	'photo' : photoResult  ,

																		'reply' : replyResult		};
																																									return config.response(res , 200 , $photoReply);			});				}
				else {
								config.response(res , 404 , {'message' : 'No reply id provided. Please provide a valid reply id.'});		} 	});	 		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'photoAddReplytoComment' : (req , res) => { var  photo = req.params.photo , comment = req.params.comment;

		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('url title -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}

			PhotoComment.findOne({'entry_slug' : photoResult.url , '_id' : comment})
																																								.lean({})

																																								.select('slug text entry_slug updatedAt')

																																								.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!commentResult) {
																																									return config.response(res , 404 , {'message' : 'Comment entry does not exists in the record or is not available.'});		}
									$photoComment = {	'photo' : photoResult ,

																		'comment' : commentResult		};
																																									return config.response(res , 200 , $photoComment);	});		})		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	'photoAddReplyToCommentSubmit' : (req , res) => {	var reply = new PhotoReply(req.body) , photo = req.params.photo , comment = req.params.comment;

		if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('url title -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (photoResult) {

			PhotoComment.findOne({'_id' : comment })
																							.lean({})

																							.select('slug text -_id')
																							
																							.exec((err , commentResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!commentResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (commentResult) {

				reply.set('entry_slug' , photoResult.url);

				reply.set('comment_slug' , commentResult.slug);

				reply.populate({'path' : 'author' , 'select' : 'full_name -_id'});

																		reply.save((err , replyResult) => {
																																				if (err) {
																																										return config.errResponse(res , 400 , err);		}	
																																					else {
											$photoReply = {	'photo' : photoResult ,

																			'comment' : commentResult ,

																			'reply' : replyResult		};
																																									return config.response(res , 200 , $photoReply);		}			});			}				});			}				});	 		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	'photoReplyUpdate' : (req , res , next) => { var photo = req.params.photo , reply = req.params.reply , comment = req.params.comment;

			if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : comment , 'entry_slug' : photoResult.url})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})			

																																							.populate({'path' : 'entry' , 'select' : 'title -_id'})			

																																							.select('text updatedAt entry_slug -_id')

																																							.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment entry does not exists or is not available for this entry.'});			}
			if (req.params && req.params.reply) {

			PhotoReply.findOne({'_id' : reply , 'entry_slug' : photoResult.url})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																							.lean({})

																																							.populate({'path' : 'entry' , 'select' : 'title -_id'})

																																							.lean({})

																																							.populate({'path' : 'comment' , 'select' : 'text slug -_id'})

																																							.lean({})

																																							.select('text updatedAt entry_slug comment_slug -_id')

																																							.exec((err , replyResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!replyResult) {
																																									return config.response(res, 404 , {'message' : 'Reply entry does not exists or is not available for this entry.'});			}


									$photoComment = {	'photo' : photoResult  ,

																		'comment' : commentResult ,

																		'reply' : replyResult		};
																																									return config.response(res , 200 , $photoComment);			});				}
				else {
								config.response(res , 404 , {'message' : 'No reply id provided. Please provide a valid reply id.'});		}					});				}
				else {
								config.response(res , 404 , {'message' : 'No comment id provided. Please provide a valid reply id.'});		} 			});	 			}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'photoReplyUpdateSubmit' : (req , res , next) => { var photo = req.params.photo , reply = req.params.reply , comment = req.params.comment;

			if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : comment , 'entry_slug' : photoResult.url})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'title -_id'})			

																																							.lean({})

																																							.select('text updatedAt entry_slug -_id')

																																							.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment entry does not exists or is not available for this entry.'});			}
			if (req.params && req.params.reply) {

		PhotoReply.findOneAndUpdate({'_id' : reply , 'entry_slug' : photoResult.url} , {'$set' : req.body } , {'new' : true , 'runValidators' : true , 'setDefaultsOnInsert' : true , 'context' : true })

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})			

									.populate({'path' : 'entry' , 'select' : 'title -_id'})			

									.populate({'path' : 'comment' , 'select' : 'text slug -_id'})			

									.select({'text' : 1 , 'entry_slug' : 1 , 'comment_slug' : 1 , 'updatedAt' : 1 , 'status' : 1})

									.exec((err , replyResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!replyResult) {
																																									return config.response(res , 404 , {'message' : 'Reply entry does not exists in the record or is not available.'});		}
										$replyUpdate = {	'photo' : photoResult ,

																			'comment' : commentResult	,

																			'reply' : replyResult};
																																									return config.response(res , 201 , $replyUpdate); 			});			}
				else {
								config.response(res , 404 , {'message' : 'No reply id provided. Please provide a valid reply id.'});		}					});				}
				else {
								config.response(res , 404 , {'message' : 'No comment id provided. Please provide a valid reply id.'});		} 			});	 			}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'photoReplyDelete' : (req , res , next) => { var photo = req.params.photo , reply = req.params.reply , comment = req.params.comment;

			if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : comment , 'entry_slug' : photoResult.url})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																							.lean({})

																																							.populate({'path' : 'entry' , 'select' : 'title -_id'})

																																							.lean({})

																																							.select('text updatedAt entry_slug -_id')

																																							.exec((err , replyResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!replyResult) {
																																									return config.response(res, 404 , {'message' : 'Comment entry does not exists or is not available for this entry.'});			}
			if (req.params && req.params.reply) {

			PhotoReply.findOne({'_id' : reply , 'entry_slug' : photoResult.url})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																							.lean({})

																																							.populate({'path' : 'entry' , 'select' : 'title -_id'})

																																							.lean({})

																																							.populate({'path' : 'comment' , 'select' : 'text slug -_id'})

																																							.lean({})

																																							.select('text updatedAt entry_slug comment_slug -_id')

																																							.exec((err , replyResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!replyResult) {
																																									return config.response(res, 404 , {'message' : 'Reply entry does not exists or is not available for this entry.'});			}
									$photoComment = {	'photo' : photoResult  ,

																		'reply' : replyResult		};
																																									return config.response(res , 200 , $photoComment);			});				}
				else {
								config.response(res , 404 , {'message' : 'No reply id provided. Please provide a valid reply id.'});		}					});				}
				else {
								config.response(res , 404 , {'message' : 'No comment id provided. Please provide a valid reply id.'});		} 			});	 			}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'photoReplyDeleteSubmit' : (req , res , next) => { var photo = req.params.photo , reply = req.params.reply , comment = req.params.comment;

			if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : comment , 'entry_slug' : photoResult.url})
																																							.lean({})

																																							.populate('author' , {'full_name' : 1 , '_id' : 0})

																																							.populate('entry' , {'title' : 1 , '_id' : 0})

																																							.populate('comment' , {'text' : 1 , 'slug' : 1 , '_id' : 0})

																																							.select('text updatedAt entry_slug comment_slug -_id')

																																							.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment entry does not exists or is not available for this entry.'});			}
			if (req.params && req.params.reply) {

			PhotoReply.findOneAndDelete({'_id' : reply , 'entry_slug' : photoResult.url})

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})

									.lean({})

									.populate({'path' : 'entry' , 'select' : 'title -_id'})

									.lean({})

									.populate({'path' : 'comment' , 'select' : 'text slug -_id'})

									.lean({})

									.select('text updatedAt entry_slug comment_slug -_id')

									.exec((err , replyUpdate) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!replyUpdate) {
																																									return config.response(res , 404 , {'message' : 'Reply entry does not exists in the record or is not available.'});		}

																																									return config.response(res , 201 , replyUpdate); 			});  		}
				else {
								config.response(res , 404 , {'message' : 'No reply id provided. Please provide a valid reply id.'});		}					});				}
				else {
								config.response(res , 404 , {'message' : 'No comment id provided. Please provide a valid reply id.'});		} 			});	 			}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'photoReplyDeleteAll' : (req , res , next) => { var photo = req.params.photo , reply = req.params.reply , comment = req.params.comment;

			if (req.params && req.params.photo) {
			
			Photo.findOne({'url' : photo })
																			.lean({})

																			.select('title url -_id')
																			
																			.exec((err , photoResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!photoResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : comment , 'entry_slug' : photoResult.url})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																							.lean({})

																																							.populate({'path' : 'entry' , 'select' : 'title -_id'})

																																							.lean({})

																																							.select('text updatedAt entry_slug -_id')

																																							.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment entry does not exists or is not available for this entry.'});			}
			if (req.params && req.params.reply) {

			PhotoReply.findOneAndDelete({'_id' : reply , 'entry_slug' : photoResult.url})

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})

									.lean({})

									.populate({'path' : 'entry' , 'select' : 'title -_id'})

									.lean({})

									.populate({'path' : 'comment' , 'select' : 'text slug -_id'})

									.lean({})

									.select('text updatedAt entry_slug comment_slug -_id')


									.exec((err , replyUpdate) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!replyUpdate) {
																																									return config.response(res , 404 , {'message' : 'Comment entry does not exists in the record or is not available.'});		}

																																									return config.response(res , 201 , replyUpdate); 			});  		}
				else {
								config.response(res , 404 , {'message' : 'No reply id provided. Please provide a valid reply id.'});		}					});				}
				else {
								config.response(res , 404 , {'message' : 'No comment id provided. Please provide a valid reply id.'});		} 			});	 			}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	'objectDelete' : (req , res , next) => {	photo = req.params.object;

		if (photo) {
														photoDelete.objectDelete(req, res , next , photo);
																																	
			}	else {
							return config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}
		
	} 
	
}				