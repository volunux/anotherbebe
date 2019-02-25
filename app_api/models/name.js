var mongoose = require('mongoose'),		Schema = mongoose.Schema;

var nameSchema = new Schema({
															'name' : String ,

																									'definition' : String ,
																																						'morphology' : String ,
																																																			'gloss' : String ,

										'alphabet' : {	'type' : Schema.Types.ObjectId ,	'ref' : 'Alphabet' , 'autopopulate' : true 	} ,

																				'ethnic_group' : {	'type' : Schema.Types.ObjectId ,	'ref' : 'Eyon' , 'autopopulate' : true 	} ,

										'gender' : {	'type' : Schema.Types.ObjectId ,	'ref' : 'Gender' , 'autopopulate' : true 	} ,

																														'baby' : {	'type' : Schema.Types.ObjectId ,	'ref' : 'Baby' , 'autopopulate' : true 	} 
},	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});

nameSchema.plugin(require('mongoose-autopopulate'));


nameSchema
						.virtual('url')
														.get(function () {
  																							return '/name/' + this.name;
				});

module.exports = mongoose.model('Name' , nameSchema);