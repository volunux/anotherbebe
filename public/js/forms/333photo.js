var $objectInfo = {

		'key' : '' , 

		'photo' : {

				'url' : '' ,

				'size' : false ,

				'type' : false } 

} , $rmethod = $('#rmethod').val() , $inputFile = $('#photo') , $formFillGuide = $('.showFormGuide') , objectKey = '' ,

$fileSize = 500 * 1024 , $uploadBtn = $('#addUpload') , $removeBtn = $('#delUpload') , ajaxCall = '' ,

$formProcess = $('#formSubmit') , $links = $('#link').val() , $link = $('#link').val() , $title = '' , $data = {};

$formFillGuide.click(() => {

	$( "ul.guidelines" ).toggle();

});

	function $formPost() {

			if ($rmethod == 'POST') {

			$setButton('#formSubmit' , true , 'disabled' , 'btn-primary');
			$setButton('#addUpload' , true , 'disabled' , 'btn-primary');
		}

	}

	function $setButton(ref , attr , add = undefined , remove = undefined) {

			var $el = $(ref);
			$el.prop('disabled' , attr);
			$el.addClass(add);
			$el.removeClass(remove);
	}

	function $showButton(ref , display) {

			var el = $(ref);
			el.css('display' , display);
	}

	function $setElement(ref , attr) {

			var $el = $(ref);
			$el.prop('disabled' , attr);
	}

function $clearText(ref , ref1 = undefined , ref2 = undefined , ref3 = undefined) {


		var $el = $(ref) , $el1 = $(ref1) , $el2 = $(ref2) , $el3 = $(ref3);


		$el.empty();
		$el1.empty();
		$el2.empty();
		$el3.empty();
}

function $setText(ref , text , display , ref2 , ref3) {

			var $el = $(ref);
			$el.css('display' , display);
			$el.html(text);
}

function $checkImageSize($myFile) {

	if ($myFile) {
									if ($myFile.size > $fileSize) {
											
											$clearText('#uploadMessage' , '#uploadError' , '#upload-progress');
											$setButton('#addUpload' , true , 'disabled' , 'btn-primary');
											$setText('#uploadError' , 'File is too large and will not be uploaded.' , 'block');
											$objectInfo.photo.size = true

																					return false;		}
								
								$clearText('#uploadMessage' , '#uploadError' , '#upload-progress');
								$setButton('#addUpload' , false , 'btn-primary' , 'disabled');
								$objectInfo.photo.size = false
			} else {
								$clearText('#uploadMessage' , '#uploadError' , '#upload-progress');
								$setButton('#addUpload' , true , 'disabled' , 'btn-primary');
				}
	 }

function $checkImageType(file) {

	if (file) {

			if (file.type.indexOf('image') == -1) {

		$clearText('#uploadMessage' , '#upload-progress');
		$setButton('#addUpload' , true , 'disabled' , 'btn-primary');
		$setText('#uploadError1' , 'Only Photo or Image is allowed to be uploaded in this field.' , 'block');
		$objectInfo.photo.type = true;

								return false;
				}

					if (!$objectInfo.photo.size) {

							$clearText('#uploadMessage' , '#uploadError' , '#uploadError1' , '#upload-progress');
							$setButton('#addUpload' , false , 'btn-primary' , 'disabled');
					}
						else {
												$clearText('#uploadMessage' , '#uploadError1' , '#upload-progress');
												$setButton('#addUpload' , true , 'disabled' , 'btn-primary');					
									}	}	
			else {
							$clearText('#uploadMessage' , '#uploadError' , '#uploadError1' , '#upload-progress');
			}
	}

function $clearEvent($el) {

		$el.stopPropagation();
		$el.preventDefault();
}

$(function() { 

	$formPost();

	$inputFile.on('change' , function(e) {

		var $el = e.target.files[0];

			$checkImageSize($el);

			$checkImageType($el);

	});

	$uploadBtn.click(function(e) {

			$clearEvent(e);
			$clearText('#uploadMessage' , '#uploadError' , '#uploadError1' , '#upload-progress');

				var data = {

							'photo' : $('#photo')[0].files[0] ,
				}

		if (!data.photo && $rmethod == 'POST') {
												
			$setText('#uploadError' , 'Photo should be provided and cannot be empty.' , 'block');
	
					return false;
		}

			$checkImageSize(data.photo);

			$checkImageType(data.photo);

$.get(`/uploader/signature/${data.photo.name}/` , {

			'filename' : data.photo.name ,

			'contentType' : data.photo.type

})
	.done((signedUrl) => { 	$objectInfo.key = signedUrl.data.fields.key;

		$setElement('#photo' , true);
		$setButton('#addUpload' , true , 'disabled' , 'btn-primary');
		$showButton('#calUpload' , 'inline');
		$setText('#uploadMessage' , 'Photo is uploading. Please be patient and wait. % uploaded : ' , 'inline' );
		$uploadImage(signedUrl , data)     

											})
	.fail((err) => {
										
				$clearText('#uploadMessage' , '#uploadError' , '#uploadError1' , '#upload-progress');
				$setText('#uploadError' , 'Error has occured. Please try again.' , 'block');
	
									})		
						});
			

 $removeBtn.click((e) => {

			$clearEvent(e);

			$clearText('#uploadMessage' , '#uploadError' , '#uploadError1' , '#upload-progress');
			$clearText('#percent' , '#uploadText');
			$setText('#uploadMessage' , 'Photo is getting deleted. Please be patient and wait.' , 'inline');
			$setButton('#delUpload' , true , 'disabled' , 'btn-danger');

			$removeImage($objectInfo.key);
 });


});

function $uploadImage(signedUrl , data) {

	$objectInfo.photo.url = `${signedUrl.data.url}/${signedUrl.data.fields.key}`;

	var $myFormData = new FormData();

	for (var key in signedUrl.data.fields) {

			$myFormData.append(key , signedUrl.data.fields[key]);
	}

	$myFormData.append('file' , data.photo);

ajaxCall =	$.ajax({
										'type' : 'POST' ,

										'data' : $myFormData ,

										'url' : signedUrl.data.url ,

										'contentType' : false ,

										'processData' : false ,

										'xhr' : function()  {
												
												var xhr = new window.XMLHttpRequest();

												xhr.upload.onprogress = function(evt) {
												
													if (evt.lengthComputable) {
														
														var percentComplete = evt.loaded / evt.total;
														
																percentComplete = parseInt(percentComplete * 100);
														
																var progress = Math.round(percentComplete);

												$setText('#percent' , `${progress}`  , 'inline-block');

														}
												};

												xhr.upload.onload = function(evt) {

												$showButton('#addUpload' , 'none');
												$setButton('#delUpload' , false , 'btn-danger' , 'disabled');
												$showButton('#delUpload' , 'inline');
												$clearText('#uploadMessage' , '#percent' , '#uploadText' , '#upload-progress');
												$setText('#uploadText' , 'Photo successfully uploaded.' , 'block');
												$showButton('#calUpload' , 'none');
												$setElement('#calUpload' , false);

												if ($rmethod == 'POST') {

														$setButton('#formSubmit' , false , 'btn-primary' , 'disabled');
												}

											};

												xhr.upload.onerror = function(evt) {

														$setElement('#photo' , false);
														$setButton('#addUpload' , false , 'btn-primary' , 'disabled');
														$showButton('#calUpload' , 'none');
														$clearText('#uploadMessage' , '#percent' , '#uploadText' , '#upload-progress');
														$setText('#uploadError' , 'An error has occured. Please try again.' , 'block');
											};

												xhr.upload.onabort = function(evt) {

														$setElement('#photo' , false);
														$setButton('#addUpload' , false , 'btn-primary' , 'disabled');
														$clearText('#uploadMessage' , '#percent' , '#uploadText' , '#upload-progress');
														$setText('#uploadMessage' , 'Photo upload cancelled. You can now upload another photo.' , 'inline');

											};

												xhr.upload.ontimeout = function(evt) {

														$setElement('#photo' , false);
														$setButton('#addUpload' , false , 'btn-primary' , 'disabled');
														$showButton('#calUpload' , 'none');
														$clearText('#uploadMessage' , '#percent' , '#uploadText' , '#upload-progress');
														$setText('#uploadError' , 'File upload has has timed-out. Please try again.' , 'block');
											};
												return xhr;

											} ,

											'success' : (message , text , status) => {

												if (status.readyState == 4) {

												$.post('/api/upload/' , {
																									'Key' : $objectInfo.key
												} , (data) => {

															console.log(data);		});		}

											}
				})    };

var cancelBtn = $('#calUpload');

cancelBtn.on('click' , function(e) {

			$clearEvent(e);

			$setElement('#calUpload' , true);

			ajaxCall.abort();

			$showButton('#calUpload' , 'none');
			$setElement('#calUpload' , false);
});


function $removeImage(key) {

						$.ajax({
										'type' : 'DELETE' ,

										'url' : `/api/photo/o/${key}` ,

										'timeout' : 12000 ,

										'success' : (data , status , response) => {

												if ($rmethod == 'POST') {

														$setButton('#formSubmit' , true , 'disabled' , 'btn-primary');
												}

		$setElement('#photo' , false);
		$setButton('#addUpload' , false , 'btn-primary' , 'disabled');

		$showButton('#delUpload' , 'none');
		$showButton('#addUpload' , 'inline');
		$setText('#uploadMessage' , 'Photo successfully deleted. You can now upload another photo.' , 'inline');

										} ,

										'error' : (jxHR , status) => {

											if (status == 'timeout') {
												
													$clearText('#uploadMessage' , '#uploadText' , '#uploadError' , '#upload-progress');
													$setButton('#delUpload' , false , 'btn-danger' , 'disabled');
													$setText('#uploadError' , 'An error has occured while removing image. Please try again.' , 'block');

													return false;		}
									
											$clearText('#uploadMessage' , '#uploadError' , '#upload-progress');
											$setButton('#delUpload' , false , 'btn-danger' , 'disabled');
											$setText('#uploadError' , 'An error has occured. Please try again.' , 'block');

										}
					})
		}


/** Form Handling Section below **/ 


	$formProcess.click(function(e) {

				$clearEvent(e);

			$('ul.ajax').empty();

				var $myData = {

							'title' : $('#title').val() ,

							'date' : $('#date').val().toString() ,

							'century' : $('#century').val().toString() ,

							'continent' : $('#continent').val().toString() ,

							'country' : $('#country').val().toString() ,

							'region' : $('#region').val().toString() ,

							'genre' : $('#genre').val() ,

							'ethnic_group' : $('#ethnic_group').val().toString() ,

							'about' : $('#about').val() ,

							'photo' : $('#photo')[0].files[0],

							'artist' : $('#artist').val().toString() ,

							'findspot' : $('#findspot').val().toString() ,

							'medium' : $('#medium').val().toString() ,

							'credit' : $('#credit').val().toString() ,

							'dimension' : $('#dimension').val().toString() ,

				};

				if ($myData.photo) {

									var $photo_detail = {'location' : $objectInfo.photo.url , 'mimetype' : $myData.photo.type , 'size' : $myData.photo.size , 'encoding' : $myData.photo.type};

									$myData.photo_detail = $photo_detail;

									delete $myData.photo
				}

				if ($rmethod == 'PUT') {

				function formValidity() { $title = Boolean(

						$myData.title && $myData.date && 
						$myData.century && $myData.continent && 
						$myData.country && $myData.region && 
						$myData.genre && $myData.ethnic_group && 
						$myData.about && 
						$myData.title.length < 150 && $myData.date.length < 15 &&
						$myData.century.length < 30 && $myData.genre.length < 30 &&
						$myData.country.length < 30 && $myData.continent.length < 30 &&
						$myData.region.length < 30 && $myData.ethnic_group.length < 30 &&
						$myData.about.length < 2000 && $myData.about.length > 10 &&
						$myData.artist.length < 30 && $myData.findspot.length < 30 &&
						$myData.medium.length < 30 && $myData.credit.length < 30 &&
						$myData.dimension.length < 200 && $myData.date.length > 4		)  };
					
				}

				if ($rmethod == 'POST') {

				function formValidity() { $title = Boolean(

					$myData.title && $myData.date && 
					$myData.century && $myData.continent && 
					$myData.country && $myData.region && 
					$myData.genre && $myData.ethnic_group &&  
					$myData.about && $myData.photo &&
					$myData.title.length < 150 && $myData.date.length < 15 &&
					$myData.century.length < 30 && $myData.genre.length < 30 &&
					$myData.country.length < 30 && $myData.continent.length < 30 &&
					$myData.region.length < 30 && $myData.ethnic_group.length < 30 &&
					$myData.about.length < 2000 && $myData.about.length > 10 &&
					$myData.artist.length < 30 && $myData.findspot.length < 30 &&
					$myData.medium.length < 30 && $myData.credit.length < 30 &&
					$myData.dimension.length < 200 && $myData.date.length > 4		)  };
					
				}
							formValidity();
				
				if(!$title) {
											$('ul.ajax').css('display' , 'block').append('<li> Error processing the form. Please read the form guidelines and fill in the form as required.</li>');

													$clearEvent(e);
																									return false;   }

				$setButton('#formSubmit' , true , 'disabled' , 'btn-primary');
				$setText('#uploadMessage' , 'Form is processing. Please be patient and wait.' , 'inline');
																																													
				delete $myData.photo;

				if ($rmethod == 'PUT') {

						$updateUrl = $('#update').val().toString();

						$links = `${$links}/${$updateUrl}`;

				}

					$.ajax({
										'type' : $rmethod ,

										'data' : JSON.stringify($myData) ,

										'url' : `/api/${$links}` ,

										'contentType' : 'application/json' ,

										'success' : (data , status) => {

											setTimeout(() =>  window.location = `/user/entry/${$link}` , 3000)

												// window.location = `user/entry/${links}`;

										} ,

										'error' : (res , xhr) => {

													var errors = [];

													$.each(JSON.parse(res.responseText) , function(i , indi) {

																				errors.push(indi['message']);
													});

													$.each(errors , function(i , v) {

														$('ul.ajax').css('display' , 'block').append('<li>' + v + '</li>');
																
															});

													$clearText('#uploadMessage' , '#uploadText' , '#uploadError' , '#upload-progress');
													$setButton('#formSubmit' , false , 'btn-primary' , 'disabled');
													$setText('#uploadMessage' , 'Error processing form. Please read the guidelines above.' , 'inline');

										}
					})

	}); 

