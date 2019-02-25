var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var babySchema = new Schema({
																'baby' : {
																							'type' : Boolean } 

},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});



babySchema
							.virtual('url')
															.get(function () {
  																								return '/baby/' + this.baby;
				});

module.exports = mongoose.model('Baby' , babySchema);