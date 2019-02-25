var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var alphabetSchema = new Schema({
																		'alphabet' : {
																										'type' : String ,
																																			'maxlength' : 20 ,
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

alphabetSchema
								.virtual('url')
																.get(function () {
  																										return '/alphabet/' + this.alphabet;
				});

module.exports = mongoose.model('Alphabet' , alphabetSchema);