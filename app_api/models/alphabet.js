var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater');

var alphabetSchema = new Schema({
																	'_id' : {

																						'type' : String
																	} ,

																		'name' : {
																								'type' : String ,
																																	'minlength' : [1 , 'Name of Alphabet cannot be less than 1 character in length.'] ,
																																	
																																	'maxlength' : [2, 'Name of Alphabet cannot be greater than 2 characters in length.'] ,

																																	'required' : [true , 'Alphabet should be provided and cannot be empty.']		} ,

																							'author' : {
																														'type' : Schema.Types.ObjectId ,
																																															'ref' : 'User' ,
																																																								'autopopulate' : true , 

																																'required' : [true , 'User ID for Alphabet should be provided and cannot be empty.'] ,

																									'validate' : {
																																	'isAsync' : true ,
																																											'validator' : (v) => {
																																																							return FKHelper(mongoose.model('User') , v );		} ,

																																	'message' : `User ID reference doesn't exists in the record or is not available.`		}	} ,
} ,	{
				'toObject' : {
												'virtuals' : true
				} ,
						'toJSON' : {
													'virtuals' : true
						} ,
								'getters' : true ,

									'collation' : {
																	'locale' : 'en_US' ,
																												'strength' : 2
									}
});

module.exports = mongoose.model('Alphabet' , alphabetSchema);