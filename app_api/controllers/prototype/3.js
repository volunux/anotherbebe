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