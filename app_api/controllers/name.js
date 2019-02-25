var ethnic = '' , alpha = '' , async = require('async') , Eyon = require('../models/eyon') , Alphabet = require('../models/alphabet') , Name = require('../models/name') , Gender = require('../models/gender') ,

Baby = require('../models/baby') , config = require('../config/config') , name = '' , nValue = '' , nParam = '';

module.exports = {


	'nameName' : (req , res) => {		name = req.params.name;
	
		Name.findOne({'name' : new RegExp(name, 'i')})
																										.exec((err , nameResult) => {
																																									if (err) {
																																																			config.response(res , 404 , err);
																																																																				return;	}
																																									if (!nameResult) {
																																																			config.response(res , 404 , {'message' : 'Name cannot be found'});
																																																																																						return;	}
																																																			config.response(res , 200 , nameResult);																					});
	},

	'names' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'List of Names' });
	} , 

	'nameEthnic' : (req , res , next) => {
																										res.render('name/index' , {'title' : 'List of Ethnic Names ordered by Alphabet'})
	} ,

	'nameByAlphabet' : (req , res , next) => {	ethnic = req.params.ethnic.toLowerCase() , alpha = req.params.alphabet.toLowerCase();
		
		async.waterfall([
				
				(callback) => {
																				Eyon.find({'eyon' : new RegExp(ethnic, 'i')})
																																																		.exec((err , ethnicResult) => {
																																																																						callback(null , ethnicResult);	});	
																																													},
				(arg1 , callback) => {
																				Alphabet.findOne({'alphabet' : new RegExp(alpha, 'i')})
																																																		.exec((err , alphabetResult) => {
																																																																						callback(null , alphabetResult , arg1);	});
																																													},
				(arg2 , arg1 , callback) => {		ethnic = arg1[0]['_id'] , alpha = arg2['_id'];

																				Name.find({'ethnic_group' : ethnic , 'alphabet' : alpha})
																																																		.exec((err , namesResult) => {
																																																																						callback(null , namesResult);		})
																																														}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																														return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Names not available under this alphabet.'});
																																																																								return;		}
																												config.response(res , 200 , finalResult);
											});
	} , 

	'nameByGender' : (req , res , next) => {	ethnic = req.params.ethnic.toLowerCase() , gender = req.params.gender.toLowerCase();

		async.waterfall([
				
				(callback) => {
																				Eyon.find({'eyon' : new RegExp(ethnic , 'i')})
																																																		.exec((err , ethnicResult) => {
																																																																						callback(null , ethnicResult);	});	
																																													},
				(arg1 , callback) => {
																				Gender.findOne({'gender' : new RegExp(gender , 'i')})
																																																		.exec((err , genderResult) => {
																																																																						callback(null , genderResult , arg1);	});
																																													},
				(arg2 , arg1 , callback) => {		ethnic = arg1[0]['_id'] , gender = arg2['_id'];

																				Name.find({'ethnic_group' : ethnic , 'gender' : gender})
																																																		.exec((err , namesResult) => {
																																																																						callback(null , namesResult);		})
																																														}],
				(err , finalResult) => {
																	if (err) {
																												config.response(res , 404 , err);
																																														return;	}
																	if (!finalResult) {
																												config.response(res , 404 , {'message' : 'Names not available under this gender.'});
																																																																								return;		}
																												config.response(res , 200 , finalResult);																																														});
	} , 
		
	'nameDetail' : (req , res , next) => {	name = req.params.name;

		Name.findOne({'name' : new RegExp(name, 'i')})
																										.exec((err , nameResult) => {
																																									if (err) {
																																																				config.response(res , 404 , err);
																																																																						return;	}
																																									if (!nameResult) {
																																																				config.response(res , 404 , {'message' : 'Names not available.'});
																																																																																						return;		}
																																																				config.response(res , 200 , nameResult);																							})
	} , 

	'nameAdd' : (req , res , next) => {

			async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									},

																									'Alphabet' : (callback) => {
																																											Alphabet.find({}).exec(callback);
																									},

																									'Gender' : (callback) => {
																																											Gender.find({}).exec(callback);
																									},

																									'Baby' : (callback) => {
																																											Baby.find({}).exec(callback);
																									}
			}, (err , result) => {	
																		if (err) {
																											config.response(res , 404 , err);
																																												return;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved'});
																																																															return;		}
																											config.response(res , 200 , result);																																																					});
	} , 

	'nameAddSubmit' : (req , res , next) => {	var name = new Name(req.body);

		name.save((err) => {
																if (err) {
																										config.response(res , 400 , err);
																				}	else {
																										config.response(res , 200 , {'message' : 'success'});
																}																																						})
	} , 

	'nameUpdate' : (req , res , next) => {	name = req.params.name

		async.parallel({
																									'Eyon' : (callback) => {
																																											Eyon.find({}).exec(callback);
																									},

																									'Alphabet' : (callback) => {
																																											Alphabet.find({}).exec(callback);
																									},

																									'Gender' : (callback) => {
																																											Gender.find({}).exec(callback);
																									},

																									'Baby' : (callback) => {
																																											Baby.find({}).exec(callback);
																									} ,

																									'Name' : (callback) => {
																																							Name.findOne({'name' : new RegExp(name, 'i')})
																																																																.exec(callback) }	
			}, (err , result) => {	
																		if (err) {
																											config.response(res , 404 , err);
																																												return;		}
																		if (!result) {
																											config.response(res , 404 , {'message' : 'Data cannot be retrieved'});
																																																															return;		}
																											config.response(res , 200 , result);																																																									})
	} , 

	'nameUpdateSubmit' : (req , res , next) => {	nValue = req.body , nParam = req.params.name;

				if (req.params && req.params.name) {

		Name.findOneAndUpdate({'name' : new RegExp(nParam, 'i')} , nValue , (err) => {
																																											if (err) {
																																																		config.response(res , 404 , err);
																																																																				return;	}

																																																		config.response(res , 201 , {'message' : 'Successful request.'});						});
							} else {
													config.response(res , 404 , {'message' : 'No Name id found'});		}
	} , 

	'nameDelete' : (req , res , next) => {	name = req.params.name;
		
		Name.findOneAndRemove({'name' : new RegExp(name , 'i')} , (err) => {
																																					if (err) {
																																											config.response(res , 404 , err);
																																																												return;		}

																																											config.response(res , 204 , {'message' : 'success'});																																			});
	} , 

	'nameDeleteSubmit' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Remove a Name' });
	} , 

	'nameVote' : (req , res , next) => {
																									  res.render('name/index' , { 'title': 'Vote a Name' });
	} , 
}				