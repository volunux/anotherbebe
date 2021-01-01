const Joi = require('@hapi/joi');

const cover_image = Joi.object({

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
													.optional()

													.allow('')
													
													.min(1)

													.max(140)

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

	'photoSchema' : Joi.object({

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
		'date' : Joi.string()													
													.min(3) 

													.max(15)

													.required()

													.label('Date')

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 4 characters in length.' ,

																												'max' : 'cannot be greater than 15 characters in length.' ,

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

																														'base' : 'should only be of type String.'	}		}		}) ,
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

																													'base' : 'should only be of type String.'	}		}		}) ,
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

		'author' :  Joi.string()	
															.min(1) 

															.max(40)

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

																														'max' : 'cannot be greater than 40 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,

		'summary' :  Joi.string()
														.min(9) 

														.max(2000)

														.required() 

														.label('Summary')

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'min' : 'cannot be less than 10 characters in length.' ,

																													'max' : 'cannot be greater than 2000 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,
		'book_owner' : 	Joi.string()
														.optional()

														.allow('')

														.max(25)

														.label('Book Owner')

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'max' : 'cannot be greater than 40 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,

		'isbn' : Joi.string()
														.optional()

														.allow('')

														.max(40)

														.label('Isbn')

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'max' : 'cannot be greater than 40 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,

		'publisher' :  Joi.string()
														.optional()

														.allow('')

														.min(4) 

														.max(40)

														.label('Publisher')

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'max' : 'cannot be greater than 40 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,
		'page_number' :   Joi.string()															
															.optional()

															.allow('')

															.max(40) 

															.label('Page Number')

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'max' : 'cannot be greater than 40 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,
		'cover_image' :   cover_image

		})

}