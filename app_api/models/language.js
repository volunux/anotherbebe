var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var languageSchema = new Schema({
																	'language' : {
																									'type' : String ,
																																		'maxlength' : [25 , 'Language cannot be greater than 25 characters in length.'] ,
																																		
																																		'required' : [true , 'Language cannot be empty and should be provided.'] ,
																																		
																																		'minlength' : [1 , 'Language cannot be less than 1 character in length.']			} ,

																						'author' : {
																													'type' : Schema.Types.ObjectId ,
																																														'ref' : 'User' ,
																																																							'autopopulate' : true , 'required' : [true , 'User ID for Language should be provided.'] ,
																								'validate' : {
																																'isAsync' : true ,
																																										'validator' : (v) => {
																																																						return FKHelper(mongoose.model('User') , v );
																																																																															} ,
																																'message' : `User ID reference doesn't exist.`
																											}	} ,
});

module.exports = mongoose.model('Language' , languageSchema);