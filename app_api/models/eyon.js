var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var eyonSchema = new Schema({
															'_id' : {

																				'type' : String
															} ,
															
																'name' : {
																						'type' : String ,
																															'minlength' : [1 , 'Name of Ethnic Group cannot be less than 1 character in length.'] ,

																															'maxlength' : [25 , 'Name of Ethnic Group cannot be greater than 25 characters in length.'] ,

																															'required' : [true , 'Name of Ethnic Group should be provided and cannot be empty .'] 	} ,

																		'author' : {
																									'type' : Schema.Types.ObjectId ,
																																										'ref' : 'User' ,
																																																			'autopopulate' : true , 

																												'required' : [true , 'User ID for Eyon should be provided and cannot be empty.'] ,
																				
																				'validate' : {
																												'isAsync' : true ,
																																						'validator' : (v) => {
																																																		return FKHelper.primaryKey(mongoose.model('User') , v );	} ,

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
																												'strength' : 2
									}
});


module.exports = mongoose.model('Eyon' , eyonSchema);