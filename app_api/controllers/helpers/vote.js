var async = require('async') , $models = require('../../models/models') , config = require('../../config/config') , article = '' , userVote = {'voted' : false , 'newVote' : '' };

module.exports = ($ModelName , $ModelType , $ModelCommentF , $ModelReplyF , $ModelNameVote , $ModelCommentVoteF , $ModelReplyVoteF , $mName ) => {

				const $Model = $models[$ModelName];

				const $ModelComment = $models[$ModelCommentF];

				const $ModelReply = $models[$ModelReplyF];

				const $ModelVote = $models[$ModelNameVote];

				const $ModelCommentVote = $models[$ModelCommentVoteF];

				const $ModelReplyVote = $models[$ModelReplyVoteF];

	return {

	'entryVote' : (req , res , next) => { article = req.params.article;

		if (req.params && req.params.article) {

			$Model.findOne({'slug' : article })
																					.lean({})

																					.select(`title slug -_id`)

																					.exec((err , entryResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`}); 	}
				if (entryResult) {
														$Model.findVote(article)
																											.lean({})

																											.populate({'path' : 'users' , 'select' : 'full_name -_id'})									.lean({})

																											.select({'voters' : 1 , 'votes' : 1})

																											.exec((err , voteResult) => {

																										if (err) {
																																					return config.errResponse(res , 400 , err);			}
																										if (!voteResult) {	
																																					return config.response(res , 404 , {'message' : `Vote does not exists in the record or is not available for this entry.`});  }
															$entryVote = {
																							[$mName] : entryResult ,

																							'votes' : voteResult	};
																																					return config.response(res , 200 , $entryVote);						});		}			});			} 	
			else {
							return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}
		} ,

	'entryAddVote' : (req , res , next) => { article = req.params.article;

		if (req.params && req.params.article) {

			$Model.findOne({'slug' : article })
																					.lean({})

																					.select(`slug -_id`)

																					.exec((err , entryResult) => {

																										if (err) {
																																					return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																					return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`}); 	}
			if (entryResult) {
													$Model.findVote(article)
																										.lean({})

																										.select('voters entry_slug -_id')

																										.exec((err , voterResult) => {
																													
																																	if (err) {
																																												return config.errResponse(res , 400 , err);			}

																														else if (!voterResult) {		var vote = new $ModelVote({'entry_slug' : article , 'votes' : 1 , 'voters' : [req.body.author]});

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

			$ModelVote.findOneAndUpdate({'entry_slug' : entryResult.slug } , {'$addToSet' : {'voters' : req.body.author } , '$inc' : {'votes' : 1 }} , {'new' : true , 'runValidators' : true })

																	.lean({})

																	.select({'votes' : 1 , 'entry_slug' : 1 , '_id' : 0})

																	.exec((err , voteResult) => {
																																	if (err) {
																																											return config.errResponse(res , 400 , err);		}

																																											return config.response(res , 201 , voteResult); 		});		}			}				})		}			});			} 	
			else {
							return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}
		} ,

	'commentVote' : (req , res , next) => { comment = req.params.comment;

		if (req.params && req.params.comment) {

			$ModelComment.findOne({'slug' : comment })
																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , commentResult) => {

																											if (err) {
																																								return config.errResponse(res , 400 , err);		}
																											if (!commentResult) {
																																								return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available.`}); 	}
				if (commentResult) {
															
						$ModelCommentVote.findOne({'comment_slug' : comment })
																																		.lean({})

																																		.populate({'path' : 'users' , 'select' : 'full_name -_id'})									.lean({})

																																		.populate({'path' : 'comment' , 'select' : 'text slug -_id'})								.lean({})

																																		.select({'createdAt' : 0 , 'updatedAt' : 0})

																																		.exec((err , voteResult) => {
																									if (err) {
																																				return config.errResponse(res , 400 , err);			}
																									if (!voteResult) {	
																																				return config.response(res , 404 , {'message' : `Vote does not exists in the record or is not available for this comment entry.`});  }
								$entryCommentVote = {
																			[$mName] : commentResult ,

																			'votes' : voteResult	};
																																				return config.response(res , 200 , $entryCommentVote);						});		}			});			} 	
			else {
							config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid Comment id.`});		}
		} ,

	'commentAddVote' : (req , res , next) => { var { article , comment } = req.params;

		if (req.params && req.params.article) {

			$Model.findOne({'slug' : article })
																					.lean({})

																					.select(`slug -_id`)

																					.exec((err , entryResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`}); 	}
					if (entryResult && req.params.comment) {

			$ModelComment.findOne({'slug' : comment , 'entry_slug' : article})

																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , commentResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!commentResult) {
																																						return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available.`}); 	}
				if (commentResult) {

			$ModelCommentVote.findOne({'comment_slug' : comment})
																														.lean({})

																														.select(`slug voters -_id`)

																														.exec((err , voterResult) => {
																													
																											if (err) {
																																						return config.errResponse(res , 400 , err);			}

																											if (!voterResult) {		var vote = new $ModelCommentVote({'entry_slug' : article , 'comment_slug' : comment , 'votes' : 1 , 'voters' : [req.body.author]});

										return vote.save((err , voteSave) => {
																														if (err) {
																																						return config.errResponse(res , 400 , err);			}

																																						return config.response(res , 200 , voteSave);			});			}
							voterResult.voters.find((id) => {

										if (id == req.body.author) {		userVote.voted = true;

												return true;		}		});
																															if (userVote.voted) {
																																											return config.response(res , 400 , {'message' : `You can't vote more than once for an entry.`});		}		
																															else {

		$ModelCommentVote.findOneAndUpdate({'comment_slug' : comment } , {'$addToSet' : {'voters' : req.body.author } , '$inc' : {'votes' : 1}} , {'new' : true , 'runValidators' : true })

																	.lean({})

																	.select({'votes' : 1 , '_id' : 0})

																	.exec((err , voteResult) => {
																																	if (err) {
																																											return config.errResponse(res , 400 , err);		}

																																											return config.response(res , 201 , voteResult); 		});		}		});		}		});		}
					else {
									return config.response(res , 404 , {'message' : `No comment id provided. Please provide a valid comment id.`});		}			});			} 	
					else {
									return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}
		} ,

	'replyVote' : (req , res , next) => { var { article , reply } = req.params;

		if (req.params.reply) {

					$ModelReply.findOne({'slug' : reply , 'entry_slug' : article })

																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , replyResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (!replyResult) {
																																						return config.response(res , 404 , {'message' : `Reply entry does not exists in the record or is not available.`}); 	}
				if (replyResult) {
															
						$ModelReplyVote.findOne({'reply_slug' : reply })
																															.lean({})

																															.populate({'path' : 'users' , 'select' : 'full_name -_id'})									.lean({})

																															.populate({'path' : 'comment' , 'select' : 'text slug -_id'})								.lean({})

																															.populate({'path' : 'reply' , 'select' : 'text slug -_id'})									.lean({})

																															.select({'createdAt' : 0 , 'updatedAt' : 0})

																															.exec((err , voteResult) => {
																									if (err) {
																																				return config.errResponse(res , 400 , err);			}
																									if (!voteResult) {	
																																				return config.response(res , 404 , {'message' : `Vote does not exists in the record or is not available for this reply entry.`});  }
								$entryReplyVote = {
																			[$mName] : replyResult ,

																			'votes' : voteResult	};					
																																				return config.response(res , 200 , $entryReplyVote);						});		}			});			} 	
			else {
							return config.response(res , 404 , {'message' : `No reply id provided. Please provide a valid  id.`});		}
		} ,

	'replyAddVote' : (req , res , next) => { var { article , comment , reply } = req.params;

		if (req.params && req.params.article) {

			$Model.findOne({'slug' : article })
																					.lean({})

																					.select(`slug -_id`)

																					.exec((err , entryResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`}); 	} 
					if (entryResult && req.params.comment) {

			$ModelComment.findOne({'slug' : comment })
																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , commentResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!commentResult) {
																																						return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available.`}); 	}
					if (commentResult && req.params.reply) {

					$ModelReply.findOne({'slug' : reply })
																								.lean({})

																								.select(`slug -_id`)

																								.exec((err , replyResult) => {

																											if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!replyResult) {
																																						return config.response(res , 404 , {'message' : `Reply entry does not exists in the record or is not available.`}); 	}
									if (replyResult) {

					$ModelReplyVote.findOne({'reply_slug' : reply})
																													.lean({})

																													.select(`slug voters -_id`)

																													.exec((err , voterResult) => {
																													
																														if (err) {
																																						return config.errResponse(res , 400 , err);			}

																		if (!voterResult) {	var vote = new $ModelReplyVote({'entry_slug' : article , 'comment_slug' : comment , 'reply_slug' : reply , 'votes' : 1 , 'voters' : [req.body.author]});

										return vote.save((err , voteSave) => {
																														if (err) {
																																						return config.errResponse(res , 400 , err);			}

																																						return config.response(res , 200 , voteSave);			});			}
							voterResult.voters.find((id) => {

										if (id == req.body.author) {		userVote.voted = true;

												return true;		}		});
																															if (userVote.voted) {
																																											return config.response(res , 400 , {'message' : `You can't vote more than once for an entry.`});		}		
																															else {

		$ModelReplyVote.findOneAndUpdate({'reply_slug' : reply} , {'$addToSet' : {'voters' : req.body.author } , '$inc' : {'votes' : 1}} , {'new' : true , 'runValidators' : true })

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
									return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}
		} ,

	}

}