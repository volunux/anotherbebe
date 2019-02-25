var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var countrySchema = new Schema({
																	'code' : {	'type' : String , 
																																'maxlength' : 5 ,
																																									'required' : true ,
																																																				'minlength' : 1	},
																		'name' : {
																								'type' : String ,
																																	'maxlength' : 20 ,
																																											'required' : true ,
																																																					'minlength' : 1		} ,
																					'phone_code' : {
																														'type' : String ,
																																								'maxlength' : 7 ,
																																																		'required' : true ,
																																																													'minlength' : 1 	}
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

/**countrySchema
								.virtual('url')
																.get(function () {
  																										return '/country/' + this.country;
				});


*/

module.exports = mongoose.model('country' , countrySchema);