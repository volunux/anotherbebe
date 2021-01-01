 userData = req.body;

		if (!req.body.full_name && !req.body.email_address && !req.body.password && !req.body.username) {
																																																			config.response(res , 400 , {'status' : 'All fields are required.'});
																																																																																						return false;		}
				User.findOne({ 'email_address' : userData.email_address } , (err, email) => {
																																												if (err) { 
																																																		config.compiledError(res , 400 , err);	 
																																																																						return false;	}
																																												if (user) {
																																																		config.response(res , 409 , 'E-mail Address already exist in the record.');
																																																																																								return false;		} });
									User.findOne({ 'username' : req.body.username } , (err, user) => {
																																												if (err) {
																																																		config.compiledError(res , 400 , err);	 
																																																																						return false;	}
																																												if (user) {
																																																		config.response(res , 409 , 'Username already exist in the record.');
																																																																																					return false;			} });
			const user = new User(req.body);
			
			user.setPassword(req.body.password);

			user.save((err , user ) => {
																		if (err) {
																								config.compiledError(res , 400 , err);
																																												return false;		} 
																			else {
																							token = user.generateJwt();
	
																							kEncryptor.encryptor(req , res , token);	}		});