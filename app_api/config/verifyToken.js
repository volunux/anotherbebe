const jwt = require('jsonwebtoken') , config = require('./config');

module.exports = {

'auth' : (req , res , next) => {

	const token = req.cookies.token;

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
																																																																					next();
																																						}
			});

	} ,

'fAuth' : (req , res , next) => {

	const token = req.cookies.token;

		if(!token) {
									return res.redirect('/signin')

		}

			jwt.verify(token , process.env.JWT_SECRET , (err , decoded) => {
																																				if (err) {
																																										return res.redirect('/signin');
																																				}
																																						else {
																																											const verified = decoded;
																																																									req.user = verified;
																																																																					next();
																																						}
			});

	}

};