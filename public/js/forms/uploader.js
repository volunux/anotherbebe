var objectKey = {'key' : ''};

$(function() {  var uploadBut = $('#addUpload') , removeBut = $('#delUpload') , i = 1;

	setButton('#formSubmit' , true , 'disabled' , 'btn-primary');

 fileMaxSize = 20 * 1024 * 1024;

 removeBut.click((e) => {

 			clearEvent(e);

			clearText('#uploadText' , '#uploadError' , '#upload-progress');
			setText('#uploadText' , 'Photo is getting deleted. Please be patient and wait.' , 'block');
			setButton('#delUpload' , true , 'disabled' , 'btn-danger');

			removePhoto(objectKey.key);
 });

	uploadBut.click((e) => {

			clearEvent(e);
			clearText('#uploadText' , '#uploadError' , '#upload-progress');

				var data = {

							'photo' : $('#photo')[0].files[0] ,
				}

				if (!data.photo) {
														setText('#uploadError' , 'Photo should be provided and cannot be empty.' , 'block');
							return false;
				}

$.get(`/uploader/signature/${data.photo.name}/` , {

			'filename' : data.photo.name ,

			'contentType' : data.photo.type

})

	.done((signedUrl) => { 	objectKey.key = signedUrl.data.fields.key;

													setText('#uploadText' , 'Photo is uploading. Please be patient and wait.' , 'block' );									
													setButton('#addUpload' , true , 'disabled' , 'btn-primary');
													uploadPhoto(signedUrl , data)     

											})
	.fail((err) => {
													clearText('#uploadText' , '#uploadError' , '#upload-progress');
													setText('#uploadError' , 'Error has occured. Please try again.' , 'block');
											})
							});
			})



function uploadPhoto(signedUrl , data) {

	var url = `${signedUrl.data.url}/${signedUrl.data.fields.key}`;

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

												setButton('#formSubmit' , false , 'btn-primary' , 'disabled');
												showButton('#delUpload' , 'inline');
												showButton('#addUpload' , 'none');											
												setText('#uploadText' , 'Photo successfully uploaded.' , 'block');


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

	function removePhoto(key) {

						$.ajax({
										'type' : 'DELETE' ,

										'url' : `api/video/o/${key}` ,

										'success' : (data , status , response) => {

												setButton('#formSubmit' , true , 'disabled' , 'btn-primary');
												setButton('#addUpload' , true , 'btn-primary' , 'disabled');
												showButton('#delUpload' , 'none');
												showButton('#addUpload' , 'inline');
												setText('#uploadText' , 'Photo successfully deleted. You can now upload another image.' , 'block');

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

/*



var $pop = $('#editor');

//var popup = $pop.popups.get('image.insert');

var layer = $('.fr-image-progress-bar-layer');

layer.find('h3').text('The image is too large');





	

/*
var editor = $('form');

editor.on('DOMNodeInserted DOMNodeRemoved' , function() {

var editor = document.querySelector(".fr-element");

editor.addEventListener("input" , () => {

document.getElementById('pvalue').value = editor.innerText;    });  

})  

*/

/*
var formProcess = $('#formSubmit') , links = $('#link').val() , $title = '' , data = {};

	formProcess.click(function(e) {

			$('ul.ajax').empty();

			e.stopPropagation();
			e.preventDefault();

				var data = {

							'title' : $('#title').val() ,

							'photo' : $('#photo').files[0] ,
				};

				function formValidity() { $title = Boolean(data.title || data.photo)  };

							formValidity();
				
				if(!$title) {
											$('ul.ajax').css('display' , 'block').append('<li> Error processing the form. Please fill in the required fields.</li>');
																																																																														return false;   }
								console.log(data);

																																																																														return false;
					$.ajax({
										'type' : 'POST' ,

										'data' : data ,

										'url' : `/api/${links}` ,

										'dataType'  : 'json' , 

										'success' : (data , status) => {

												window.location = `/entries/${links}`;

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

});*/