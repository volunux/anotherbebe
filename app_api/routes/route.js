var nameRoute = require('./name') , dressRoute = require('./dress') , foodRoute = require('./food') , lifeRoute = require('./life') , festivalRoute = require('./festival') , historyRoute = require('./history') ,

religionRoute = require('./religion') , mythologyRoute = require('./mythology') , lawRoute = require('./law') , legendRoute = require('./legend') , folktaleRoute = require('./folktale') , artRoute = require('./art') ,

proverbRoute = require('./proverb') , warRoute = require('./war') , videoRoute = require('./video') , bookRoute = require('./book') , entryRoute = require('./entries') , userRoute = require('./user') , obj = {} ,

countryRoute = require('./country') ,  genderRoute = require('./gender') , alphabetRoute = require('./alphabet')  , babyRoute = require('./baby') , eyonRoute = require('./eyon') , specieRoute = require('./specie') ,

centuryRoute = require('./century') , soundRoute = require('./sound') , photoRoute = require('./photo') , individualRoute = require('./individual') , regionRoute = require('./region') ,

uploadRoute = require('./upload') , genreRoute = require('./genre') , continentRoute = require('./continent') , indexRoute = require('./index') , authenticationRoute = require('./authentication') ,  

vAuth = require('../config/verifyAuthentication') , kEncryptor = require('../config/kEncryptor') , addRoute = require('./helpers/add') , updateRoute = require('./helpers/update') , 

removeRoute = require('./helpers/delete') , cUser = require('../config/checkUser') , yadminRoute = require('./superadmin') , entryPublisher = require('../config/entryPublisher') , 

createError = require('http-errors') , config = require('../config/config') , commentAddRoute = require('./helpers/comment_add') , commentUpdateRoute = require('./helpers/comment_update') ,  

commentDeleteRoute = require('./helpers/comment_delete') ,  commentRoute = require('./helpers/comment') , replyRoute = require('./helpers/reply') , replyAddRoute = require('./helpers/reply_add') ,

replyUpdateRoute = require('./helpers/reply_update') , replyDeleteRoute = require('./helpers/reply_delete') , voteAddRoute = require('./helpers/vote_add') , voteRoute = require('./helpers/vote') ,

sanitizer = require('../models/sanitizers/sanitizer');

module.exports = (app) => {

	app.use('/api' 									,												authenticationRoute);

	app.use('/api'									,												indexRoute);
	app.use('/api'									,												entryRoute);
	app.use('/api'									,												commentRoute);
	app.use('/api'									,												replyRoute);
	app.use('/api'									,												voteRoute);
	app.use('/api'									,												alphabetRoute);
	app.use('/api'									,												artRoute);
	app.use('/api'									,												babyRoute);
	app.use('/api'									,												bookRoute);
	app.use('/api'									,												centuryRoute);	
	app.use('/api'									,												continentRoute);	
	app.use('/api'									,												countryRoute);
	app.use('/api'									,												dressRoute);
	app.use('/api'									,												eyonRoute);
	app.use('/api'									,												festivalRoute);
	app.use('/api'									,												folktaleRoute);
	app.use('/api'									,												foodRoute);
	app.use('/api'									,												genderRoute);
	app.use('/api'									,												genreRoute);
	app.use('/api'									,												historyRoute);
	app.use('/api'									,												individualRoute);
	app.use('/api'									,												lawRoute);
	app.use('/api'									,												legendRoute);
	app.use('/api'									,												lifeRoute);
	app.use('/api'									,												mythologyRoute);
	app.use('/api' 									, 											nameRoute);
	app.use('/api'									,												photoRoute);
	app.use('/api'									,												proverbRoute);
	app.use('/api'									,												religionRoute);
	app.use('/api'									,												regionRoute);
	app.use('/api'									,												soundRoute);
	app.use('/api'									,												specieRoute);
	app.use('/api'									,												videoRoute);
	app.use('/api'									,												warRoute);


	
	app.use('/api' 									,												kEncryptor.decryptor , 	vAuth.auth);

	app.use('/api'									,												userRoute);
	app.use('/api'									,												yadminRoute);

	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			,	*/ entryPublisher.entryPublisher , addRoute);
	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			,	*/ entryPublisher.entryPublisher , 							commentAddRoute);
	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			,	*/ entryPublisher.entryPublisher , 							replyAddRoute);
	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			,			*/					entryPublisher.entryPublisher ,	voteAddRoute);
	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			, 	*/						updateRoute);
	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			, 	*/						commentUpdateRoute);
	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			, 	*/						replyUpdateRoute);
	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			, 	*/						commentDeleteRoute);
	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			, 	*/						replyDeleteRoute);
	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			,			*/					removeRoute);

	app.use('/api'									,												/*cUser.permit('user' , 'admin' , 'superAdmin')			,			*/					uploadRoute);


	// app.use('/api' , (req , res , next) => {
	// 																					res.header('Access-Control-Allow-Origin' , 'http://localhost:3000');
	// 																																														next();
	// });

	app.use('/api' , (req , res , next) => {

				next(createError(404));
	});


	app.use('/api' , (err , req , res , next) => {

		console.log(err);

			config.response(res , 404 , {'message' : 'An error has occured. The API url doesn\'t exist'});
	});

}