const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

var express = require('express') , router = express.Router() , axios = require('axios') , uConfig = require('../config/upload') , uploadS3 = require('../config/upload-image') , multer  = require('multer') ,

upload = multer({ 'storage' : uploadS3.mConfig }) , data = '' , iConfig = require('../config/index') , url = '' , authentication = require('../controllers/authentication/authentication') ,

eConfig = require('../config/eyon') , cConfig = require('../config/country');

module.exports = {

	'all' : (req, res, next) => { url = `${iConfig.reqOptions.url}all`;
	
		axios.get(url)
									.then((response) => {	data = response.data.status , festival = data.Festival , life = data.Life , folktale = data.Folktale , food = data.Food , art = data.Art;

										// console.log(req.app.get('meme'));
																															res.render('all' , { 'title' : 'Aiye' , 'festivals' : festival , 'lifes' : life , 'folktales' : folktale , 'foods' : food , 'arts' : art	});		})
									.catch((err) => { status = err.response;
																															res.render('error' , {'title' : 'Error' , 'error' : status 	})	
							})
			} ,

	'ethnicList' : (req , res , next) => {  url = `${eConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('index/list_ethnic' , { 'title': 'List of Ethnic Groups' , 'eyons' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entries not available' , 'error' : status 	})				});
	} ,

	'countryList' : (req , res , next) => {  url = `${cConfig.reqOptions.url}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('index/list_country' , { 'title': 'List of Countries' , 'countries' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entries not available' , 'error' : status 	})					});
	} ,

	'ethnicEntries' : (req , res , next) => {  ethnic = req.params.ethnic.toLowerCase() , url = `${eConfig.reqOptions.url}name/${ethnic}` , title = `${ethnic[0].toUpperCase()}${ethnic.slice(1)}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('index/ethnic_entries' , { 'title': `Ethnic Group : ${title}` , 'eyon' : data 	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Ethnic entry not available' , 'error' : status 	})				});
	} ,

	'countryEntries' : (req , res , next) => { country = req.params.country.toLowerCase() ,  url = `${cConfig.reqOptions.url}name/${country}` , title = `${country[0].toUpperCase()}${country.slice(1)}`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('index/country_entries' , { 'title': `Ethnic Group : ${title}` , 'country' : data	});				})
										.catch((err) => {				status = err.response;
																																				res.render('error' , {'title' : 'Country entry not available' , 'error' : status 	})					});
	} ,

	'uploadPhoto' : (req , res) => {

			axios({   'method': 'post' ,
																		'url' : uConfig.reqOptions.url ,
																																			'data' : req.files[0]   })

					.then((response) => { /*var data = response.data.status.location;*/

						console.log(response);

						return;
																																							res.send({'link' : data});       
					})
						.catch((err) => {
																			res.json({'error' : 'An Error has occured.'})
						})
			}

}