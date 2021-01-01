var $formProcess = $('#formSubmit') , $links = $('#link').val() , $title = '' , data = {} , rmethod = $('#rmethod').val() , objectKeys = [] , $body = '';

$formProcess.click(function(e) {

			$('ul.ajax').empty();

			$clearEvent(e);

				data = {

							'title' : $('#title').val() ,

							'ethnic_group' : $('#ethnic_group').val() ,

							'country' : $('#country').val(),

							'main_body' : $('#editor').val() ,
				};

							formValidity();
				
											if(!$body) {
																		return $('ul.ajax').css('display' , 'block').append('<li> Error processing the form. Please read the form guidelines and fill in the fields with valid values.</li>');		}
							checkFormFields();

					$.ajax({
										'type' : `${rmethod}` ,

										'data' : data ,

										'url' : `/api/${$links}` ,

										'dataType'  : 'json' , 

										'success' : (data , status) => {

												window.location = `/user/entry/${$links}`;

										} ,

										'error' : (res , xhr) => {

													var errors = [];

													$.each(JSON.parse(res.responseText) , function(i , indi) {

																				errors.push(indi['message']);
													});

													$.each(errors , function(i , v) {

														$('ul.ajax').css('display' , 'block').append('<li>' + v + '</li>');
																
															})
										}
					})
	}); 



var formFillGuide = $('.showFormGuide');

formFillGuide.click(function() {

	$( "ul.guidelines" ).toggle();

});

function $clearEvent($el) {

		$el.stopPropagation();
		$el.preventDefault();
}

function formValidity() { $body = Boolean(data.title || data.ethnic_group || data.country || data.main_body)  };

function checkFormFields() {

					if (!($('#title').val())) {								return $('ul.ajax').css('display' , 'block').append('<li> Title should be provided and cannot be empty.</li>');												}

				if ($('#title').val().length > 150) {			return $('ul.ajax').css('display' , 'block').append('<li> Title cannot be greater than 150 characters in length.</li>');							}

				if (!($('#ethnic_group').val())) {				return $('ul.ajax').css('display' , 'block').append('<li> Ethnic Group should be provided and cannot be empty.</li>');								}

				if (!($('#country').val())) {							return $('ul.ajax').css('display' , 'block').append('<li> Country should be provided and cannot be empty.</li>');											}
				
				if (!($('#editor').val())) {							return $('ul.ajax').css('display' , 'block').append('<li> Main body should be provided and cannot be empty.</li>');										}

				if ($('#editor').val().length > 6000 ) {	return $('ul.ajax').css('display' , 'block').append('<li> Main body cannot be greater than 6000 characters in length.</li>');					}
}