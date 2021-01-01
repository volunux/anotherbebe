const Joi = require('@hapi/joi');

Joi.objectId = require('joi-objectid')(Joi);

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
													.min(1) 

													.max(15)

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
		'century' : Joi.objectId()
															.min(1) 

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
		'genre' : Joi.objectId()
														.min(1) 

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
		'country' :  Joi.objectId()
															.min(1) 

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
		'continent' :  Joi.objectId()
																.min(1) 

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
		'region' :  Joi.objectId()
															.min(1) 

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

		'ethnic_group' :  Joi.objectId()
																		.min(1) 

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

		'author' :  Joi.objectId()	
															.min(1) 

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
																													'min' : 'cannot be less than 5 characters in length.' ,

																													'max' : 'cannot be greater than 120 characters in length.' ,

																													'base' : 'should only be of type String.'	}		}		}) ,
		'artist' : 	Joi.string()
														.alphanum()
														
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
														.alphanum()
														
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
														.alphanum()
														
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
																.min(10) 

																.max(2000) 

																.options({
																						'language' : {

																								'any' : {
																													'required' : 'should be provided and cannot be empty.'
																								} ,

																								'string' : {
																															'min' : 'cannot be less than 5 characters in length.' ,

																															'max' : 'cannot be greater than 120 characters in length.' ,

																															'base' : 'should only be of type String.'	}		}		}) ,

		})

}