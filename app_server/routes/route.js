var nameRoute = require('./name') , dressRoute = require('./dress') , foodRoute = require('./food') , lifeRoute = require('./life') , festivalRoute = require('./festival') , historyRoute = require('./history') ,

religionRoute = require('./religion') , mythologyRoute = require('./mythology') , lawRoute = require('./law') , legendRoute = require('./legend') , folktaleRoute = require('./folktale') , artRoute = require('./art') ,

proverbRoute = require('./proverb') , warRoute = require('./war') , videoRoute = require('./video') , bookRoute = require('./book') , entryRoute = require('./entries') , userRoute = require('./user') ,

individualRoute = require('./individual') , photoRoute = require('./photo') , soundRoute = require('./sound') , uploadRoute = require('./upload') , s3Route = require('./s3') ,  indexRoute = require('./index') ,

commentRoute = require('./helpers/comment') , commentAddRoute = require('./helpers/comment_add') , commentUpdateRoute = require('./helpers/comment_update') , 

commentDeleteRoute = require('./helpers/comment_delete') , replyAddRoute = require('./helpers/reply_add') , replyUpdateRoute = require('./helpers/reply_update') , replyDeleteRoute = require('./helpers/reply_delete') , voteRoute = require('./helpers/vote') ,

addRoute = require('./helpers/add') , updateRoute = require('./helpers/update') , removeRoute = require('./helpers/delete') , kEncryptor = require('../../app_api/config/kEncryptor') , axios = require('axios') , 

vAuth = require('../../app_api/config/verifyAuthentication') , uploader = require('./uploader') , config = require('../config/config');

module.exports = (app) => {

	app.use(config.buildBreadcrumb);

	app.use('/'											,												indexRoute);

	app.use('/uploader'							,												uploader);	
	app.use('/s3'										,												s3Route);
	app.use('/art'									,												artRoute);
	app.use('/book'									,												bookRoute);
	app.use('/dress'								,												dressRoute);
	app.use('/festival'							,												festivalRoute);
	app.use('/folktale'							,												folktaleRoute);
	app.use('/food'									,												foodRoute);
	app.use('/history'							,												historyRoute);
	app.use('/individual'						,												individualRoute);	
	app.use('/law'									,												lawRoute);
	app.use('/legend'								,												legendRoute);
	app.use('/life'									,												lifeRoute);
	app.use('/mythology'						,												mythologyRoute);
	app.use('/name' 								, 											nameRoute);
	app.use('/photo'								,												photoRoute);
	app.use('/proverb'							,												proverbRoute);
	app.use('/religion'							,												religionRoute);
	app.use('/video'								,												videoRoute);
	app.use('/sound'								,												soundRoute);
	app.use('/war'									,												warRoute);


	app.use('/' , (req , res ,  next) => {
																					if (req.cookies.sid && req.cookies.sid2) {

																							axios.defaults.headers.common = { 

																							'token' : JSON.stringify(req.cookies)		}

																							axios.defaults.withCredentials = true;
																									  																		return next();	}

																					if (!(req.cookies.sid && req.cookies.sid2)) {

																							axios.defaults.headers.common = { 

																							'token' : 0	}

																							axios.defaults.withCredentials = true;
																									  																		return next();	}			
	});


	app.use('/user'									,												vAuth.fAuth						,												userRoute);
	app.use('/'											,												vAuth.fAuth						,												uploadRoute);
	app.use('/'											,												vAuth.fAuth						,												commentAddRoute);
	app.use('/'											,												vAuth.fAuth						,												replyAddRoute);
	app.use('/'											,												vAuth.fAuth						,												commentUpdateRoute);
	app.use('/'											,												vAuth.fAuth						,												replyUpdateRoute);
	app.use('/'											,												vAuth.fAuth						,												commentDeleteRoute);
	app.use('/'											,												vAuth.fAuth						,												replyDeleteRoute);
	app.use('/'											,												commentRoute);
	app.use('/'											,												vAuth.fAuth						,												voteRoute); 

	// app.use('/user'									,												user);



	// app.use('/entry'								,												entry);
	app.use('/add'									,												vAuth.fAuth						,												addRoute);
	app.use('/update'								,												vAuth.fAuth						,												updateRoute);
	app.use('/delete'								,												vAuth.fAuth						,												removeRoute); 

}