const Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

const photo_detail = Joi.object({

     'mimetype' : Joi.string()
															.min(1)

															.max(20)
															
     													.required()

     													.label('File Type')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 20 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		})	,
     'location' : Joi.string()
															.min(1)

															.max(140)

															.required()
														
															.label('Destination')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 140 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}),
     'key' : Joi.string()	
													.min(1)

													.max(140)

													.required()

													.label('File Name')

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 1 characters in length.' ,

																												'max' : 'cannot be greater than 140 characters in length.' ,

																												'base' : 'should only be of type String.'	}		}		}),
     'size' : Joi.number()
													.required()

													.label('Size')

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'number' : {
																												'base' : 'should only be of type number.'	}		}		})
});

module.exports = {

	'articleSchema' : Joi.object({

		'title' : Joi.string()
													.min(4)

													.max(150)
													
													.required()

													.label('Title')

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 5 characters in length.' ,

																												'max' : 'cannot be greater than 150 characters in length.' ,

																												'base' : 'should only be of type String.'	}		}		}) ,
		'century' : Joi.string()
															.min(1) 

															.max(40)

															.required() 

															.label('Century')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 40 characters in length.' ,

																														'base' : 'should only be of type Number.'	}		}		}) ,
		'genre' : Joi.string()
														.min(1)

														.max(40)

														.required()

														.label('Genre')

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'min' : 'cannot be less than 1 characters in length.' ,

																													'max' : 'cannot be greater than 40 characters in length.' ,

																													'base' : 'should only be of type Number.'	}		}		}) ,
		'country' :  Joi.string()
															.min(1) 

															.max(40)

															.required()

															.label('Country')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 40 characters in length.' ,

																														'base' : 'should only be of type Number.'	}		}		}) ,
		'continent' :  Joi.string()
																.min(1) 

																.max(40)

																.required() 

																.label('Continent')

																.options({
																						'language' : {

																								'key' : 'Continent' ,

																								'label' : 'Continent' ,

																								'any' : {
																													'required' : 'should be provided and cannot be empty.'
																								} ,

																								'string' : {
																															'min' : 'cannot be less than 1 characters in length.' ,

																															'max' : 'cannot be greater than 40 characters in length.' ,

																															'base' : 'should only be of type Number.'	}		}		}) ,
		'region' :  Joi.string()
															.min(1) 

															.max(40)

															.required()

															.label('Region')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 40 characters in length.' ,

																														'base' : 'should only be of type Number.'	}		}		}) ,
		'ethnic_group' :  Joi.string()
																		.min(1) 

																		.max(40)

																		.required()

																		.label('Ethnic Group')

																		.options({
																								'language' : {

																										'any' : {
																															'required' : 'should be provided and cannot be empty.'
																										} ,

																										'string' : {
																																	'min' : 'cannot be less than 1 characters in length.' ,

																																	'max' : 'cannot be greater than 40 characters in length.' ,

																																	'base' : 'should only be of type Number.'	}		}		}) ,

		'author' :  Joi.string()	
															.min(1) 

															.max(24)

															.regex(/^[0-9a-fA-F]{24}$/)

															.required()

															.label('Author')

															.options({
																					'language' : { 

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 24 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,

		'main_body' :  Joi.string()
															.min(9) 

															.max(6000)

															.required() 

															.label('Body')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																						'string' : {
																													'min' : 'cannot be less than 10 characters in length.' ,

																													'max' : 'cannot be greater than 2000 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,
		'photos' :   photo_detail

		})

}