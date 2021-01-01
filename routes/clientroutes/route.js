var name = require('./name') , dress = require('./dress') , food = require('./food') , life = require('./life') , festival = require('./festival') , history = require('./history') , religion = require('./religion') ,

mythology = require('./mythology') , law = require('./law') , legend = require('./legend') , folktale = require('./folktale') , proverb = require('./proverb') , art = require('./art') , war = require('./war') ,

song = require('./song') , video = require('./video') , antiquity = require('./antiquity') , article = require('./article') , book = require('./book') , author = require('./author') , entry = require('./entries') ,

user = require('./user') , achievement = require('./achievement') , individual = require('./individual') , iname = require('./iname') , iproverb = require('./iproverb') , ifolktale = require('./ifolktale') ,

iart = require('./iart') , ilegend = require('./ilegend') , ifestival = require('./ifestival') , ifood = require('./ifood') , ilife = require('./ilife') , ilaw = require('./ilaw') , idress = require('./idress') ,

ihistory = require('./ihistory') ,  ireligion = require('./ireligion') , imythology = require('./imythology') , ibook = require('./ibook') , iindividual = require('./iindividual') , photo = require('./photo') ,

upload = require('./upload') , iphoto = require('./iphoto') , s3 = require('./s3') ,  index = require('./index') , add = require('./add') , update = require('./update') , remove = require('./delete') ,

sound = require('./sound') , kEncryptor = require('../../app_api/config/kEncryptor') , myaxios = require('axios') , axios = require('axios');

module.exports = (app) => {


	
	app.use('/'											,												index);

	app.use('/' , (req , res ,  next) => {

		if (req.cookies) {

		}

											axios.defaults.headers.common = { 

											'token' : JSON.stringify(req.cookies)			}

											axios.defaults.withCredentials = true;

		  console.log('I pray it runs before axios');

		    next();

	});


	app.use('/'											,												iname);
	app.use('/'											,												iproverb);
	app.use('/'											,												ifolktale);
	app.use('/'											,												ilegend);	
	app.use('/'											,												iart);	
	app.use('/'											,												ifestival);	
	app.use('/'											,												ifood);	
	app.use('/'											,												ilife);	
	app.use('/'											,												idress);	
	app.use('/'											,												ilaw);	
	app.use('/'											,												ihistory);	
	app.use('/'											,												ireligion);	
	app.use('/'											,												imythology);
	app.use('/'											,												ibook);	
	app.use('/'											,												iindividual);	
	app.use('/'											,												iphoto);	
	app.use('/'											,												upload);


	app.use('/user'									,												user);
	app.use('/s3'										,												s3);
	app.use('/art'									,												art);
	app.use('/article'							,												article);
	app.use('/author'								,												author);
	app.use('/book'									,												book);
	app.use('/dress'								,												dress);
	app.use('/festival'							,												festival);
	app.use('/folktale'							,												folktale);
	app.use('/food'									,												food);
	app.use('/history'							,												history);
	app.use('/individual'						,												individual);	
	app.use('/law'									,												law);
	app.use('/legend'								,												legend);
	app.use('/life'									,												life);
	app.use('/mythology'						,												mythology);
	app.use('/name' 								, 											name);
	app.use('/photo'								,												photo);
	app.use('/proverb'							,												proverb);
	app.use('/religion'							,												religion);
	app.use('/song'									,												song);

	// app.use('/user'									,												user);


	app.use('/video'								,												video);
	app.use('/sound'								,												sound);
	app.use('/war'									,												war);

	// app.use('/entry'								,												entry);
	app.use('/add'									,												add);
	app.use('/update'								,												update);
	app.use('/delete'								,												remove); 

}