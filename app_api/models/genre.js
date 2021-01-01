var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var genreSchema = new Schema({
																'_id' : {

																					'type' : String
																} ,

																'name' : {
																						'type' : String ,
																																'maxlength' : [25 , 'Name of Genre cannot be greater than 25 chracters in length.'] ,
																																										
																																	'minlength' : [1 , 'Name of Genre cannot be less than 1 character in length.'] ,
																																	
																																		'required' : [true , 'Name of Genre should be provided and cannot be emepty.']  	} ,
																		'author' : {
																									'type' : Schema.Types.ObjectId ,
																																										'ref' : 'User' ,
																																																			'autopopulate' : true , 

																												'required' : [true , 'User ID for Genre should be provided and cannot be empty.'] ,

																				'validate' : {
																												'isAsync' : true ,
																																						'validator' : (v) => {
																																																		return FKHelper.primaryKey(mongoose.model('User') , v );
																																																																															} ,
																												'message' : `User ID reference doesn't exists in the record or is not available.`		}	} ,
} ,	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true ,

									'collation' : {
																	'locale' : 'en_US' ,
																												'strength' : 1
									}
});

module.exports = mongoose.model('Genre' , genreSchema);