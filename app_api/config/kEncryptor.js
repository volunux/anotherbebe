var SimpleCrypto = require('simple-crypto-js').default , sCrypto = new SimpleCrypto('Yusuf~!@#080997578230$%^&9022035587*()Mufliha?09022035587@08099757823#') , token = '' , arrToken = '' , arrr = [] ,

myCookies = {} , hCookie = '' , pCookie = '' , sCookie = '' , hDecrypto = '' , pDecrypto = '' , sDecrypto = '' , hEncrypto = '' , pEncrypto = '' , sEncrypto = '' , aToken = '' , hToken = '' , pToken = '' ,

sToken = '' , uIdentity = '' , config = require('./config');


const expiresIn = 60 * 60 * 24 * 7 * 1000;

const options = {'maxAge' : expiresIn , 'httpOnly' : true };

module.exports = {

	'encryptor' : (req , res , token , uIdentity) => {	aToken = token.split('.') , hToken = aToken[0] , pToken = aToken[1] , sToken = aToken[2] , uIdentity = String(uIdentity);

																											hEncrypto = sCrypto.encrypt(hToken) , pEncrypto = sCrypto.encrypt(pToken) , sEncrypto = sCrypto.encrypt(sToken);

																						res.cookie('sid' , hEncrypto , options);
																						res.cookie('sid2' , pEncrypto , options);
																						res.cookie('sid3' , sEncrypto , options);
																						res.cookie('s_id' , uIdentity , options);

																						token = {
																											'sid' : hEncrypto,
																											'sid2' : pEncrypto,
																											'sid3' : sEncrypto,
																											's_id' : uIdentity
																						};
																									res.status(200).json(token);
	} ,

	'setCookie' : (res , token) => {	hCookie = token.sid , pCookie = token.sid2 , sCookie = token.sid3 , uIdentity = token.s_id;

																					res.cookie('sid' , hCookie , options);
																					res.cookie('sid2' , pCookie , options);
																					res.cookie('sid3' , sCookie , options);
																					res.cookie('s_id' , uIdentity , options);
	} ,

	'getAppCookie' : (req , res , next) => {

							if (req.cookies.sid) {

									req.cookies = req.cookies;

							} else {
												req.cookies = req.app.get('cookie');

							}
											return next();
	} ,

	'setAppCookie' : (req , res , next) => {

		if (req.cookies) {

		arrr.push(req.cookies);

		req.app.set('cookie' , arrr[0]);

					return next();	
		}
							next();
	} ,

	'decryptor' : (req , res , next) => {

//I will come back to access the booleans

		myCookies = req.cookies.sid && req.cookies.sid2 ? req.cookies : undefined || req.headers.token == '0' || req.headers.token == undefined ? undefined : JSON.parse(req.headers.token);
			
					if (myCookies == null || myCookies == undefined || Boolean(myCookies) == false) {
																																														return config.response(res , 401 , {'message' : 'Access Denied'}); }
				
							hCookie = myCookies.sid , pCookie = myCookies.sid2 , sCookie = myCookies.sid3; 

							hDecrypto = sCrypto.decrypt(hCookie) , pDecrypto = sCrypto.decrypt(pCookie) , sDecrypto = sCrypto.decrypt(sCookie); 

							arrToken = [hDecrypto , pDecrypto , sDecrypto];

							req.cookies.token = arrToken.join('.');

								return next();			
}

}