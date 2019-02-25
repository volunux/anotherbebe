var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var eyonSchema = new Schema({
															'eyon' : {
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

eyonSchema
						.virtual('url')
														.get(function () {
  																							return '/' + this.eyon.toLowerCase();
				});

module.exports = mongoose.model('Eyon' , eyonSchema);