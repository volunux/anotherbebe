var async = require('async') , config = require('../../config/config') , $models = require('../../models/models') , article = '';

module.exports = ($ModelName , $ModelType , $ModelCommentF , $mName) => {

				const $Model = $models[$ModelName];

				const $ModelComment = $models[$ModelCommentF];

	return {

	'entryComment' : (req , res) => {	article = req.params.article;
		
		if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																					.lean({})
																		
																					.select(`title slug -_id`)
																							
																					.exec((err , entryResult) => {

																												if (err) {
																																								return config.errResponse(res , 400 , err);		}
																												if (!entryResult) {
																																								return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
				if (entryResult) {

		$Model.findComments(article)
		
		.lean({})

		.populate({'path' : 'author' , 'select' : 'full_name _id'})								.lean({})

		.populate({'path' : 'votes' , 'select' : 'votes'})												.lean({})

		.populate({'path' : 'replies' , 'select' : 'text slug commentAuthorName updatedAt author -_id' , 'options' : {'limit' : 100} , 

							'populate' : [{'path' : 'author' , 'select' : 'full_name _id'} , {'path' : 'votes' , 'select' : 'votes'} ]})									.lean({})

		.select('text updatedAt slug author -_id')

																		.exec((err , commentResult) => {
										
																						if (err) {
																																								return config.response(res , 400 , err);	}
																						if (commentResult.length == 0) {
																																								return config.response(res, 404 , {'message' : `Comments do not exists in the record or is not available for this entry.`});	}
			$entryComment = {
												[$mName] : entryResult ,

												'comments' : commentResult	};
																														return config.response(res , 200 , $entryComment);			});			}			})		}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
	} ,

	'entryCommentDetail' : (req , res , next) => { var { article , comment } = req.params;

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

			$ModelComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
					
																		.lean({})

																		.populate({'path' : 'author' , 'select' : 'full_name -_id'})			.lean({})

																		.populate({'path' : 'replies' , 'select' : 'text slug updatedAt author -_id' , 'options' : {'limit' : 2} ,

																		'populate' : [{'path' : 'author' , 'select' : 'full_name -_id'} , {'path' : 'votes' , 'select' : 'votes'}]})				.lean({})

																		.populate({'path' : 'votes' , 'select' : 'entry_slug voters votes -_id'})	.lean({})
																		
																		.select('slug text author updatedAt entry_slug -_id')

																		.exec((err , commentResult) => {
																	
																												if (err) {
																																								return config.errResponse(res , 400 , err);	}
																												if (!commentResult) {
																																								return config.response(res, 404 , {'message' : `Comment entry does not exists or is not available for this entry.`});			}
									$entryComment = {	[$mName] : entryResult ,

																		'comment' : commentResult		};
																																								return config.response(res , 200 , $entryComment);			});				}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});		}			}			 	});	 		}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid article id.`});			}
		} , 

	'entryAddComment' : (req , res) => { var  article = req.params.article;

		if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																				.lean({})

																				.select('title slug -_id')
																			
																				.exec((err , entryResult) => {

																										if (err) {
																																						return config.errResponse(res , 400 , err);		}
																										if (!entryResult) {
																																						return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}

																																						return config.response(res , 200 , entryResult);					});	 }
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
	} ,

	'entryAddCommentSubmit' : (req , res) => {	var comment = new $ModelComment(req.body) , article = req.params.article;

				comment.set('entry_slug' , article);

		if (req.params && req.params.article) {
			
			$Model.findOne({'slug' : article })
																					.lean({})

																					.select('title slug -_id')

																					.exec((err , entryResult) => {

																											if (err) {
																																							return config.errResponse(res , 400 , err);		}
																											if (!entryResult) {
																																							return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});		}
				comment.save((err , commentResult) => {
																											if (err) {
																																							return config.errResponse(res , 400 , err);		}	
																												else {
			$entryComment = {	[$mName] : entryResult ,

												'comment' : commentResult		};
																																						return config.response(res , 200 , $entryComment);		}			});			});	 }
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
	} ,

	'entryCommentUpdate' : (req , res , next) => {  var { article , comment } = req.params;

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

			$ModelComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																									.lean({})

																																									.populate({'path' : 'author' , 'select' : 'full_name -_id'})			

																																									.lean({})

																																									.select('text slug updatedAt -_id')

																																									.exec((err , commentResult) => {
																								if (err) {
																																					return config.response(res , 400 , err);	}
																								if (!commentResult) {
																																					return config.response(res, 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});		}
										$entryComment = {	[$mName] : entryResult ,

																			'comment' : commentResult		};
																																					return config.response(res , 200 , $entryComment);			});				}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});		}			}				});	 		}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
	} ,

	'entryCommentUpdateSubmit' : (req , res , next) => { var { article , comment } = req.params;

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

		$ModelComment.findOneAndUpdate({'slug' : comment , 'entry_slug' : entryResult.slug} , {'$set' : req.body } , {'new' : true , 'runValidators' : true , 'setDefaultsOnInsert' : true , 'context' : true })

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})			

									.lean({})

									.select({'text' : 1 , 'entry_slug' : 1 , 'updatedAt' : 1 , 'slug' : 1})

									.exec((err , commentResult) => {
																										if (err) {
																																					return config.errResponse(res , 400 , err);		}
																									if (!commentResult) {
																																					return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});	}
									$commentUpdate = {	[$mName] : entryResult ,

																			'comment' : commentResult		};
																																					return config.response(res , 201 , $commentUpdate); 			});  		} 
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});			}			}		}); 		} 
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
		} , 

	'entryCommentDeleteAll' : (req , res , next) => {	article = req.params.article;

				if (req.params && req.params.article) {

				$Model.findOne({'slug' : article })
																						.lean({})

																						.select(`slug -_id`)

																						.exec((err , entryResult) => {

																										if (err) {
																																					return config.errResponse(res , 400 , err);		}	
																										if (!entryResult) {	
																																					return config.response(res , 404 , {'message' : `${$ModelType} entry does not exists in the record or is not available.`});	}

				$ModelComment.deleteMany({'entry_slug' : article })
																														.exec((err , commentDeleteAll) => {

																										if (err) {
																																					return config.errResponse(res , 400 , err);		}
																if (!commentDeleteAll.deletedCount) {	
																																					return config.response(res , 404 , {'message' : `Comments does not exists or is not available for this entry.`});	}

																																					return config.response(res , 204 , {'message' : `Entry comments successfully removed from record.`});		});			});		} 
			else {
							return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});		}
		} , 

	'entryCommentDelete' : (req , res , next) => { var { article , comment } = req.params;

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

			$ModelComment.findOne({'slug' : comment , 'entry_slug' : entryResult.slug})
																																									.lean({})

																																									.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																									.lean({})

																																									.select('text slug author -_id')

																																									.exec((err , commentResult) => {
																							if (err) {
																																				return config.response(res , 400 , err);	}
																							if (!commentResult) {
																																				return config.response(res, 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});		}
										$entryComment = {	[$mName] : entryResult ,

																			'comment' : commentResult		};
																																									return config.response(res , 200 , $entryComment);			});				}
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});		}			}				});	 		}
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
		} , 

	'entryCommentDeleteSubmit' : (req , res , next) => { var { article , comment } = req.params;

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

			$ModelComment.findOneAndDelete({'slug' : comment , 'entry_slug' : entryResult.slug})

									.lean({})

									.populate({'path' : 'author' , 'select' : 'full_name -_id'})

									.lean({})

									.select({'text' : 1 , 'entry_slug' : 1 , 'updatedAt' : 1 , 'slug' : 1 , 'author' : 1 , '_id' : 0})

									.exec((err , commentDelete) => {

																								if (err) {
																																				return config.errResponse(res , 400 , err);		}
																						else if (!commentDelete) {
																																				return config.response(res , 404 , {'message' : `Comment entry does not exists in the record or is not available for this entry.`});		}

																																				return config.response(res , 204 , {'message' : `Entry successfully removed from the record.`}); 			});  	} 
				else {
								return config.response(res , 404 , {'message' : `No Comment id provided. Please provide a valid comment id.`});			} 		}); 		} 
				else {
								return config.response(res , 404 , {'message' : `No ${$ModelType} id provided. Please provide a valid ${$ModelType} id.`});			}
		} , 

	}

}