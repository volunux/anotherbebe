var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater');

const FKHelper = require('./helpers/foreign-key-helper');

var artSchema = new Schema({
															'title' : {
																						'type' : String ,
																															'maxlength' : [150 , 'Title cannot be greater than 150 characters in length.'] ,
																															
																															'required' : [true , 'Title should be provided and cannot be empty.'] ,

																															'trim' : true	, 'lowercase' : false	} ,

										'century' : {	
																	'type' : String ,	
																										'ref' : 'Century' ,

																										'required' : [true , 'Century ID for Photo should be provided and cannot be empty.'] ,

																											'maxlength' : [30 , 'Century cannot be greater than 30 characters in length.'] ,

																												'minlength' : [1 , 'Century cannot be less than 1 character in length.'] ,
																'validate' : {
																								'validator' : (v) => {
																																				return FKHelper.primaryKey(mongoose.model('Century') , v );			} ,

																								'message' : `Century ID reference doesn't exists in the record or is not available.`
																			}	} ,

													'continent' : {	
																					'type' : String ,	
																														'ref' : 'Continent' ,

																										'required' : [true , 'Continent ID for Photo should be provided and cannot be empty.'] ,

																											'maxlength' : [30 , 'Continent cannot be greater than 30 characters in length.'] ,

																												'minlength' : [1 , 'Continent cannot be less than 1 character in length.'] ,
																			'validate' : {
																												'validator' : (v) => {
																																								return FKHelper.primaryKey(mongoose.model('Continent') , v );			} ,

																												'message' : `Continent ID reference doesn't exists in the record or is not available.`
																							}	} ,

														'region' : {	
																					'type' : String ,	
																														'ref' : 'Region' ,

																										'required' : [true , 'Region ID for Photo should be provided and cannot be empty.'] ,

																											'maxlength' : [30 , 'Region cannot be greater than 30 characters in length.'] ,

																												'minlength' : [1 , 'Region cannot be less than 1 character in length.'] ,												
																		'validate' : {
																												'validator' : (v) => {
																																								return FKHelper.primaryKey(mongoose.model('Region') , v );			} ,

																												'message' : `Region ID reference doesn't exists in the record or is not available.`
																							}	} ,


																	'country' : {
																								'type' : String ,
																																	'ref' : 'Country' ,
																																											'autopopulate' : true , 

																																											'required' : [true , 'Country ID for Art should be provided and cannot be empty.'] ,
																								'validate' : {
																																'validator' : (v) => {
																																												return FKHelper.primaryKey(mongoose.model('Country') , v );			} ,

																																	'message' : `Country ID reference doesn't exists in the record or is not available.`		}	} ,
																			'ethnic_group' : {
																													'type' : String ,
																																						'ref' : 'Eyon' ,
																																															'autopopulate' : true , 

																																															'required' : [true , 'Ethnic Group ID for Art should be provided and cannot be empty.'] ,
																								'validate' : {
																																'validator' : (v) => {
																																												return FKHelper.primaryKey(mongoose.model('Eyon') , v );					} ,

																																	'message' : `Ethnic Group ID reference doesn't exists in the record or is not available.`						}	} ,
																						'author' : {
																													'type' : Schema.Types.ObjectId ,
																																														'ref' : 'User' ,
																																																							'autopopulate' : true , 

																																																							'required' : [true , 'User ID for Art should be provided and cannot be empty.'] ,
																								'validate' : {
																																'validator' : (v) => {
																																												return FKHelper.primaryKey(mongoose.model('User') , v );				} ,

																																	'message' : `User ID reference doesn't exists in the record or is not available.`								}	} ,

																								'main_body' : {
																																'type' : String ,
																																									'maxlength' : [6000 , 'Art body cannot be greater than 6000 characters in length.'] ,
																																									
																																									'required' : [true , 'Art body should be provided and cannot be empty.'] ,
																																									
																																									'minlength' : [10 , 'Art body cannot be less than 10 characters in length.']			} ,

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
																																										'default' : true		} ,
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

var capitalize = function(field) {

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

artSchema.pre('save', function (next) {

	this.main_body = capitalize(this.main_body);
		
		next();		});


artSchema.virtual('commentsCount' , {

		'ref' : 'Art.Comment' ,

		'localField' : 'slug' , 

		'foreignField' : 'entry_slug' ,

		'count' : true
});

artSchema.virtual('comments' , {

		'ref' : 'Art.Comment' ,

		'localField' : 'slug' , 

		'foreignField' : 'entry_slug' ,

		'count' : false
});

artSchema.virtual('votes' , {

		'ref' : 'Art.Vote' ,

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

artSchema.statics.findComments = function(slug) {
		
		return this.model('Art.Comment').findOne({'entry_slug' : slug });
}

artSchema.statics.findComment = function(slug) {
		
		return this.model('Art.Comment').find({'entry_slug' : slug })
																																		.populate({'path' : 'author' , 'select' : 'full_name -_id'})

																																		.populate({'path' : 'votes' , 'select' : 'votes'});
}

artSchema.statics.findReplies = function(slug) {
		
		return this.model('Art.Comment.Reply').findOne({'entry_slug' : slug });
}

artSchema.statics.findReply = function(slug) {
		
		return this.model('Art.Comment.Reply').find({'entry_slug' : slug });
}

artSchema.statics.findVotes = function(slug) {
		
		return this.model('Art.Vote').findOne({'entry_slug' : slug });
}

artSchema.statics.deleteComments = function(slug) {
		
		return this.model('Art.Comment').deleteMany({'entry_slug' : slug });
}

artSchema.statics.deleteReplies = function(slug) {
		
		return this.model('Art.Comment.Reply').deleteMany({'entry_slug' : slug });
}

artSchema.statics.deleteVotes = function(slug) {
		
		return this.model('Art.Vote').findOneAndDelete({'entry_slug' : slug });
}

artSchema.statics.deleteCommentVotes = function(slug) {
		
		return this.model('Art.Comment.Vote').findOneAndDelete({'entry_slug' : slug });
}

artSchema.statics.deleteReplyVotes = function(slug) {
		
		return this.model('Art.Reply.Vote').findOneAndDelete({'entry_slug' : slug });
}

artSchema.post('save' , uniqueAndCast);

artSchema.post('update' , uniqueAndCast);

artSchema.post('findOneAndUpdate' , uniqueAndCast);

artSchema.post('insertMany' , uniqueAndCast);

artSchema.post('findOne' , uniqueAndCast);

artSchema.post('find' , uniqueAndCast);


artSchema.index({'slug' : 1});

artSchema.index({'country' : 1});

artSchema.index({'ethnic_group' : 1});



artSchema.plugin(require('mongoose-autopopulate'));

artSchema.plugin(slug , options);

module.exports = mongoose.model('Art' , artSchema);