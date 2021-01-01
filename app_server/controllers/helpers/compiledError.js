module.exports = {

	'formAdd' : (err , errors) => {	var listErrors = err.response.data;

			for (var error in listErrors) {

												errors.push(listErrors[error]);

										}
						}

}