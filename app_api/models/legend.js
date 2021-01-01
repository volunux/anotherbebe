var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater');

const FKHelper = require('./helpers/foreign-key-helper');

const fileSchema = new Schema({
																'filename' : {	
																								'type' : String	} ,

																									'path' : String ,	
																																						'mimetype' : String , 
																										'encoding' :  String ,
																																						'Location' : String ,
																											'Key' : String ,	
																																						'location' : String ,
																											'key' : String ,	
																																						'size' : Number 			} , {'_id' : false});

var legendSchema = new Schema({

'title' : {
							'type' : String ,
																'maxlength' : [150 , 'Title cannot be greater than 150 characters in length.'] ,

																	'required' : [true , 'Title should be provided and cannot be empty.'] ,

																		'minlength' : [1 , 'Title cannot be less than 1 character in length.']	,

																			'trim' : true	,

																				'lowercase' : false , 'set' : turnCapitalize } ,
	'date' : {
								'type' : String , 
																		'required' : [true , 'Date of Legend should be provided and cannot be empty.'] ,
																			
																			'maxlength' : [15 , 'Date of Legend cannot be greater than 15 characters in length.'] ,

																				'minlength' : [3 , 'Date of Legend cannot be less than 4 characters in length.'] ,

																					'trim' : true ,

																						'lowercase' : false } ,
		'century' : {	
									'type' : String ,	
																		'ref' : 'Century' ,

																		'required' : [true , 'Century ID for Legend should be provided and cannot be empty.'] ,

																			'maxlength' : [40 , 'Century cannot be greater than 40 characters in length.'] ,
								'validate' : {
																'validator' : (v) => {
																												return FKHelper.primaryKey(mongoose.model('Century') , v );			} ,

																'message' : `Century ID reference doesn't exists in the record or is not available.`		}	} ,

			'genre' : {	
									'type' : String ,	
																		'ref' : 'Genre' ,

																		'required' : [true , 'Genre ID for Legend should be provided and cannot be empty.'] ,

																			'maxlength' : [40 , 'Genre cannot be greater than 40 characters in length.'] ,
								'validate' : {
																'validator' : (v) => {
																												return FKHelper.primaryKey(mongoose.model('Genre') , v );		} ,

																'message' : `Genre ID reference doesn't exists in the record or is not available.`	}	} ,

				'country' : {	
												'type' : String ,	
																					'ref' : 'Country' ,

																		'required' : [true , 'Country ID for Legend should be provided and cannot be empty.'] ,

																			'maxlength' : [40 , 'Country cannot be greater than 40 characters in length.'] ,
										'validate' : {
																		'validator' : (v) => {
																														return FKHelper.primaryKey(mongoose.model('Country') , v );			} ,

																		'message' : `Country ID reference doesn't exists in the record or is not available.`		}	} ,

					'continent' : {	
													'type' : String ,	
																						'ref' : 'Continent' ,

																		'required' : [true , 'Continent ID for Legend should be provided and cannot be empty.'] ,

																			'maxlength' : [40 , 'Continent cannot be greater than 40 characters in length.'] ,
											'validate' : {
																			'validator' : (v) => {
																															return FKHelper.primaryKey(mongoose.model('Continent') , v );			} ,

																				'message' : `Continent ID reference doesn't exists in the record or is not available.`		}	} ,
						'region' : {	
													'type' : String ,	
																						'ref' : 'Region' ,

																		'required' : [true , 'Region ID for Legend should be provided and cannot be empty.'] ,

																			'maxlength' : [40 , 'Region cannot be greater than 40 characters in length.'] ,							
										'validate' : {
																		'validator' : (v) => {
																														return FKHelper.primaryKey(mongoose.model('Region') , v );			} ,

																				'message' : `Region ID reference doesn't exists in the record or is not available.`		}	} ,

						'ethnic_group' : {	
																'type' : String ,	
																									'ref' : 'Eyon' , 

																		'required' : [true , 'Ethnic Group ID for Legend should be provided and cannot be empty.'] ,

																			'maxlength' : [40 , 'Ethnic Group cannot be greater than 40 characters in length.'] ,
											'validate' : {
																			'validator' : (v) => {
																															return FKHelper.primaryKey(mongoose.model('Eyon') , v );			} ,

																							'message' : `Ethnic Group ID reference doesn't exists in the record or is not available.`		}	} ,
								'author' : {
															'type' : Schema.Types.ObjectId ,
																																'ref' : 'User' ,
																																									'autopopulate' : true ,

																		'required' : [true , 'User ID for Legend should be provided and cannot be empty.'] ,

																			'maxlength' : [40 , 'User ID cannot be greater than 40 characters in length.'] ,

										'validate' : {
																		'validator' : (v) => {
																														return FKHelper.primaryKey(mongoose.model('User') , v );			} ,

																		'message' : `User ID reference doesn't exists in the record or is not available.`		}	} ,

										'legend_body' : {
																			'type' : String ,
																												'required' : [true , 'About or description of Legend should be provided and cannot be empty.'] ,

																													'maxlength' : [2000 , 'About Legend cannot be greater than 2000 characters in length.'] ,
																																			
																														'minlength' : [10 , 'About Legend cannot be less than 10 characters in length.']	,

																																	'trim' : true ,	'lowercase' : false , 'set' : capitalize } ,

															'photo_detail' : fileSchema ,

															'legend' : fileSchema ,

																	'views' : {
																							'type' : Number ,
																																'default' : 0		} ,
																	'status' : {
																								'type' : String ,
																																	'enum' : {
																																							'values' : ['approved' , 'disapproved' , 'review' , 'pending'] ,

																																							'message' : 'Status is required.'} ,

																																							'default' : 'approved'		} ,
																		'draft' : {
																									'type' : Boolean ,
																																			'default' : false		} ,
																			'hidden' : {
																									'type' : Boolean ,
																																			'default' : false		} ,
																			'slug' : {
																									'type' : String ,
																																		'slug' : 'title' ,
																																					
																																				'unique' : true ,

																																						'uniqueCaseInsensitive' : true ,
			
																																								'slugPaddingSize' : 1	,
																																														
																																									'permanent' : true ,

																																										'immutable' : true 	} 	
} ,	{
				'toObject' : {
												'virtuals' : true
				} ,
						'toJSON' : {
													'virtuals' : true
						} ,
								'getters' : true ,

								'id' : false , 

								'selectedPopulatedPaths' : false ,

								'timestamps' : {

										'createdAt' : 'createdAt' ,

										'updatedAt' : 'updatedAt'
								} ,

									'collation' : {
																	'locale' : 'en_US' ,
																												'strength' : 2
									}
});


const options = {

				'separator' : '-' ,

				'symbols' : false ,

				'uric' : false ,
				
				'lang' : 'en' ,
				
				'truncate' : 120 ,
				
				'backwardCompatible' : true ,

				'custom' : {

							'and' : '' , 'usd' : '' , 'the' : '' , 'then' : '' , 'them' : '' , 'they' : '' ,

							'is' : '' , 'am' : '', 'we' : '' , 'what' : '' , 'amp' : '' ,

							'or' : '' , '$' : '' , 'x2f' : '' , 'x27' : '' , 'x5c' : '' , 'quot' : '' , 'lt' : '' , 'gt' : '' , '_' : '' 
} 	};

function capitalize(field) {

		return field ? `${field.charAt(0).toUpperCase()}${field.slice(1)}` : '';
};

function turnCapitalize(val) {

	if (typeof val !== 'string') {

			val = ''; }
	
		return val 	.split(' ')

								.map((n) => {		return n.charAt(0).toUpperCase() + n.substring(1).toLowerCase();		}).join(' ');
};


var uniqueAndCast = function(err , doc , next) {

		if (err.name == 'CastError') {

			var validationError = new mongoose.Error.ValidationError(null);
				
				validationError.addError('field', new mongoose.Error.ValidatorError({ 'message' : 'Please provide a valid id or value and try again.' })); 
		
						return next(validationError);		}

		else if (err.code === 11000 && err.name === 'MongoError') {
													
						return next(new Error('All fields parameters must be unique and try again.'));		 }
						
		else if (err.code == 2) {
		
				var validationError = new mongoose.Error.ValidationError(null);
					
					validationError.addError('field', new mongoose.Error.ValidatorError({ 'message' : 'An error has occured. Please try again.' })); 
			
							return next(validationError);
		}
			else {
							return next(err)
		}
};

legendSchema.pre('save', function (next) {

	this.about = capitalize(this.about);
		
		next();		});


legendSchema.post('remove', function(entry) {

	this.model('Legend.Comment').remove({'entry_slug': entry._id })

																																.lean({})

																																.exec((err) => {
			if (err) {
									console.error('had trouble cleaning up old comments', err.stack);		}
})		});


legendSchema.virtual('commentsCount' , {

		'ref' : 'Legend.Comment' ,

		'localField' : 'slug' , 

		'foreignField' : 'entry_slug' ,

		'count' : true
});

legendSchema.virtual('comments' , {

		'ref' : 'Legend.Comment' ,

		'localField' : 'slug' , 

		'foreignField' : 'entry_slug' ,

		'count' : false
});

legendSchema.virtual('votes' , {

		'ref' : 'Legend.Vote' ,

		'localField' : 'slug' , 

		'foreignField' : 'entry_slug' ,

		'justOne' : true

});


mongoose.Schema.Types.Boolean.cast(v => {
	
	if (v === '' || v === false) {
		
			return false;
	}
			return v;
});

legendSchema.statics.findComments = function(slug) {
		
		return this.model('Legend.Comment').findOne({'entry_slug' : slug });
}

legendSchema.statics.findComment = function(slug) {
		
		return this.model('Legend.Comment').find({'entry_slug' : slug })
																																		.populate({'path' : 'author' , 'select' : 'full_name _id'})

																																		.populate({'path' : 'votes' , 'select' : 'votes'});
}

legendSchema.statics.findReplies = function(slug) {
		
		return this.model('Legend.Comment.Reply').findOne({'entry_slug' : slug });
}

legendSchema.statics.findReply = function(slug) {
		
		return this.model('Legend.Comment.Reply').find({'entry_slug' : slug });
}

legendSchema.statics.findVotes = function(slug) {
		
		return this.model('Legend.Vote').findOne({'entry_slug' : slug });
}

legendSchema.statics.deleteComments = function(slug) {
		
		return this.model('Legend.Comment').deleteMany({'entry_slug' : slug });
}

legendSchema.statics.deleteReplies = function(slug) {
		
		return this.model('Legend.Reply').deleteMany({'entry_slug' : slug });
}

legendSchema.statics.deleteVotes = function(slug) {
		
		return this.model('Legend.Vote').findOneAndDelete({'entry_slug' : slug });
}

legendSchema.statics.deleteCommentVotes = function(slug) {
		
		return this.model('Legend.Comment.Vote').findOneAndDelete({'entry_slug' : slug });
}

legendSchema.statics.deleteReplyVotes = function(slug) {
		
		return this.model('Legend.Reply.Vote').findOneAndDelete({'entry_slug' : slug });
}

legendSchema.post('save' , uniqueAndCast);

legendSchema.post('update' , uniqueAndCast);

legendSchema.post('findOneAndUpdate' , uniqueAndCast);

legendSchema.post('insertMany' , uniqueAndCast);

legendSchema.post('findOne' , uniqueAndCast);

legendSchema.post('find' , uniqueAndCast);


legendSchema.index({'slug' : 1});

legendSchema.index({'country' : 1});

legendSchema.index({'ethnic_group' : 1});

legendSchema.plugin(require('mongoose-autopopulate'));

legendSchema.plugin(slug , options);

mongoose.set('runValidators' , true);

module.exports = mongoose.model('Legend' , legendSchema);