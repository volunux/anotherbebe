var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var babySchema = new Schema({
															'_id' : {

																				'type' : String
															} ,

																'name' : {
																						'type' : String ,
																																'required' : [true , 'Baby should be provided and cannot be empty.']		} ,
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

module.exports = mongoose.model('Baby' , babySchema);