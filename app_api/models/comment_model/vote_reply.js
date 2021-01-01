var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater') , uniqueValidator = require('mongoose-beautiful-unique-validation');

const FKHelper = require('../helpers/foreign-key-helper');

module.exports = function(ModelType) {

var voteSchema = new Schema({
															'voters' : {
																						'type' : Array ,

																							'validate' : {
																															'validator' : (v) => {
																																											return FKHelper.primaryKey(mongoose.model('User') , v );		} ,

																														'message' : `User ID reference doesn't exists in the record or is not available.`	}		}	,
															'votes' : {
																					'type' : Number ,
																														'default' : 0 ,		} ,

																						'createdAt' : {	'type' : Date ,	
																																							'default' : Date.now 	} ,
																							'entry_slug' :  {
																																'type' : String ,
																										
																									'required' : [true , `Entry slug for ${ModelType} should be provided and cannot be empty.`] ,

																										'maxlength' : [120 , `Entry slug for ${ModelType} cannot be greater than 120 characters in length.`] ,

																									'validate' : {
																																		'validator' : (v) => {
																																														return FKHelper.secondaryKey(mongoose.model(ModelType) , v );				} ,

																																'message' : `Entry slug reference doesn't exists in the record or is not available.`		}	} ,

																							'comment_slug' :  {
																																	'type' : String ,
																										
																									'required' : [true , `Entry slug for Comment should be provided and cannot be empty.`] ,

																										'maxlength' : [120 , `Entry slug for Comment cannot be greater than 120 characters in length.`] ,

																								'validate' : {
																																	'validator' : (v) => {
																																													return FKHelper.secondaryKey1(mongoose.model(`${ModelType}.Comment`) , v );				} ,

																																									'message' : `Comment slug reference doesn't exists in the record or is not available.`		}	} ,

																							'reply_slug' :  {
																																	'type' : String ,
																										
																									'required' : [true , 'Entry slug for Reply should be provided and cannot be empty.'] ,

																										'maxlength' : [120 , 'Entry slug cannot be greater than 120 characters in length.'] ,

																							'validate' : {
																																'validator' : (v) => {
																																												return FKHelper.secondaryKey1(mongoose.model(`${ModelType}.Reply`) , v );			} ,

																																								'message' : `Reply slug reference doesn't exists in the record or is not available.`		}	}
} , {
				'toObject' : {
												'virtuals' : true
				} ,
						'toJSON' : {
													'virtuals' : true
						} ,
								'getters' : true ,

								'id' : false ,

								'timestamps' : {

										'createdAt' : 'createdAt' ,

										'updatedAt' : 'updatedAt'
								} ,

									'collation' : {
																	'locale' : 'en_US' ,
																												'strength' : 2
									}
							}
);

const options = {

				'separator' : '' ,

				'symbols' : false ,

				'uric' : false ,
														'lang' : 'en' ,
																						'truncate' : 120 ,
																																'backwardCompatible' : true ,

																																'custom' : {

																																			'and' : '' , 'usd' : '' , 'the' : '' , 'then' : '' , 'them' : '' , 'they' : '' ,

																																			'is' : '' , 'am' : '', 'i' : '' , 'we' : '' , 'what' : '' , 'amp' : '' ,

																																			'or' : '' , '$' : '' , 'x2f' : '' , 'x27' : '' , 'x5c' : '' , 'quot' : '' , 'lt' : '' , 'gt' : '' , '_' : '' 
																								} 
							};

voteSchema.virtual('entry' , {

		'ref' : `${ModelType}` ,

		'localField' : 'entry_slug' ,

		'foreignField' : 'url' ,

		'justOne' : true

});

voteSchema.virtual('comment' , {

		'ref' : `${ModelType}.Comment` ,

		'localField' : 'comment_slug' ,

		'foreignField' : 'slug' ,

		'justOne' : true

});

voteSchema.virtual('reply' , {

		'ref' : `${ModelType}.Reply` ,

		'localField' : 'reply_slug' ,

		'foreignField' : 'slug' ,

		'justOne' : false

});

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

voteSchema.post('findOne' , uniqueAndCast);

voteSchema.post('find' , uniqueAndCast);

voteSchema.post('findOneAndUpdate' , uniqueAndCast);

voteSchema.plugin(require('mongoose-autopopulate'));

voteSchema.plugin(slug , options);

mongoose.set('runValidators' , true);

			return mongoose.model(`${ModelType}.Reply.Vote` , voteSchema);

}