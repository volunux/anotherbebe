var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var specieSchema = new Schema({
															'specie' : {
																					'type' : String ,
																														'maxlength' : 25 ,
																																								'required' : true ,
																																																		'minlength' : 1			}
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

specieSchema
						.virtual('url')
														.get(function () {
  																							return '/' + this.specie.toLowerCase();
				});

module.exports = mongoose.model('Specie' , specieSchema);