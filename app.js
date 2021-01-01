require('dotenv').load();

var createError = require('http-errors') , express = require('express') , path = require('path') , cookieParser = require('cookie-parser') , logger = require('morgan') , flash = require('express-flash') ,

favicon = require('serve-favicon') , passport = require('passport') , cors = require('cors') , routes = require('./app_server/routes/route') , apiRoutes = require('./app_api/routes/route') , app = express() ,

compression = require('compression') , helmet = require('helmet') , config = require('./app_server/config/config') ,  pConfig = require('./app_server/config/photo') , session = require('express-session') ,

csrf = require('csrf') , mime = require('mime-types');

require('./app_api/config/mongodb');

require('./app_api/config/passport');

app.set('views', path.join(__dirname, 'app_server' ,  'views'));
																																	app.set('view engine', 'pug');
																																																	app.set('x-powered-by' , false);
																																																																		app.use(compression());
app.use(session({	'saveUninitialized' : true ,
																							'resave' : true ,
																																'secret' : 'config.sidSecret'	}));
																																																		app.use(flash());
																																																											app.use(logger('dev'));
																																																																							app.use(express.json());
																																																																																				app.use(cookieParser());
																																																																																																	app.use(cors());
app.use(helmet.noCache({'noEtag' : true})); 
																						app.use(helmet.noSniff());
																																				app.use(helmet.frameguard());
																																																			app.use(helmet.xssFilter()); 
app.use(express.urlencoded({ 'extended' : true }));																			
																											app.use(passport.initialize());
																																												app.use(passport.session());
																																																											app.use(favicon(path.join(__dirname, 'public', 'favicon' , 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public') , {'maxAge' : '86000' ,


	'lastModified' : true ,

	setHeaders: function (res, path) {
    if (mime.lookup(path) === 'text/html') {
      res.setHeader('Cache-Control', 'public, max-age=864000')
    }
  }

}));

app.use((req, res, next) => {

													   res.header('Expires' , new Date(Date.now() + 2592000000).toUTCString());

															res.setHeader('Cache-Control' , 'public,max-age=50000');
														
															res.header('X-XSS-Protection' , '1; mode=block');
															
															res.header('X-Frame-Options' , 'deny');
															
															res.header('X-Content-Type-Options', 'nosniff');
																																								next();		});

app.use('/api', (req, res, next) => {
																			res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
																																																					res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept');
next();
});

app.use((req , res , next) => {	res.locals.moment = require('moment-timezone');

																res.locals.currentYear = (new Date()).getFullYear();

																if (req.cookies.sid !== undefined && req.cookies.sid2 !== undefined && req.cookies.s_id !== undefined) {

																		res.locals.isLoggedIn = true;

																		res.locals.uIdentity = req.cookies.s_id;		}

																		res.locals.crsf = csrf();

																		if (res.locals.isLoggedIn && req.cookies.s_id) {

																				function findUser(voters) {

																						return voters.find((voter) => res.locals.uIdentity == voter);		}

																						res.locals.findUser = findUser;			}

																		return next();		});
																																																																															apiRoutes(app);
																																																																																							routes(app);

app.use((req, res, next) => {					next(createError(404));										});


app.use((err, req, res, next) => { 

	console.log(err);

	res.locals.message = err.message;
																		res.locals.error = req.app.get('env') === 'development' ? err : {};
																																																				res.status(err.status || 500);

																																																				res.locals.breadcrumb.splice(2);
																																																				
																																																																				res.render('error' , {'title' : 'Error'});		});

module.exports = app;