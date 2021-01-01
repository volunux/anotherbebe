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