var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var genderSchema = new Schema({
																'gender' : {
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



genderSchema
							.virtual('url')
															.get(function () {
  																								return '/gender/' + this.gender;
				});

module.exports = mongoose.model('Gender' , genderSchema);