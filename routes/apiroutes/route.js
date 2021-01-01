var createError = require('http-errors');

var name = require('./name') , dress = require('./dress') , food = require('./food') , life = require('./life') , festival = require('./festival') , history = require('./history') , religion = require('./religion') ,

mythology = require('./mythology') , law = require('./law') , legend = require('./legend') , folktale = require('./folktale') , proverb = require('./proverb') , art = require('./art') , war = require('./war') ,

song = require('./song') , video = require('./video') , antiquity = require('./antiquity') , article = require('./article') , book = require('./book') , author = require('./author') , entry = require('./entries') ,

user = require('./user') , achievement = require('./achievement') , country = require('./country') , gender = require('./gender') , alphabet = require('./alphabet')  , baby = require('./baby') ,

eyon = require('./eyon') , specie = require('./specie') , century = require('./century') , individual = require('./individual') , region = require('./region') , photo = require('./photo') , obj = {} ,

upload = require('./upload') , genre = require('./genre') , continent = require('./continent') , index = require('./index') , authentication = require('./authentication') , sound = require('./sound') ,

indexCtrl = require('../controllers/index') , vAuth = require('../config/verifyAuthentication') , kEncryptor = require('../config/kEncryptor') , cors = require('cors') , myaxios = require('axios');


module.exports = (app) => {

	app.use('/api' 									,												authentication);

	app.use('/api' 									,												kEncryptor.decryptor , 	vAuth.auth);

	app.use('/api'									,												index);
	app.use('/api'									,												entry);
	app.use('/api'									,												achievement);
	app.use('/api'									,												alphabet);
	app.use('/api'									,												antiquity);
	app.use('/api'									,												art);
	app.use('/api'									,												article);
	app.use('/api'									,												author);
	app.use('/api'									,												baby);
	app.use('/api'									,												book);
	app.use('/api'									,												century);	
	app.use('/api'									,												continent);	
	app.use('/api'									,												country);
	app.use('/api'									,												dress);
	app.use('/api'									,												eyon);
	app.use('/api'									,												festival);
	app.use('/api'									,												folktale);
	app.use('/api'									,												food);
	app.use('/api'									,												gender);
	app.use('/api'									,												genre);
	app.use('/api'									,												history);
	app.use('/api'									,												individual);
	app.use('/api'									,												law);
	app.use('/api'									,												legend);
	app.use('/api'									,												life);
	app.use('/api'									,												mythology);
	app.use('/api' 									, 											name);
	app.use('/api'									,												photo);
	app.use('/api'									,												proverb);
	app.use('/api'									,												religion);
	app.use('/api'									,												region);
	app.use('/api'									,												sound);
	app.use('/api'									,												specie);

	app.use('/api'									,												user);
	app.use('/api'									,												upload);

	app.use('/api'									,												video);
	app.use('/api'									,												war);

	// app.use('/api' , (req , res , next) => {
	// 																					res.header('Access-Control-Allow-Origin' , 'http://localhost:3000');
	// 																																														next();
	// });

	app.use('/api' , (req , res , next) => {

				next(createError(404));
	});


	app.use('/api' , (err , req , res , next) => {

		console.log(err);

			res.json({'message' : 'An error has occured. The API url doesn\'t exist'})
	});

}