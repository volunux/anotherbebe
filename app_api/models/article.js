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


module.exports = function(ModelType) {

var articleSchema = new Schema({
																	'title' : {
																							'type' : String ,
																																'required' : [true , `Title should be provided and cannot be empty.`] ,
																															
																																'maxlength' : [150 , `Title cannot be greater than 150 characters in length.`] ,

																																'trim' : true	, 'lowercase' : false	} ,
										'century' : {	
																	'type' : String ,	
																										'ref' : 'Century' ,

																										'required' : [true , `Century ID for ${ModelType} should be provided and cannot be empty.`] ,

																											'maxlength' : [40 , `Century cannot be greater than 40 characters in length.`] ,

																'validate' : {
																								'validator' : (v) => {
																																				return FKHelper.primaryKey(mongoose.model('Century') , v );			} ,

																								'message' : `Century ID reference doesn't exists in the record or is not available.`		}	} ,

													'continent' : {	
																					'type' : String ,	
																														'ref' : 'Continent' ,

																										'required' : [true , `Continent ID for ${ModelType} should be provided and cannot be empty.`] ,

																											'maxlength' : [40 , `Continent cannot be greater than 40 characters in length.`] ,

																			'validate' : {
																											'validator' : (v) => {
																																							return FKHelper.primaryKey(mongoose.model('Continent') , v );			} ,

																											'message' : `Continent ID reference doesn't exists in the record or is not available.`			}	} ,

														'region' : {	
																					'type' : String ,	
																														'ref' : 'Region' ,

																										'required' : [true , `Region ID for ${ModelType} should be provided and cannot be empty.`] ,

																											'maxlength' : [40 , `Region cannot be greater than 40 characters in length.`] ,

																		'validate' : {
																										'validator' : (v) => {
																																						return FKHelper.primaryKey(mongoose.model('Region') , v );			} ,

																										'message' : `Region ID reference doesn't exists in the record or is not available.`						}	} ,


																	'country' : {
																								'type' : String ,
																																	'ref' : 'Country' ,
																																											'required' : [true , `Country ID for ${ModelType} should be provided and cannot be empty.`] ,
	
																																											'maxlength' : [40 , `Country cannot be greater than 40 characters in length.`] ,
																								'validate' : {
																																'validator' : (v) => {
																																												return FKHelper.primaryKey(mongoose.model('Country') , v );			} ,

																																	'message' : `Country ID reference doesn't exists in the record or is not available.`		}	} ,
																			'ethnic_group' : {
																													'type' : String ,
																																						'ref' : 'Eyon' ,
																																															'required' : [true , `Ethnic Group ID for ${ModelType} should be provided and cannot be empty.`] ,

																																															'maxlength' : [40 , `Ethnic Group cannot be greater than 40 characters in length.`] ,
																								'validate' : {
																																'validator' : (v) => {
																																												return FKHelper.primaryKey(mongoose.model('Eyon') , v );					} ,

																																	'message' : `Ethnic Group ID reference doesn't exists in the record or is not available.`		}	} ,
																						'author' : {
																													'type' : Schema.Types.ObjectId ,
																																														'ref' : 'User' ,
																																																							'required' : [true , `User ID for ${ModelType} should be provided and cannot be empty.`] ,

																																																							'maxlength' : [40 , `User ID cannot be greater than 40 characters in length.`] ,
																								'validate' : {
																																'validator' : (v) => {
																																												return FKHelper.primaryKey(mongoose.model('User') , v );				} ,

																																	'message' : `User ID reference doesn't exists in the record or is not available.`					}	} ,

																								'main_body' : {
																																'type' : String ,
																																									'maxlength' : [6000 , `${ModelType} body cannot be greater than 6000 characters in length.`] ,
																																									
																																									'required' : [true , `${ModelType} body should be provided and cannot be empty.`] ,
																																									
																																									'minlength' : [9 , `${ModelType} body cannot be less than 10 characters in length.`]	,

																																										'trim' : true , 'set' : capitalize } ,
																									'views' : {
																															'type' : Number ,
																																								'default' : 0		} ,
																									'status' : {
																																'type' : String ,
																																									'enum' : {
																																															'values' : ['approved' , 'disapproved' , 'review' , 'pending'] ,

																																															'message' : 'Status is required.'} ,

																																															'default' : 'approved'		} ,
																									'photos' : [fileSchema] ,

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

		return field ? `${field.charAt(0).toUpperCase()}${field.slice(1)}` : '';		};

function turnCapitalize(val) {

  if (typeof val !== 'string') {	val = ''; }
	
	  return val 	.split(' ')

								.map((n) => {		return n.charAt(0).toUpperCase() + n.substring(1).toLowerCase();		}).join(' ');		};


var uniqueAndCast = function(err , doc , next) {

		if (err.name == 'CastError') {

			var validationError = new mongoose.Error.ValidationError(null);
				
				validationError.addError('field', new mongoose.Error.ValidatorError({ 'message' : `Please provide a valid id or value and try again.` })); 
		
						return next(validationError);		}

		else if (err.code === 11000 && err.name === 'MongoError') {

			var validationError = new mongoose.Error.ValidationError(null);

				validationError.addError('field', new mongoose.Error.ValidatorError({ 'message' : `All fields parameters should be unique and try again.` })); 
		
						return next(validationError);		 }
						
		else if (err.code == 2) {
		
				var validationError = new mongoose.Error.ValidationError(null);
					
					validationError.addError('field', new mongoose.Error.ValidatorError({ 'message' : `An error has occured. Please try again.` })); 
			
							return next(validationError);		}
			else {
							return next(err)		}		};


articleSchema.virtual('commentsCount' , {

		'ref' : `${ModelType}.Comment` ,

		'localField' : 'slug' , 

		'foreignField' : 'entry_slug' ,

		'count' : true
});

articleSchema.virtual('comments' , {

		'ref' : `${ModelType}.Comment` ,

		'localField' : 'slug' , 

		'foreignField' : 'entry_slug' ,

		'count' : false
});

articleSchema.virtual('votes' , {

		'ref' : `${ModelType}.Vote` ,

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

articleSchema.statics.findComment = function(slug) {
		
		return this.model(`${ModelType}.Comment`).findOne({'entry_slug' : slug });
}

articleSchema.statics.findComments = function(slug) {
		
		return this.model(`${ModelType}.Comment`).find({'entry_slug' : slug })
}

articleSchema.statics.findReply = function(slug) {
		
		return this.model(`${ModelType}.Reply`).findOne({'entry_slug' : slug });
}

articleSchema.statics.findReplies = function(slug) {
		
		return this.model(`${ModelType}.Reply`).find({'entry_slug' : slug });
}

articleSchema.statics.findVote = function(slug) {
		
		return this.model(`${ModelType}.Vote`).findOne({'entry_slug' : slug });
}

articleSchema.statics.deleteComments = function(slug) {
		
		return this.model(`${ModelType}.Comment`).deleteMany({'entry_slug' : slug });
}

articleSchema.statics.deleteReplies = function(slug) {
		
		return this.model(`${ModelType}.Reply`).deleteMany({'entry_slug' : slug });
}

articleSchema.statics.deleteVotes = function(slug) {
		
		return this.model(`${ModelType}.Vote`).findOneAndDelete({'entry_slug' : slug });
}

articleSchema.statics.deleteCommentVotes = function(slug) {
		
		return this.model(`${ModelType}.Comment.Vote`).findOneAndDelete({'entry_slug' : slug });
}

articleSchema.statics.deleteReplyVotes = function(slug) {
		
		return this.model(`${ModelType}.Reply.Vote`).findOneAndDelete({'entry_slug' : slug });
}

articleSchema.post('save' , uniqueAndCast);

articleSchema.post('update' , uniqueAndCast);

articleSchema.post('findOneAndUpdate' , uniqueAndCast);

articleSchema.post('insertMany' , uniqueAndCast);

articleSchema.post('findOne' , uniqueAndCast);

articleSchema.post('find' , uniqueAndCast);


articleSchema.index({'slug' : 1});

articleSchema.index({'country' : 1});

articleSchema.index({'ethnic_group' : 1});



articleSchema.plugin(require('mongoose-autopopulate'));

articleSchema.plugin(slug , options);

mongoose.set('runValidators' , true)

			return mongoose.model(ModelType , articleSchema)

}