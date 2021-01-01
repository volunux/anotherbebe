var mongoose = require('mongoose') ,	Schema = mongoose.Schema , slug = require('mongoose-slug-updater');

const FKHelper = require('./helpers/foreign-key-helper');

var photoSchema = new Schema({
																'originalname' : {	'type' : String,	
																																		'required' : true 	},
																																														'path' : String,
																																																							'type' : String, 
																																																																'encoding' :  String																																								
													});

var achievementSchema = new Schema({
	
															'title' : {
																						'type' : String ,
																															'maxlength' : [120 , 'Title cannot be greater than 120 characters in length.'] ,
																															
																															'required' : [true , 'Title cannot be empty and should be provided.'] ,
																															
																															'minlength' : [1 , 'Title cannot be less than 1 character in length.']		} ,

																			'country' : {
																										'type' : Schema.Types.ObjectId ,
																																											'ref' : 'Country' ,
																																																					'autopopulate' : true , 'required' : [true , 'Country ID for achievement should be provided.'] ,
																										'validate' : {
																																		'isAsync' : true ,
																																												'validator' : (v) => {
																																																								return FKHelper(mongoose.model('Country') , v );
																																																																																	} ,
																																		'message' : `Country ID reference doesn't exist.`
																													}	} ,

																					'ethnic_group' : {
																															'type' : Schema.Types.ObjectId ,
																																																'ref' : 'Eyon' ,
																																																									'autopopulate' : true , 'required' : [true , 'Ethnic Group ID for achievement should be provided.'] ,
																										'validate' : {
																																		'isAsync' : true ,
																																												'validator' : (v) => {
																																																								return FKHelper(mongoose.model('Eyon') , v );
																																																																																	} ,
																																		'message' : `Ethnic Group ID reference doesn't exist.`
																													}	} ,

																							'main_body' : {
																															'type' : String ,
																																								'maxlength' : [6000 , 'Achievement body cannot be greater than 6000 characters in length.'] ,
																																								
																																								'required' : [true , 'Achievement body cannot be empty and should be provided.'] ,
																																								
																																								'minlength' : [10 , 'Achievement body cannot be less than 1 character in length.']			} ,

																											'url' : {
																																	'type' : String ,
																																										'slug' : 'title' ,
																																																				'unique' : true ,
																																																													'slugPaddingSize' : 1	,
																																																																									'permanent' : true	}
} ,	{
				'toObject' : {
												'virtuals' : true
				},
						'toJSON' : {
													'virtuals' : true
						},
								'getters' : true
});



achievementSchema.plugin(require('mongoose-autopopulate'));

mongoose.plugin(slug);

module.exports = mongoose.model('Achievement' , achievementSchema);