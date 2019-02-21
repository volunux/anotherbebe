var name = require('./name') , dress = require('./dress') , food = require('./food') , life = require('./life') , festival = require('./festival') , history = require('./history') , religion = require('./religion') ,

mythology = require('./mythology') , law = require('./law') , legend = require('./legend') , folktale = require('./folktale') , proverb = require('./proverb') , art = require('./art') , war = require('./war') ,

song = require('./song') , video = require('./video') , antiquity = require('./antiquity') , article = require('./article') , book = require('./book') , author = require('./author') , user = require('./users') ,

achievement = require('./achievement') , iname = require('./iname') , index = require('./index');

module.exports = (app) => {

	app.use('/'											,												index);
	app.use('/'											,												iname);

	app.use('/achievement'					,												achievement);
	app.use('/antiquity'						,												antiquity);
	app.use('/art'									,												art);
	app.use('/article'							,												article);
	app.use('/author'								,												author);
	app.use('/book'									,												book);
	app.use('/dress'								,												dress);
	app.use('/festival'							,												festival);
	app.use('/folktale'							,												folktale);
	app.use('/food'									,												food);
	app.use('/history'							,												history);
	app.use('/law'									,												law);
	app.use('/legend'								,												legend);
	app.use('/life'									,												life);
	app.use('/mythology'						,												mythology);
	app.use('/name' 								, 											name);
	app.use('/proverb'							,												proverb);
	app.use('/religion'							,												religion);
	app.use('/song'									,												song);

	app.use('/users'								,												user);

	app.use('/video'								,												video);
	app.use('/war'									,												war);


}