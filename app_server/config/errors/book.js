module.exports = {

	'error' : {
							'location' : 'body' ,
																		'param' : 'photo' ,
																												'value' : '' ,
																																				'msg' : 'Only Book files allowed to be uploaded.'		} ,

	'error2' : {
								'location' : 'body' ,
																			'param' : 'photo' ,
																													'value' : '' ,
																																					'msg' : 'Cover Image should be provided and cannot be empty.'		} ,

	'error3' : {
								'location' : 'body' ,
																			'param' : 'cover_image' ,
																																'value' : '' ,
																																								'msg' : 'Cover Image invalid and only image is allowed'		} ,

	'error4' : {
								'location' : 'body' ,
																			'param' : 'photo' ,
																													'value' : '' ,
																																					'msg' : 'At least 1 photo must be provided'		} ,

	'error5' : {
								'location' : 'body' ,
																			'param' : 'cover_image' ,
																																'value' : '' ,
																																								'msg' : 'Book Cover Image should be provided'		}	,

	'error6' : {
								'location' : 'body' ,
																			'param' : 'photo' ,
																													'value' : '' ,
																																					'msg' : 'Book Cover Image have to be re-uploaded due to invalid data in other field parameters.'
			} ,

	'error7' : {
								'location' : 'body' ,
																			'param' : 'photo' ,
																													'value' : '' ,
																																					'msg' : 'Image or Photo cannot be greater than 500kb or 500 kilobytes in size.'
			}

}