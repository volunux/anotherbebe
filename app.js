var createError = require('http-errors') , express = require('express'), path = require('path'), cookieParser = require('cookie-parser'), logger = require('morgan'), routes = require('./app_server/routes/route'),

app = express();

app.set('views', path.join(__dirname, 'app_server' ,  'views'));
																																	app.set('view engine', 'pug');
																																																	app.use(logger('dev'));
																																																													app.use(express.json());
																																																																										app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
													app.use(express.static(path.join(__dirname, 'public')));
																																										routes(app);


app.use((req, res, next) => {					next(createError(404));										});


app.use((err, req, res, next) => {  res.locals.message = err.message;
																																			res.locals.error = req.app.get('env') === 'development' ? err : {};
																																																																					res.status(err.status || 500);
																																																																																					res.render('error');		});

module.exports = app;
