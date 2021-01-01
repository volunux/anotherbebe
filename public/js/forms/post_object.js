var objectKey = {'key' : '' , 'photo' : {'url' : ''}} , rmethod = $('#rmethod').val();

$(function() {  var uploadBut = $('#addUpload') , removeBut = $('#delUpload') , i = 1;

	if (rmethod == 'POST') {

			setButton('#formSubmit' , true , 'disabled' , 'btn-primary');
	}


 fileMaxSize = 20 * 1024 * 1024;

 removeBut.click((e) => {

 			clearEvent(e);

			clearText('#uploadText' , '#uploadError' , '#upload-progress');
			setText('#uploadText' , 'Image is getting deleted. Please be patient and wait.' , 'block');
			setButton('#delUpload' , true , 'disabled' , 'btn-danger');

			removeImage(objectKey.key);
 });

	uploadBut.click((e) => {

			clearEvent(e);
			clearText('#uploadText' , '#uploadError' , '#upload-progress');

				var data = {

							'photo' : $('#photo')[0].files[0] ,
				}

				if (!data.photo) {
														setText('#uploadError' , 'Image must be provided.' , 'block');
							return false;
				}


$.get(`/uploader/signature/${data.photo.name}/` , {

			'filename' : data.photo.name ,

			'contentType' : data.photo.type

})

	.done((signedUrl) => { 	objectKey.key = signedUrl.data.fields.key;

													setText('#uploadText' , 'Image is uploading. Please be patient and wait.' , 'block' );									
													setButton('#addUpload' , true , 'disabled' , 'btn-primary');
													uploadImage(signedUrl , data)     

											})
	.fail((err) => {
													clearText('#uploadText' , '#uploadError' , '#upload-progress');
													setText('#uploadError' , 'Error has occured. Please try again.' , 'block');
											})
							});
			})



function uploadImage(signedUrl , data) {

	objectKey.photo.url = `${signedUrl.data.url}/${signedUrl.data.fields.key}`;

	var myFormData = new FormData();

	for (var key in signedUrl.data.fields) {

			myFormData.append(key , signedUrl.data.fields[key]);
	}

	myFormData.append('file' , data.photo);


						$.ajax({
										'type' : 'POST' ,

										'data' : myFormData ,

										'url' : signedUrl.data.url ,

										'contentType' : false ,

										'processData' : false ,

										'success' : (data , status , response) => {

												if (rmethod == 'POST') {

														setButton('#formSubmit' , false , 'btn-primary' , 'disabled');
												}

												showButton('#delUpload' , 'inline');
												showButton('#addUpload' , 'none');											
												setText('#uploadText' , 'Image successfully uploaded.' , 'block');


										} ,

										'error' : (res , xhr) => {

												clearText('#uploadText' , '#uploadError' , '#upload-progress');
												setButton('#addUpload' , false , 'btn-primary' , 'disabled');
												setText('#uploadError' , 'An error has occured. Please try the upload again.' , 'block');
									}
				})    }

	function setButton(ref , attr , add , remove) {

			var el = $(ref);
			el.attr('disabled' , attr);
			el.addClass(add);
			el.removeClass(remove);
	}

	function showButton(ref , display) {

			var el = $(ref);
			el.css('display' , display);
	}

	function removeImage(key) {

						$.ajax({
										'type' : 'DELETE' ,

										'url' : `api/video/o/${key}` ,

										'success' : (data , status , response) => {

												if (rmethod == 'POST') {

														setButton('#formSubmit' , true , 'disabled' , 'btn-primary');
												}

												setButton('#addUpload' , true , 'btn-primary' , 'disabled');
												showButton('#delUpload' , 'none');
												showButton('#addUpload' , 'inline');
												setText('#uploadText' , 'Image successfully deleted. You can now upload another image.' , 'block');

										} ,

										'error' : (res , xhr) => {
									
											clearText('#uploadText' , '#uploadError' , '#upload-progress');
											setButton('#delUpload' , false , 'btn-danger' , 'disabled');
											setText('#uploadError' , 'An error has occured. Please try again.' , 'block');

										}
					})
		}

function setText(ref , text , display , ref2 , ref3) {

			var el = $(ref);
			el.css('display' , display);
			el.html(text);
}


function clearText(ref , ref1 = undefined , ref2 = undefined , ref3 = undefined) {

		var el = $(ref) , el1 = $(ref1) , el2 = $(ref2) , el3 = $(ref3);
		el.empty();
		el1.empty();
		el2.empty();
		el3.empty();
}

function clearEvent(ref) {

		ref.stopPropagation();
		ref.preventDefault();
}

var formProcess = $('#formSubmit') , links = $('#link').val() , $title = '' , data = {};

	formProcess.click(function(e) {

														e.stopPropagation();
														e.preventDefault();

			$('ul.ajax').empty();

				var data = {

							'title' : $('#title').val() ,

							'date' : $('#date').val().toString() ,

							'century' : $('#century').val().toString(),

							'continent' : $('#continent').val().toString(),

							'country' : $('#country').val().toString() ,

							'region' : $('#region').val().toString(),

							'genre' : $('#genre').val(),

							'ethnic_group' : $('#ethnic_group').val().toString() ,

							'about' : $('#about').val(),

							'photo' : $('#photo')[0].files[0],

				};

				if (data.photo) {
													var photo_detail = {location : objectKey.photo.url , mimetype : data.photo.type , size : data.photo.size};

													data.photo_detail = photo_detail
				}

				if (rmethod == 'PUT') {

				function formValidity() { $title = Boolean(data.title && data.date && data.century && data.continent && data.country && data.region && data.genre && data.ethnic_group && data.about)  };
					
				}

				if (rmethod == 'POST') {

				function formValidity() { $title = Boolean(data.title && data.date && data.century && data.continent && data.country && data.region && data.genre && data.ethnic_group &&  data.about && data.photo)  };
					
				}
							formValidity();
				
				if(!$title) {
											$('ul.ajax').css('display' , 'block').append('<li> Error processing the form. Please read the form guidelines and fill in the form as required.</li>');

														e.stopPropagation();
														e.preventDefault();
																									return false;   }

				setButton('#formSubmit' , true , 'disabled' , 'btn-primary');
				setText('#uploadText' , 'Form is processing. Please be patient.' , 'block');
																																											delete data.photo;
          $.ajax({
                    'type' : rmethod ,

                    'data' : JSON.stringify(data) ,

                    'url' : `/api/${links}` ,

                    'contentType' : 'application/json' ,

                    'success' : (data , status) => {

                    	setTimeout(() =>  window.location = `/user/entry/${links}` , 10000)

                        // window.location = `user/entry/${links}`;

                    } ,

                    'error' : (res , xhr) => {

                          var errors = [];

                          $.each(JSON.parse(res.responseText) , function(i , indi) {

                                        errors.push(indi['message']);
                          });

                          $.each(errors , function(i , v) {

                            $('ul.ajax').css('display' , 'block').append('<li>' + v + '</li>');
                                
                              })

                          if (rmethod == 'PUT') {
																									setButton('#formSubmit' , false , 'btn-primary' , 'disabled');
																									clearText('#uploadText' , '#uploadError' , '#upload-progress');
                          }

                    }
          })

	}); 

var formFillGuide = $('.showFormGuide');

formFillGuide.click(function() {

	$( "ul.guidelines" ).toggle();

});