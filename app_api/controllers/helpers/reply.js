var async = require('async') , config = require('../../config/config') , $models = require('../../models/models') , article = '';

module.exports = ($ModelName , $ModelType , $ModelCommentF , $ModelReplyF , $mName) => {

				const $Model = $models[$ModelName];

				const $ModelComment = $models[$ModelCommentF];

				const $ModelReply = $models[$ModelReplyF];

	return {

	'entryReply' : (req , res) => { 	article = req.params.article;
		
		if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																					.lean({})

																					.select('title slug -_id')

																					.exec((err , entryResult) => {

																										if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
			if (entryResult) {
													$Model.findReplies(article)
																											.lean({})

																											.populate({'path' : 'author' , 'select' : 'full_name -_id'})													.lean({})

																											.populate({'path' : 'votes' , 'select' : 'votes -_id'})																.lean({})

																											.select('text slug updatedAt author -_id')

																											.exec((err , replyResult) => {
														if (err) {
																																return config.response(res , 400 , err);	}
														if (replyResult.length == 0) {
																																return config.response(res, 404 , {'message' : `Replies do not exists in the record or is not available for this entry.`});			}
					$entryReply = {
													[$mName] : entryResult ,

													'replies' : replyResult	};
																																return config.response(res , 200 , $entryReply);			});			}			});		}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
	} ,

	'entryReplyDetail' : (req , res , next) => { var { article , reply } = req.params;

			if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																					.lean({})

																					.select('title slug -_id')

																					.exec((err , entryResult) => {

																						if (err) {
																																		return config.errResponse(res , 400 , err);		}
																						if (!entryResult) {
																																		return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
					if (entryResult) {

			if (req.params && req.params.reply) {

			$ModelReply.findOne({'slug' : reply , 'entry_slug' : entryResult.slug})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})								.lean({})																																							

																																							.populate({'path' : 'entry' , 'select' : 'title slug -_id'})								.lean({})

																																							.populate({'path' : 'comment' , 'select' : 'text slug -_id'})								.lean({})

																																							.select('text slug updatedAt entry_slug comment_slug -_id')

																																							.exec((err , replyResult) => {
																						if (err) {
																																		return config.errResponse(res , 400 , err);	}
																						if (!replyResult) {
																																		return config.response(res, 404 , {'message' : `Reply entry does not exists in the record or is not available for this entry.`});			}
									$entryReply = {	[$mName] : entryResult  ,

																	'reply' : replyResult		};
																																									return config.response(res , 200 , $entryReply);			});				}
				else {
								return config.response(res , 404 , {'message' : `No Reply id provided. Please provide a valid reply id.`});		}			}	 	});	 		}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
		} , 

	'entryAddReplytoComment' : (req , res) => { var  article = req.params.article , comment = req.params.comment;

		if (req.params && req.params.article) {

			$Model.findOne({'slug' : article })
																					.lean({})

																					.select('title slug -_id')
																				
																					.exec((err , entryResult) => {

																											if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																							return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}

			$ModelComment.findOne({'entry_slug' : entryResult.slug , 'slug' : comment})
																																									.lean({})

																																									.populate({'path' : 'author' , 'select' : 'full_name -_id'})							.lean({})

																																									.select('text slug entry_slug updatedAt author -_id')

																																									.exec((err , commentResult) => {
																						if (err) {
																																		return config.errResponse(res , 400 , err);		}
																						if (!commentResult) {
																																		return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});		}
							$entryReply = {	[$mName] : entryResult ,

																'comment' : commentResult		};
																																							return config.response(res , 200 , $entryReply);	});		})		}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
	} ,

	'entryAddReplyToCommentSubmit' : (req , res) => {	var reply = new $ModelReply(req.body) , article = req.params.article , comment = req.params.comment;

		if (req.body.commentauthorname) {

					reply.commentAuthorName = req.body.commentauthorname;		}

		if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																					.lean({})

																					.select('title slug -_id')
																				
																					.exec((err , entryResult) => {

																						if (err) {
																																		return config.errResponse(res , 400 , err);		}
																						if (!entryResult) {
																																		return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
			if (entryResult) {

				if (req.params && req.params.comment) {

			$ModelComment.findOne({'slug' : comment })
																								.lean({})

																								.select('text slug -_id')
																							
																								.exec((err , commentResult) => {

																						if (err) {
																																		return config.errResponse(res , 400 , err);		}
																						if (!commentResult) {
																																		return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});		}
			if (commentResult) {

				reply.set('entry_slug' , entryResult.slug);

				reply.set('comment_slug' , commentResult.slug);

				reply.populate({'path' : 'author' , 'select' : 'full_name -_id'});

																		reply.save((err , replyResult) => {
																																				if (err) {
																																										return config.errResponse(res , 400 , err);		}	
																																					else {
											$entryReply = {	[$mName] : entryResult ,

																			'comment' : commentResult ,

																			'reply' : replyResult		};
																																									return config.response(res , 200 , $entryReply);		}			});			}				});			}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});		}				}				});	 		}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
	} ,

	'entryReplyUpdate' : (req , res , next) => { var { article , comment , reply } = req.params;

			if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																					.lean({})

																					.select('title slug -_id')

																					.exec((err , entryResult) => {

																						if (err) {
																																		return config.errResponse(res , 400 , err);		}
																						if (!entryResult) {
																																		return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});	}
			if (req.params && req.params.comment) {

			$ModelComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																									.lean({})

																																									.select('text slug -_id')

																																									.exec((err , commentResult) => {
																						if (err) {
																																		return config.errResponse(res , 400 , err);	}
																						if (!commentResult) {
																																		return config.response(res, 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});			}
			if (req.params && req.params.reply) {

			$ModelReply.findOne({'slug' : reply , 'entry_slug' : entryResult.slug})
																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})											.lean({})

																																							.populate({'path' : 'entry' , 'select' : 'title slug -_id'})											.lean({})

																																							.populate({'path' : 'comment' , 'select' : 'text slug -_id'})											.lean({})

																																							.select('text slug updatedAt entry_slug comment_slug -_id')

																																							.exec((err , replyResult) => {
																						if (err) {
																																		return config.errResponse(res , 400 , err);	}
																						if (!replyResult) {
																																		return config.response(res, 404 , {'message' : `Reply entry does not exists in the record or is not available for this entry.`});			}
									$entryReply = {	[$mName] : entryResult  ,

																		'comment' : commentResult ,

																		'reply' : replyResult		};
																																									return config.response(res , 200 , $entryReply);			});				}
				else {
								return config.response(res , 404 , {'message' : `No Reply id provided. Please provide a valid reply id.`});		}					});				}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});		} 			});	 			}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
		} , 

	'entryReplyUpdateSubmit' : (req , res , next) => { var { article , comment , reply } = req.params;

			if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																					.lean({})

																					.select('title slug -_id')

																					.exec((err , entryResult) => {

																						if (err) {
																																		return config.errResponse(res , 400 , err);		}
																						if (!entryResult) {
																																		return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
			if (req.params && req.params.comment) {

			$ModelComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																									.lean({})

																																									.select('text slug -_id')

																																									.exec((err , commentResult) => {
																					if (err) {
																																		return config.errResponse(res , 400 , err);	}
																					if (!commentResult) {
																																		return config.response(res, 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});			}
			if (req.params && req.params.reply) {

		$ModelReply.findOneAndUpdate({'slug' : reply , 'entry_slug' : entryResult.slug} , {'$set' : req.body } , {'new' : true , 'runValidators' : true , 'setDefaultsOnInsert' : true , 'context' : true })

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})									.lean({})

									.populate({'path' : 'entry' , 'select' : 'title slug -_id'})									.lean({})

									.populate({'path' : 'comment' , 'select' : 'text slug -_id'})									.lean({})

									.select({'text' : 1 , 'entry_slug' : 1 , 'comment_slug' : 1 , 'updatedAt' : 1 , 'slug' : 1})

									.exec((err , replyResult) => {

																				if (err) {
																																return config.errResponse(res , 400 , err);		}
																				if (!replyResult) {
																																return config.response(res , 404 , {'message' : `Reply entry does not exists in the record or is not available for this entry.`});		}
										$replyUpdate = {	[$mName] : entryResult ,

																			'comment' : commentResult	,

																			'reply' : replyResult };
																																									return config.response(res , 201 , $replyUpdate); 			});			}
				else {
								return config.response(res , 404 , {'message' : `No Reply id provided. Please provide a valid reply id.`});		}					});				}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid reply id.`});		} 			});	 			}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
		} , 

	'entryReplyDeleteAll' : (req , res , next) => {	article = req.params.article;

				if (req.params && req.params.article) {

				$Model.findOne({'slug' : article })
																						.lean({})

																						.select(`slug -_id`)

																						.exec((err , entryResult) => {

																			if (err) {
																														return config.errResponse(res , 400 , err);		}	
																			if (!entryResult) {	
																														return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});	}

				$ModelReply.deleteMany({'entry_slug' : article })
																													.lean({})

																													.select(`slug -_id`)

																													.exec((err , replyDeleteAll) => {
																			if (err) {
																														return config.errResponse(res , 400 , err);		}
										if (!replyDeleteAll.deletedCount) {
																														return config.response(res , 404 , {'message' : 'Replies does not exists in the record is not available for this entry.'})		}

																														return config.response(res , 201 , {'message' : `Entry replies successfully removed from record.`});		});			});		} 
			else {
							return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}
		} , 

	'entryReplyDelete' : (req , res , next) => { var { article , comment , reply } = req.params;

			if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																					.lean({})

																					.select('title slug -_id')

																					.exec((err , entryResult) => {

																		if (err) {
																														return config.errResponse(res , 400 , err);		}
																		if (!entryResult) {
																														return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
			if (req.params && req.params.comment) {

			$ModelComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																									.lean({})

																																									.select('text slug -_id')

																																									.exec((err , commentResult) => {
																		if (err) {
																														return config.errResponse(res , 400 , err);	}
																		if (!commentResult) {
																														return config.response(res, 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});			}
			if (req.params && req.params.reply) {

			$ModelReply.findOne({'slug' : reply , 'entry_slug' : entryResult.slug , 'comment_slug' : commentResult.slug})

																																							.lean({})

																																							.populate({'path' : 'author' , 'select' : 'full_name -_id'})									.lean({})

																																							.select('text slug author -_id')

																																							.exec((err , replyResult) => {
																	if (err) {
																													return config.errResponse(res , 400 , err);	}
																	if (!replyResult) {
																													return config.response(res, 404 , {'message' : `Reply entry does not exists in the record or is not available for this entry.`});			}
 									$entryReply = {		[$mName] : entryResult  ,

																		'comment' : commentResult ,

																		'reply' : replyResult	};
																																									return config.response(res , 200 , $entryReply);			});				}
				else {
								return config.response(res , 404 , {'message' : `No Reply id provided. Please provide a valid reply id.`});		}					});				}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid reply id.`});		} 			});	 			}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
		} , 

	'entryReplyDeleteSubmit' : (req , res , next) => { var { article , comment , reply } = req.params;

			if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																					.lean({})

																					.select('title slug -_id')
																				
																					.exec((err , entryResult) => {

																if (err) {
																												return config.errResponse(res , 400 , err);		}
																if (!entryResult) {
																												return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
			if (req.params && req.params.comment) {

			$ModelComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})

																																									.lean({})

																																									.select('text slug -_id')

																																									.exec((err , commentResult) => {
															if (err) {
																											return config.errResponse(res , 400 , err);	}
															if (!commentResult) {
																											return config.response(res, 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});			}
			if (req.params && req.params.reply) {

			$ModelReply.findOneAndDelete({'slug' : reply , 'entry_slug' : entryResult.slug , 'comment_slug' : commentResult.slug})

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})									.lean({})

									.populate({'path' : 'entry' , 'select' : 'title slug -_id'})									.lean({})

									.populate({'path' : 'comment' , 'select' : 'text slug -_id'})									.lean({})

									.select('text slug updatedAt author entry_slug comment_slug -_id')

									.exec((err , replyUpdate) => {

													if (err) {
																									return config.errResponse(res , 400 , err);		}
													if (!replyUpdate) {
																									return config.response(res , 404 , {'message' : `Reply entry does not exists in the record or is not available for this entry.`});		}

																									return config.response(res , 204 , {'message' : `Entry successfully removed from the record.`}); 			});  		}
				else {
								return config.response(res , 404 , {'message' : `No Reply id provided. Please provide a valid reply id.`});		}					});				}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid reply id.`});		} 			});	 			}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
		} , 

	}

}