const Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

const photo_detail = Joi.object({

		 'fieldname': 		Joi.string()

													.optional()

													.allow('')

													.min(1)

													.max(120)
													
													.required()

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 1 characters in length.' ,

																												'max' : 'cannot be greater than 120 characters in length.' ,

																												'base' : 'should only be of type String.'	}		}		}) ,
     'originalname' : Joi.string()

													.optional()

													.allow('')

													.min(1)

													.max(120)
													
													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 1 characters in length.' ,

																												'max' : 'cannot be greater than 120 characters in length.' ,

																												'base' : 'should only be of type String.'	}		}		}),
     'encoding' : Joi.string()
															.min(1)

															.max(20)
															
															.required()

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

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 20 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		})	,
     'destination' : 		Joi.string()
																		.optional()

																		.allow('')

																		.allow(null)

																		.max(300)
																		
																		.options({
																								'language' : {

																										'any' : {
																															'required' : 'should be provided and cannot be empty.'
																										} ,

																										'string' : {
																																	'min' : 'cannot be less than 1 characters in length.' ,

																																	'max' : 'cannot be greater than 300 characters in length.' ,

																																	'base' : 'should only be of type String.'	}		}		}),
     'filename' : Joi.string()
															.optional()

															.allow('')

															.allow(null)

															.max(120)
															
															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 120 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}),
     'path' : Joi.string()
													.optional()

													.allow('')

													.allow(null)
													
													.max(120)

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 1 characters in length.' ,

																												'max' : 'cannot be greater than 120 characters in length.' ,

																												'base' : 'should only be of type String.'	}		}		}),
     'size' : Joi.number()
													.required()

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
													.min(5)

													.max(120)
													
													.required()

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 5 characters in length.' ,

																												'max' : 'cannot be greater than 120 characters in length.' ,

																												'base' : 'should only be of type String.'	}		}		}) ,
		'date' : Joi.string()													
													.min(4) 

													.max(15)

													.required() 

													.options({
																			'language' : {

																					'any' : {
																										'required' : 'should be provided and cannot be empty.'
																					} ,

																					'string' : {
																												'min' : 'cannot be less than 4 characters in length.' ,

																												'max' : 'cannot be greater than 15 characters in length.' ,

																												'base' : 'should only be of type String.'	}		}		}) ,
		'century' : Joi.objectId()
															.min(1) 

															.max(24)

															.required() 

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 24 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,
		'genre' : Joi.objectId()
														.min(1)

														.max(24)

														.required() 

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'min' : 'cannot be less than 1 characters in length.' ,

																													'max' : 'cannot be greater than 24 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,
		'country' :  Joi.objectId()
															.min(1) 

															.max(24)

															.required() 

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 24 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,
		'continent' :  Joi.objectId()
																.min(1) 

																.max(24)

																.required() 

																.options({
																						'language' : {

																								'any' : {
																													'required' : 'should be provided and cannot be empty.'
																								} ,

																								'string' : {
																															'min' : 'cannot be less than 1 characters in length.' ,

																															'max' : 'cannot be greater than 24 characters in length.' ,

																															'base' : 'should only be of type String.'	}		}		}) ,
		'region' :  Joi.objectId()
															.min(1) 

															.max(24)

															.required()

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 24 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,

		'ethnic_group' :  Joi.objectId()
																		.min(1) 

																		.max(24)

																		.required()

																		.options({
																								'language' : {

																										'any' : {
																															'required' : 'should be provided and cannot be empty.'
																										} ,

																										'string' : {
																																	'min' : 'cannot be less than 1 characters in length.' ,

																																	'max' : 'cannot be greater than 24 characters in length.' ,

																																	'base' : 'should only be of type String.'	}		}		}) ,

		'author' :  Joi.objectId()	
															.min(1) 

															.max(24)

															.required()

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 1 characters in length.' ,

																														'max' : 'cannot be greater than 24 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,

		'about' :  Joi.string()
														.min(10) 

														.max(2000)

														.required() 

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'min' : 'cannot be less than 10 characters in length.' ,

																													'max' : 'cannot be greater than 2000 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,
		'artist' : 	Joi.string()
														.optional()

														.allow('')

														.min(5) 

														.max(25)

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'min' : 'cannot be less than 5 characters in length.' ,

																													'max' : 'cannot be greater than 120 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,

		'findspot' : Joi.string()
														.optional()

														.allow('')

														.min(5) 

														.max(25)

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'min' : 'cannot be less than 5 characters in length.' ,

																													'max' : 'cannot be greater than 120 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,

		'medium' :  Joi.string()
														.optional()

														.allow('')

														.min(5) 

														.max(25)

														.options({
																				'language' : {

																						'any' : {
																											'required' : 'should be provided and cannot be empty.'
																						} ,

																						'string' : {
																													'min' : 'cannot be less than 5 characters in length.' ,

																													'max' : 'cannot be greater than 120 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,
		'credit' :   Joi.string()															
															.optional()

															.allow('')

															.min(5) 

															.max(25) 

															.options({
																					'language' : {

																							'any' : {
																												'required' : 'should be provided and cannot be empty.'
																							} ,

																							'string' : {
																														'min' : 'cannot be less than 5 characters in length.' ,

																														'max' : 'cannot be greater than 120 characters in length.' ,

																														'base' : 'should only be of type String.'	}		}		}) ,
		'dimension' :   Joi.string()
																.optional()

																.allow('')

																.min(5) 

																.max(120)

																.options({
																						'language' : {

																								'any' : {
																													'required' : 'should be provided and cannot be empty.'
																								} ,

																								'string' : {
																															'min' : 'cannot be less than 5 characters in length.' ,

																															'max' : 'cannot be greater than 120 characters in length.' ,

																															'base' : 'should only be of type String.'	}		}		}) ,

		'photo_detail' :   photo_detail

		})

}