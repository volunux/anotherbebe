var Genre = require('../models/genre') , config = require('../config/config') , async = require('async') , gValue = '' , genre = '' , gParam = '';

module.exports = {

	'genreName' : (req , res) => {	genre = req.params.genre;
			
			Genre.findOne({'genre' : new RegExp(genre , 'i')})
																													.exec((err , genreResult) => {

																														if (err) {
																																						config.compiledError(res , 400 , err);
																																																										return false;	}
																												if (!genreResult) {
																																						config.response(res , 404 , {'message' : 'Genre entry does not exist in the record or is not available.'});
																																																																																												return false;		}
																																						config.response(res , 200 , genreResult);					});
	} ,

	'genreList' : (req , res) => {	
			
			Genre.find({})
											.lean({})

											.select('_id')

											.hint({'_id' : 1})

											.exec((err , entryResult) => {
																					
																						if (err) {
																																								return config.errResponse(res , 400 , err);		}
																						if (entryResult.length == 0) {
																																								return config.response(res , 404 , {'message' : 'Genre entries does not exists in the record or is not available.'});		}

																																								return config.response(res , 200 , entryResult);				});
	},

	'genreDetail' : (req , res) => {		genre = req.params.genre;	

				if (req.params && req.params.genre) {
																			
		Genre.findOne({'genre' : new RegExp(genre , 'i')})
																											.exec((err , genreResult) => {

																													if (err) {
																																			config.compiledError(res , 400 , err);
																																																							return false;	}
																								if (!genreResult) {
																																			config.response(res , 404 , {'message' : 'Genre entry does not exist in the record or is not available.'});
																																																																																									return false;		}
																																			config.response(res , 200 , genreResult);				});
			} else {
								config.response(res , 404 , {'message' : 'No genre id provided. Please provide a valid genre id.'});		}
	} ,

	'genreAdd' : (req , res) => {	genre = new Genre(req.body);
			
			genre.save((err , genreResult) => {
																					if (err) {
																											config.compiledError(res , 400 , err);
																																																	return false;	}		
																											config.response(res , 200 , genreResult);											});
	} ,

	'genreUpdate' : (req , res) => {	gValue = req.body.genre , genre = req.params.genre;

				if (req.params && req.params.genre) {

				Genre.findOne({'genre' : new RegExp(genre , 'i')} , (err , genre) => {

																																						if (!genre) {	return config.response(res , 404 , {'message' : 'Genre entry does not exist in the record or is not available.'});	}
				Genre.findOneAndUpdate({'genre' : new RegExp(genre , 'i')} , 

									{'$set' : gValue} , {'new' : true , 'runValidators' : true} , (err , genreResult) => {
																																																						if (err) {																																													
																																																												config.compiledError(res , 400 , err);
																																																																																			return false;	}
																																																												config.response(res , 201 , genreResult);											});		});
			} else {
								config.response(res , 404 , {'message' : 'No genre id provided. Please provide a valid genre id.'});		}
	} ,

	'genreDelete' : (req , res) => {	genre = req.params.genre;

		if (req.params.genre) {
				
				Genre.findOne({'genre' : new RegExp(genre , 'i')} , (err , genre) => {
																																					
																																						if (!genre) {
																																														return config.response(res , 404 , {'message' : 'Genre entry does not exist in the record or is not available.'});	}
														genre.remove((err , genreResult) => {
																																					if (err) {
																																											config.compiledError(res , 400 , err);
																																																															return false;		}

																																							return	config.response(res , 204 , {'message' : 'Entry successfully removed from the record.'});		})			});
			} 	else {
									config.response(res , 404 , {'message' : 'No genre id provided. Please provide a valid genre id.'});		}
	} 

}