var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var yearSchema = new Schema({
															'year' : {
																					'type' : Number ,
																														'minlength' : [1 , 'Year cannot be less than 1 character in length.'],
																															
																															'required' : [true , 'Year cannot be empty and should be provided.'] ,
																																
																																'maxlength' : [6 , 'Year cannot be greater than 6 characters in length.']
																	} ,

																			'author' : {
																										'type' : Schema.Types.ObjectId ,
																																											'ref' : 'User' ,
																																																				'autopopulate' : true , 'required' : [true , 'User ID for Year should be provided.'] ,
																					'validate' : {
																													'isAsync' : true ,
																																							'validator' : (v) => {
																																																			return FKHelper(mongoose.model('User') , v );
																																																																												} ,
																													'message' : `User ID reference doesn't exist.`
																								}	} ,

} ,	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});



module.exports = mongoose.model('Year' , yearSchema);