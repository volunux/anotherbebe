var mongoose = require('mongoose') ,	Schema = mongoose.Schema;

var uploadSchema = new Schema({
																'Key' : {
																						'type' : String ,
																															'maxlength' : 200 ,
																																									'required' : true ,
																																																			'minlength' : 1			} ,

																	'entry_slug' :  {
																										'type' : String ,
																				
																												'maxlength' : [150 , `Entry slug cannot be greater than 150 characters in length.`]	} ,

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


module.exports = mongoose.model('Upload' , uploadSchema);