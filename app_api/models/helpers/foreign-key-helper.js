module.exports = {

		'primaryKey' : (model , id) => {

	return new Promise((resolve , reject) => {

		model.findOne({'_id': id })

			.select('_id')

			.exec((err , result) => {

					if (result) {			return resolve(true);		}

								else {			return resolve(false);	} 		});		});
	} ,

		'secondaryKey' : (model , slug) => {

	return new Promise((resolve , reject) => {

		model.findOne({'slug' : slug })

			.select('_id')

			.exec((err , result) => {

					if (result) {			return resolve(true);		}

								else {			return resolve(false);	} 		});		});
	} ,

		'secondaryKey1' : (model , slug) => {

	return new Promise((resolve , reject) => {

		model.findOne({'slug': slug })

			.select('_id')

			.exec((err , result) => {
			
					if (result) {			return resolve(true);		}

								else {			return resolve(false);	} 		});		});
	}
}