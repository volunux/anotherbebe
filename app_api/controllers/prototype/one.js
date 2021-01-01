const async = require('async');

const Eyon = require('../models/eyon');

const Country = require('../models/country'); 

const Century = require('../models/century'); 

const Specie = require('../models/specie');

const Photo = require('../models/photo'); 

const Genre = require('../models/genre');

const Continent = require('../models/continent');

const Region = require('../models/region');

const PhotoComment = require('../models/comment_model/photo_comment')('Model.Comment' , 'photo.comments' , 'Photo' , 'photo.comment.Reply');

const PhotoReply = require('../models/comment_model/photo_reply');

const config = require('../config/config');

const photoDelete = require('../config/deleteObject/photoObject');

var ethnic = '' , country = '' , photo = '' , $eBody = '' , $eParam = '' , eyonId = '' , countryId = '' , userVote = {'voted' : ''};

module.exports = {

	[all] : (req , res , next) => {

		Model.find({})
									.lean({})

									.populate('author' , {'full_name' : 1 , '_id' : 0})		.lean({})

									.populate('continent' , {'name' : 1 , '_id' : 0})			.lean({})

									.populate('country' , {'name' : 1 , '_id' : 0})				.lean({})

									.populate('century' , {'century' : 1 , '_id' : 0})		.lean({})

									.populate('ethnic_group' , {'eyon' : 1 , '_id' : 0})	.lean({})

									.populate('genre' , {'genre' : 1 , '_id' : 0})				.lean({})

									.populate('region' , {'name' : 1 , '_id' : 0})				.lean({})

									.select(`-_id title date photo_detail.location author continent country century ethnic_group genre region`)

									.limit(20)
															.exec((err , entryResult) => {
																									
																				if (err) {
																																				return config.errResponse(res , 400 , err);		}
																				if (entryResult.length == 0) {
																																				return config.response(res , 404 , {'message' : 'Photo entries does not exists in the record or is not available.'});		}

																																				return config.response(res , 200 , entryResult);		});
	} , 

	[ethnic] : (req , res , next) => {	ethnic = req.params.ethnic;

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

			Model.find({'ethnic_group' : eyonId._id})													.lean({})

									.populate('author' , {'full_name' : 1 , '_id' : 0})		.lean({})

									.populate('continent' , {'name' : 1 , '_id' : 0})			.lean({})

									.populate('country' , {'name' : 1 , '_id' : 0})				.lean({})

									.populate('century' , {'century' : 1 , '_id' : 0})		.lean({})

									.populate('ethnic_group' , {'eyon' : 1 , '_id' : 0})	.lean({})

									.populate('genre' , {'genre' : 1 , '_id' : 0})				.lean({})

									.populate('region' , {'name' : 1 , '_id' : 0})				.lean({})

									.select(`-_id title date photo_detail.location author continent country century ethnic_group genre region`)

									.limit(20)
																								.exec((err , photoResult) => {
																																								
																															if (err) {
																																															return config.errResponse(res , 400 , err);		}
																															if (photoResult.length == 0) {
																																															return config.response(res , 404 , {'message' : 'No photo entries available for this ethnic group.'});		}
																																															
																																															return config.response(res , 200 , photoResult);		})		}			});
	} ,

	[country] : (req , res , next) => {	country = req.params.country;

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

			Model.find({'country' : countryId._id})														.lean({})

									.populate('author' , {'full_name' : 1 , '_id' : 0})		.lean({})

									.populate('continent' , {'name' : 1 , '_id' : 0})			.lean({})

									.populate('country' , {'name' : 1 , '_id' : 0})				.lean({})

									.populate('century' , {'century' : 1 , '_id' : 0})		.lean({})

									.populate('ethnic_group' , {'eyon' : 1 , '_id' : 0})	.lean({})

									.populate('genre' , {'genre' : 1 , '_id' : 0})				.lean({})

									.populate('region' , {'name' : 1 , '_id' : 0})				.lean({})

									.select(`-_id title date photo_detail.location author continent country century ethnic_group genre region`)

									.limit(20)														
																								.exec((err , entryResult) => {
																												
																											if (err) {
																																												return config.errResponse(res , 400 , err);		}
																											if (entryResult.length == 0) {
																																												return config.response(res , 404 , {'message' : 'No photo entries available for this country or state.'});		}

																																												return config.response(res , 200 , entryResult);			})	}		});
	} ,
		
	[detail] : (req , res , next) => {	photo = req.params.photo;

		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })																		.lean({})

									.populate('author' , {'full_name' : 1 , '_id' : 0})		.lean({})

									.populate('continent' , {'name' : 1 , '_id' : 0})			.lean({})

									.populate('country' , {'name' : 1 , '_id' : 0})				.lean({})

									.populate('century' , {'century' : 1 , '_id' : 0})		.lean({})

									.populate('ethnic_group' , {'eyon' : 1 , '_id' : 0})	.lean({})

									.populate('genre' , {'genre' : 1 , '_id' : 0})				.lean({})

									.populate('region' , {'name' : 1 , '_id' : 0})				.lean({})

									.select(`-_id title date photo_detail.location author continent country century ethnic_group genre region`)
																															
																															.exec((err , entryResult) => {
 
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
																																								
																																									return config.response(res , 200 , entryResult);		})		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} , 

	[add] : (req , res , next) => {		
		
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

	[addSubmit] : (req , res , next) => {	photo = new Photo(req.body);

		photo.save((err , entryResult) => {
																					if (err) {
																												return config.errResponse(res , 400 , err);		}	
																					else {
																												return config.response(res , 200 , entryResult);		}			});
	} , 

	[update] : (req , res , next) => {		photo = req.params.photo.toString();

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
																															Model.findOne({'url' : photo })
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

	[updateSubmit] : (req , res , next) => {	pValue = req.body , photo = req.params.photo;

				if (req.params && req.params.photo) {

				Model.findOne({'url' : photo })
																				.lean({})

																				.exec((err , entryResult) => {	
								if (!entryResult) {	
																			return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});	}

					if (entryResult.photo_detail.location && pValue.photo_detail) {
									
									photoDelete.delete(entryResult.photo_detail.location);

								Model.findOneAndUpdate({'url' : photo } , 

												{'$set' : pValue} , {'new' : true , 'runValidators' : true , 'setDefaultsOnInsert' : true , 'context' : true } , (err , photoUpdate) => {
																																																								
																																																								if (err) {
																																																														return config.errResponse(res , 400 , err);		}

																																																														return config.response(res , 201 , photoUpdate);		});	}
					else {
									Model.findOneAndUpdate({'url' : photo } , 

													{'$set' : pValue} , {'new' : true , 'runValidators' : true , 'setDefaultsOnInsert' : true , 'context' : true } , (err , photoUpdate) => {
																																																								
																																																									if (err) {
																																																															return config.errResponse(res , 400 , err);		}

																																																															return config.response(res , 201 , photoUpdate);		});		}
														});
			} else {
								config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}
	} , 

	[deleteSubmit] : (req , res , next) => {	photo = req.params.photo;

		if (req.params.photo) {

			Model.findOne({'url' : photo })
																			.lean({})

																			.exec((err , entryResult) => {
				if (!entryResult) {	
															return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}

						if (entryResult.photo_detail.location) {
										
										photoDelete.delete(entryResult.photo_detail.location);

							Model.findOneAndDelete({'url' : entryResult.url})
																																.exec((err , entryResult1) => {
																															
																																if (err) {
																																						return config.errResponse(res , 400 , err);		}

																																						return config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});			})	}
																			else {
							
							Model.findOneAndDelete({'url' : entryResult.url})
																																.exec((err , photoResult1) => {
																																										
																																if (err) {
																																						return config.errResponse(res , 400 , err);		}

																																						return config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})		}			});			
			}	else {
								config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}
	} ,

	[vote] : (req , res , next) => { pValue = req.params.photo , voted = '';

		if (req.params.photo) {

			Model.findOne({'url' : pValue } , {'voters_id' : 1 , 'votes' : 1 , '_id' : 0} )
																																											.lean({})

																																											.exec((err , photo) => {

				if (!photo) {
											return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});

				} else {
									photo.voters_id.filter((id) => {

												if (id == req.body.author) {

														userVote.voted = true;

														return true;		}
											});

					if (userVote.voted) {
																return config.response(res , 400 , {'message' : 'You can\'t vote more than once for an entry.'});
					}		else {
											photo.vote = photo.vote + 1;

											photo.voters_id.push(req.body.author);
						
											photo.save((err , entryResult) => {
																													if (err) {
																																			return config.errResponse(res , 400 , err);		} 
																													else {
																																			return config.response(res , 200 , {'vote' : entryResult.vote });			}		});		}	
											}			});	
			} 	else {
									config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}

		} ,

	[comment] : (req , res) => { 	photo = req.params.photo;
		
		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.lean({})
																		
																			.select('title')
																							
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			PhotoComment.find({'entry_slug' : photo })
																								.lean({})

																								.populate('author' , {'full_name' : 1 , '_id' : 0})

																								.select('text updatedAt')

																								.exec((err , commentResult) => {
												if (err) {
																														return config.response(res , 400 , err);	}
												if (commentResult.length == 0) {
																														return config.response(res, 404 , {'message' : 'Comments do not exists in the record or is not available for this entry.'});			}
			$entryResult = {
												'title' : entryResult.title ,

												'comments' : commentResult	};
																														return config.response(res , 200 , $entryResult);			});				})		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	[commentDetail] : (req , res , next) => { var photo = req.params.photo , comment = req.params.comment;

			if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.lean({})

																			.select('title url')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : comment , 'entry_slug' : entryResult.url})
																																							.lean({})

																																							.populate('author' , {'full_name' : 1 , '_id' : 0})

																																							.select('text updatedAt -_id')

																																							.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);	}
																													if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment does not exists or is not available for this entry.'});			}
									$photoComment = {	'photo' : {
																									'title' : entryResult.title ,

																									'url' : entryResult.url 	} ,

																		'comment' : commentResult		};
																																									return config.response(res , 200 , $photoComment);			});				}
				else {
								config.response(res , 404 , {'message' : 'No comment id provided. Please provide a valid comment id.'});		} 	});	 		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	[addComment] : (req , res) => { var  photo = req.params.photo;

		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.lean({})

																			.select('url title -_id')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}

																																									return config.response(res , 200 , entryResult);					});	 }
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	[addCommentSubmit] : (req , res) => {	var comment = new PhotoComment(req.body) , photo = req.params.photo;

		console.log('Hello World');

		console.log(comment);

		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.lean({})

																			.select('url')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
				comment.save((err , commentResult) => {
																													if (err) {
																																			return config.errResponse(res , 400 , err);		}	
																														else {
			$photoComment = {	'photo' : {
																			'title' : entryResult.title ,

																			'url' : entryResult.url 	} ,

												'comment' : commentResult		};
																																			return config.response(res , 200 , $photoComment);		}			});			});	 }
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	[updateComment] : (req , res , next) => {  var photo = req.params.photo , comment = req.params.comment;

		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.lean({})

																			.select('title url')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : comment , 'entry_slug' : entryResult.url})
																																								.lean({})

																																								.populate('author' , {'full_name' : 1 , '_id' : 0})

																																								.select('text updatedAt')

																																								.exec((err , commentResult) => {
																												if (err) {
																																									return config.response(res , 400 , err);	}
																												if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment does not exists in the record or is not available for this entry.'});		}
										$photoComment = {	'photo' : {
																										'title' : entryResult.title ,

																										'url' : entryResult.url 	} ,

																			'comment' : commentResult		};
																																									return config.response(res , 200 , $photoComment);			});				}
				else {
								config.response(res , 404 , {'message' : 'No Comment id provided. Please provide a valid comment id.'});		}		 	});	 		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	[updateCommentSubmit] : (req , res , next) => { var photo = req.params.photo , comment = req.params.comment;

		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.lean({})

																			.select('title url')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
				if (req.params && req.params.comment) {

		PhotoComment.findOneAndUpdate({'_id' : comment , 'entry_slug' : entryResult.url} , {'$set' : req.body } , {'new' : true , 'runValidators' : true , 'setDefaultsOnInsert' : true , 'context' : true })

									.lean({})

									.populate('author' , {'full_name' : 1 , '_id' : 0})

									.select({'text' : 1 , 'entry_slug' : 1 , 'updatedAt' : 1 , 'status' : 1})

									.exec((err , commentResult) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																											else if (!commentResult) {
																																									return config.response(res , 404 , {'message' : 'Comment entry does not exists in the record or is not available.'});		}

										$commentUpdate = {	'photo' : {
																										'title' : entryResult.title ,

																										'url' : entryResult.url 	} ,

																			'comment' : commentResult		};

																																									return config.response(res , 201 , $commentUpdate); 			});  
				} else {
									config.response(res , 404 , {'message' : 'No Comment id provided. Please provide a valid comment id.'});			} 		}); 		} 
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	[commentDeleteAll] : (req , res , next) => {	photo = req.params.photo;

				if (req.params && req.params.photo) {

				Model.findOne({'url' : photo })
																				.lean({})

																				.exec((err , entryResult) => {	
								if (!entryResult) {	
																				return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});	}

				PhotoComment.findOneAndDelete({'entry_slug' : photo } , {'multi' : true } , (err , commentDeletedAll) => {
																																																										if (err) {
																																																																return config.errResponse(res , 400 , err);		}

																																																																return config.response(res , 201 , commentDeletedAll);		});			});
			} else {
								config.response(res , 404 , {'message' : 'No photo id provided. Please provide a valid photo id.'});		}
		} , 

	[commentDelete] : (req , res , next) => { var photo = req.params.photo , cParam = req.params.comment;

		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.select('title url')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
			if (req.params && req.params.comment) {

			PhotoComment.findOne({'_id' : cParam , 'entry_slug' : entryResult.url})
																																								.lean({})

																																								.populate('author' , {'full_name' : 1 , '_id' : 0})

																																								.select('text updatedAt')

																																								.exec((err , commentResult) => {
																												if (err) {
																																									return config.response(res , 400 , err);	}
																												if (!commentResult) {
																																									return config.response(res, 404 , {'message' : 'Comment does not exists in the record or is not available for this entry.'});		}
										$photoComment = {	'photo' : {
																										'title' : entryResult.title ,

																										'url' : entryResult.url 	} ,

																			'comment' : commentResult		};
																																									return config.response(res , 200 , $photoComment);			});				}
				else {
								config.response(res , 404 , {'message' : 'No Comment id provided. Please provide a valid comment id.'});		}		 	});	 		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	[commentDeleteSubmit] : (req , res , next) => { var {photo , comment} = req.params;

		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.lean({})

																			.select('title url')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
				if (req.params && req.params.comment) {

			PhotoComment.findOneAndDelete({'_id' : comment , 'entry_slug' : entryResult.url})

									.lean({})

									.populate('author' , {'full_name' : 1 , '_id' : 0})

									.select({'text' : 1 , 'entry_slug' : 1 , 'updatedAt' : 1 , 'status' : 1})

									.exec((err , commentUpdate) => {
																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																											else if (!commentUpdate) {
																																									return config.response(res , 404 , {'message' : 'Comment entry does not exists in the record or is not available.'});		}

																																									return config.response(res , 201 , commentUpdate); 			});  
				} else {
									config.response(res , 404 , {'message' : 'No Comment id provided. Please provide a valid comment id.'});			} 		}); 		} 
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
		} , 

	[photoAddReplyToComment] : (req , res) => { var  photo = req.params.photo , comment = req.params.comment;

		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.lean({})

																			.select('url title -_id')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}

			PhotoComment({'entry_slug' : entryResult.url , 'slug' : comment})
																																				.lean({})

																																				.exec((err , commentResult) => {
									$photoComment = {	'photo' : {
																									'title' : entryResult.title ,

																									'url' : entryResult.url 	} ,

																		'comment' : commentResult		};
																																									return config.response(res , 200 , $photoComment);	});		})		}
				else {
								config.response(res , 404 , {'message' : 'No Photo id provided. Please provide a valid photo id.'});			}
	} ,

	[addReplyToCommentSubmit] : (req , res) => {	var reply = new PhotoReply(req.body) , photo = req.params.photo , comment = req.params.comment;

		if (req.params && req.params.photo) {
			
			Model.findOne({'url' : photo })
																			.lean({})

																			.select('url')
																			
																			.exec((err , entryResult) => {

																													if (err) {
																																									return config.errResponse(res , 400 , err);		}
																													if (!entryResult) {
																																									return config.response(res , 404 , {'message' : 'Photo entry does not exists in the record or is not available.'});		}
				reply.entry_slug = entryResult.url;

				reply.comment_slug = comment;

																		reply.save((err , replyResult) => {
																																				if (err) {
																																										return config.errResponse(res , 400 , err);		}	
																																					else {
											$photoReply = {	'photo' : {
																											'title' : entryResult.title ,

																											'url' : entryResult.url 	} ,

																				'reply' : replyResult		};
																																									return config.response(res , 200 , $photoReply);		}			});			});	 }
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