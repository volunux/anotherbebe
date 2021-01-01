const { body, validationResult } = require('express-validator/check');	

const { sanitizeBody } = require('express-validator/filter');

axios = require('axios') , url = '' ,  data = '' , ethnic = '' , art = '' , status = '' , errors = '' , errArr = '' , eConfig = require('../config/entry');

module.exports = {

	'entry' : (req , res , next) => {
																			res.render('user/entries' , { 'title' : 'User entry by category'});
	} ,

	'art' : (req , res , next) => { url = `${eConfig.reqOptions.url}art`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Art Entry' , 'arts' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'book' : (req , res , next) => { url = `${eConfig.reqOptions.url}book`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Book Entry' , 'books' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'dress' : (req , res , next) => { url = `${eConfig.reqOptions.url}dress`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Dress Entry' , 'dresses' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'festival' : (req , res , next) => { url = `${eConfig.reqOptions.url}festival`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Festival Entry' , 'festivals' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'folktale' : (req , res , next) => { url = `${eConfig.reqOptions.url}folktale`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Folktale Entry' , 'folktales' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'food' : (req , res , next) => { url = `${eConfig.reqOptions.url}food`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Food Entry' , 'foods' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'history' : (req , res , next) => { url = `${eConfig.reqOptions.url}history`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of History Entry' , 'histories' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'individual' : (req , res , next) => { url = `${eConfig.reqOptions.url}individual`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Individual Entry' , 'individuals' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'law' : (req , res , next) => { url = `${eConfig.reqOptions.url}law`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Law Entry' , 'laws' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'legend' : (req , res , next) => { url = `${eConfig.reqOptions.url}legend`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Legend Entry' , 'legends' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'life' : (req , res , next) => { url = `${eConfig.reqOptions.url}life`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Life Entry' , 'lifes' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'mythology' : (req , res , next) => { url = `${eConfig.reqOptions.url}mythology`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Mythology Entry' , 'mythologies' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'name' : (req , res , next) => { url = `${eConfig.reqOptions.url}name`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Name Entry' , 'names' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'photo' : (req , res , next) => { url = `${eConfig.reqOptions.url}photo`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Photo Entry' , 'photos' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'proverb' : (req , res , next) => { url = `${eConfig.reqOptions.url}proverb`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Proverb Entry' , 'proverbs' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'religion' : (req , res , next) => { url = `${eConfig.reqOptions.url}religion`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Religion Entry' , 'religions' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'sound' : (req , res , next) => { url = `${eConfig.reqOptions.url}sound`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Sound Entry' , 'sounds' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} ,

	'video' : (req , res , next) => { url = `${eConfig.reqOptions.url}video`;

			axios.get(url).then((response) => {	data = response.data.status;
																																				res.render('user/entries/entry' , { 'title': 'List of Video Entry' , 'videos' : data	});				})
										.catch((err) => {			status = err.response;
																																				res.render('error' , {'title' : 'Error' , 'error' : status 	})						});
	} 

}