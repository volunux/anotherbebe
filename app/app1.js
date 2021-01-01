require('dotenv').load();

var createError = require('http-errors') , express = require('express') , path = require('path') , cookieParser = require('cookie-parser') , logger = require('morgan') , flash = require('express-flash') ,

session = require('express-session') , passport = require('passport') , cors = require('cors');

app = express() , config = require('./app_server/config/config') ,  pConfig = require('./app_server/config/photo') , routes = require('./app_server/routes/route') , apiRoutes = require('./app_api/routes/route');

require('./app_api/config/mongodb');

require('./app_api/config/passport');

app.set('views', path.join(__dirname, 'app_server' ,  'views'));
																																	app.set('view engine', 'pug');
																																																	app.use(logger('dev'));
																																																													app.use(express.json());
																																																																										app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
													app.use(cors());
																						app.use(express.static(path.join(__dirname, 'public')));
																																																			app.use(passport.initialize());

																								routes(app);
																															apiRoutes(app);

app.use((req, res, next) => {					next(createError(404));										});


app.use((err, req, res, next) => {  

	console.log(err);

	res.locals.message = err.message;
																		res.locals.error = req.app.get('env') === 'development' ? err : {};
																																																				res.status(err.status || 500);
																																																																				res.render('error');		});

module.exports = app;