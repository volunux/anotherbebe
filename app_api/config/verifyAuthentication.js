const jwt = require('jsonwebtoken') , config = require('./config') , kEncryptor = require('./kEncryptor') , axios = require('axios');

module.exports = {

'auth' : (req , res , next) => {	const token = req.cookies.token;

		if(!token) {
									return config.response(res , 401 , 'Access Denied');

		}

			jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
																																				if (err) {
																																										return config.response(res , 401 , 'Invalid Token')
																																				}
																																						else {
																																											const verified = decoded;
																																																								req.user = verified;
																																																																				next();		}
			});

	} ,

'fAuth' : (req , res , next) => {

	const token = req.cookies.sid3 || req.cookies.sid2;

		if(!token) {
									return res.redirect('/signin')

		}
				next();

	} ,

	'checkCookies' : (req , res , next) => { const myCookie = req.cookies;

			if (!(myCookie.sid || myCookie.sid2 || myCookie.sid3)) {

					return res.redirect('/signin');
			}

			if (myCookie.sid && myCookie.sid2 && myCookie.sid3) {

						axios.defaults.headers.common = { 

						'token' : JSON.stringify(req.cookies)			}

						axios.defaults.withCredentials = true;
																										next();

			}


	} 

};