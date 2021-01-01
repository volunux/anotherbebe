const Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

const photo_detail = Joi.object({

     'encoding' : Joi.string()
															.min(1)

															.max(20)
															
															.required()

															.label('Encoding')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 20 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}),
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

	'nameSchema' : Joi.object({

		'name' : Joi.string()
													.min(1)

													.max(36)
													
													.required()

													.label('Name')

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 1 characters in length.' ,

																												'max' : 'cannot be greater than 36 characters in length.' ,

																												'base' : 'should only be of type String.'	}		}		}) ,
		'definition' : Joi.string()
																.min(4)

																.max(300)
																
																.required()

																.label('Definition')

																.options({
																						'language' : {

																								'any' : {
																													'required' : 'should be provided and cannot be empty.'
																								} ,

																								'string' : {
																															'min' : 'cannot be less than 5 characters in length.' ,

																															'max' : 'cannot be greater than 300 characters in length.' ,

																															'base' : 'should only be of type String.'	}		}		}) ,
		'morphology' : Joi.string()
																.min(4)

																.max(200)
																
																.required()

																.label('Morphology')

																.options({
																						'language' : {

																								'any' : {
																													'required' : 'should be provided and cannot be empty.'
																								} ,

																								'string' : {
																															'min' : 'cannot be less than 5 characters in length.' ,

																															'max' : 'cannot be greater than 200 characters in length.' ,

																															'base' : 'should only be of type String.'	}		}		}) ,

		'gloss' : Joi.string()
													.min(4)

													.max(200)
													
													.required()

													.label('Gloss')

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 5 characters in length.' ,

																												'max' : 'cannot be greater than 200 characters in length.' ,

																												'base' : 'should only be of type String.'	}		}		}) ,
		'alphabet' : Joi.string()
															.min(1) 

															.max(3)

															.required() 

															.label('Alphabet')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 3 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,
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

																																	'base' : 'should only be of type String.'	}		}		}) ,
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

																															'base' : 'should only be of type String.'	}		}		}) ,
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

																														'base' : 'should only be of type String.'	}		}		}) ,
		'gender' : Joi.string()
														.min(1)

														.max(10)

														.required()

														.label('Gender')

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'min' : 'cannot be less than 1 characters in length.' ,

																													'max' : 'cannot be greater than 10 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,
		'specie' :  Joi.string()
															.min(1) 

															.max(10)

															.required()

															.label('Specie')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 10 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,
		'baby' :  Joi.string()
														.min(1) 

														.max(10)

														.required() 

														.label('Baby')

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'min' : 'cannot be less than 1 characters in length.' ,

																													'max' : 'cannot be greater than 10 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,

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

		'photo_detail' :   photo_detail

		})

}