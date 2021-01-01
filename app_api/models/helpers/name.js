var mongoose = require('mongoose') , Alphabet = mongoose.model('Alphabet'); 

module.exports = (schemaName) => {

	schemaName.path('alphabet').validate({

			'validator' : function() {

					Alphabet.findById()
															.exec((err , alphabet) => {	

															})
			}

	})

}

nameSchema.path('baby').validate({

		'validator' : function() { throw new Error('Oops')}
});