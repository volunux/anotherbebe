var name = require('./name') , dress = require('./dress') , food = require('./food') , life = require('./life') , festival = require('./festival') , history = require('./history') , religion = require('./religion') ,

mythology = require('./mythology') , law = require('./law') , legend = require('./legend') , folktale = require('./folktale') , proverb = require('./proverb') , art = require('./art') , war = require('./war') ,

song = require('./song') , video = require('./video') , antiquity = require('./antiquity') , article = require('./article') , book = require('./book') , author = require('./author') , user = require('./users') ,

achievement = require('./achievement') , country = require('./country') , gender = require('./gender') , alphabet = require('./alphabet')  , baby = require('./baby') , eyon = require('./eyon') ,

specie = require('./specie') , iname = require('./iname') , index = require('./index');

module.exports = (app) => {

	app.use('/api'									,												achievement);
	app.use('/api'									,												alphabet);
	app.use('/api'									,												antiquity);
	app.use('/api'									,												art);
	app.use('/api'									,												article);
	app.use('/api'									,												author);
	app.use('/api'									,												baby);
	app.use('/api'									,												book);
	app.use('/api'									,												country);
	app.use('/api'									,												dress);
	app.use('/api'									,												eyon);
	app.use('/api'									,												festival);
	app.use('/api'									,												folktale);
	app.use('/api'									,												food);
	app.use('/api'									,												gender);
	app.use('/api'									,												history);
	app.use('/api'									,												law);
	app.use('/api'									,												legend);
	app.use('/api'									,												life);
	app.use('/api'									,												mythology);
	app.use('/api' 									, 											name);
	app.use('/api'									,												proverb);
	app.use('/api'									,												religion);
	app.use('/api'									,												song);
	app.use('/api'									,												specie);

	app.use('/api'									,												user);

	app.use('/api'									,												video);
	app.use('/api'									,												war);


}