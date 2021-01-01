var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater');

const FKHelper = require('../helpers/foreign-key-helper');

const shortid = require('shortid');

module.exports = function(ModelType) {

var replySchema = new Schema({
																'author' : {
																							'type' : Schema.Types.ObjectId ,
																																								'ref' : 'User' ,
																																																	'autopopulate' : true , 
																	
																									'required' : [true , `User ID for ${ModelType} should be provided and cannot be empty.`] ,

																										'maxlength' : [45 , `User ID for ${ModelType} cannot be greater than 45 characters in length.`] ,

																				'validate' : {
																													'validator' : (v) => {
																																									return FKHelper.primaryKey(mongoose.model('User') , v );		} ,

																												'message' : `User ID reference doesn't exists in the record or is not available.`		}	} ,
				
																				'text' : {	'type' : String ,	

																														'required' : [true , `Reply body should be provided and cannot be empty.`] ,
																															
																															'maxlength' : [700 , `Reply body cannot be greater than 700 characters in length.`] 	} ,	

																				'commentAuthorName' : {	'type' : String ,	
																															
																															'maxlength' : [150 , `Comment Author Name body cannot be greater than 150 characters in length.`] 	} ,	

																							'createdAt' : {	'type' : Date ,	
																																								'default' : Date.now 	} ,

																							'entry_slug' :  {
																																'type' : String ,

																																	'immutable' : true ,
																										
																																		'required' : [true , `Entry slug for ${ModelType} should be provided and cannot be empty.`] ,

																																			'maxlength' : [120 , `Entry slug cannot be greater than 120 characters in length.`] ,

																														'validate' : {
																																							'validator' : (v) => {
																																																			return FKHelper.secondaryKey(mongoose.model(ModelType) , v );		} ,

																																									'message' : `Entry slug reference doesn't exists in the record or is not available.`		}	} ,
																												'status' : {
																																			'type' : String ,
																																												'enum' : {
																																																		'values' : ['approved' , 'disapproved' , 'reviewed'] ,

																																																		'message' : 'Status is required.'} ,

																																																		'default' : 'approved'		} ,
																								'comment_slug' :  {
																																		'type' : String ,

																																			'immutable' : true ,
																											
																																					'required' : [true , `Entry slug for ${ModelType} should be provided and cannot be empty.`] ,

																																						'maxlength' : [120 , `Entry slug cannot be greater than 120 characters in length.`] ,

																													'validate' : {
																																						'validator' : (v) => {
																																																		return FKHelper.secondaryKey1(mongoose.model(`${ModelType}.Comment`) , v );		} ,

																																								'message' : `Entry slug reference doesn't exists in the record or is not available.`	}	} ,

																										'status' : {
																																	'type' : String ,
																																										'enum' : {
																																																'values' : ['approved' , 'disapproved' , 'reviewed'] ,

																																																'message' : 'Status is required.'} ,

																																																'default' : 'approved'		} ,
																															'secondaryKey' : {
																																									'type' : String ,				
																																																		'immutable' : true	} ,
																															'slug' : {
																																					'type' : String ,

																																						'slug' : 'secondaryKey' ,
																																									
																																								'unique' : 'Url for entry should be unique.' ,

																																									'slugpaddingSize' : 1 ,
																																										
																																										'permanent' : true ,

																																											'immutable' : true }
} , {
				'toObject' : {
												'virtuals' : true
				} ,
						'toJSON' : {
													'virtuals' : true
						} ,
								'getters' : true ,

								'id' : false ,

								'selectPopulatedPaths' : false ,

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

																																			'or' : '' , '$' : '' , 'x2f' : '' , 'x27' : '' , 'x5c' : '' , 'quot' : '' , 'lt' : '' , 'gt' : '' , '_' : '' , '-' : ''
																								} 
							};

replySchema.virtual('entry' , {

		'ref' : ModelType ,

		'localField' : 'entry_slug' ,

		'foreignField' : 'url' ,

		'justOne' : true

});

replySchema.virtual('comment' , {

		'ref' : `${ModelType}.Comment` ,

		'localField' : 'comment_slug' ,

		'foreignField' : 'slug' ,

		'justOne' : true

});

replySchema.virtual('votes' , {

		'ref' : `${ModelType}.Reply.Vote` ,

		'localField' : 'slug' ,

		'foreignField' : 'reply_slug' ,

		'justOne' : true

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

replySchema.pre('save', function (next) {

	this.secondaryKey = shortid.generate();
		
		next();		});

replySchema.post('findOne' , uniqueAndCast);

replySchema.post('find' , uniqueAndCast);

replySchema.post('findOneAndUpdate' , uniqueAndCast);

replySchema.plugin(require('mongoose-autopopulate'));

replySchema.plugin(slug , options);

mongoose.set('runValidators' , true);

return mongoose.model(`${ModelType}.Reply` , replySchema);

}