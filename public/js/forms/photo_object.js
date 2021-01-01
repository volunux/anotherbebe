var $objectInfo = {

		'key' : '' , 

		'photo' : {

				'url' : '' ,

				'size' : false ,

				'type' : false } 

};

var $rmethod = document.getElementById('rmethod').value;

var $inputFile = document.getElementById('photo');

var $formFillGuide = document.getElementById('showFormGuide');

var objectKey = '';

var $fileSize = 500 * 1024;

var $uploadBtn = document.getElementById('addUpload');

var $removeBtn = document.getElementById('delUpload');

var ajaxCall = '';

var $formProcess = document.getElementById('formSubmit');

var $links = document.getElementById('link').value;

var $link = document.getElementById('link').value;

var $body = '' , $data = {};

$formFillGuide.onclick = function() {

	var $guidelines = document.getElementById('guidelines');

	if ($guidelines.style.display == 'none') {
			
				$guidelines.style.display = 'block';	} 

	else {
					$guidelines.style.display = 'none';	}		};

if (window.attachEvent) { 

		window.attachEvent('onload' , $pageLoad); }

else if (window.addEventListener) {

		window.addEventListener('load' , $pageLoad , false);	}

else {

	document.addEventListener('load' , $pageLoad , false);}


function $pageLoad() { 

	$formPost();

	$inputFile.onchange = function(e) {

		var $el = e.target.files[0];

			$checkImageSize($el);

			$checkImageType($el);		};

	$uploadBtn.onclick = function(e) {

			$clearEvent(e);

			$clearText('uploadMessage' , 'uploadError' , 'uploadError1' , 'upload-progress');

			var data = {

						'photo' : document.getElementById('photo').files[0] ,
			}

		if (!data.photo && $rmethod == 'POST') {
												
			$setText('uploadError' , 'Photo should be provided and cannot be empty.' , 'block');
	
					return false;
		}

			$checkImageSize(data.photo);

			$checkImageType(data.photo);

var $getHash = new XMLHttpRequest();

$getHash.open('POST' , '/uploader/signature/' + data.photo.name + '/');

$getHash.setRequestHeader('Content-Type' , 'application/json;charset=UTF-8');

$getHash.onload = function(res) { $objectInfo.key = JSON.parse(res.target.responseText).data.fields.key;

		if (res.target.status == 200) {

		$setElement('photo' , true);

		$setButton('addUpload' , true , 'disabled' , 'btn-primary');

		$showButton('calUpload' , 'inline');

		$setText('uploadMessage' , 'Photo is uploading. Please be patient and wait. % uploaded : ' , 'inline' );

		return $uploadImage(JSON.parse(res.target.responseText) , data);		}

		$clearText('uploadMessage' , 'uploadError' , 'uploadError1' , 'upload-progress');

		$setText('uploadError' , 'Error has occured. Please try again.' , 'block');
}		

var $photoInfo = {	'filename' : data.photo.name ,

										'contentType' : data.photo.type 	};

$photoInfo = JSON.stringify($photoInfo);

$getHash.send($photoInfo);

};		

 $removeBtn.onclick = function(e) {

			$clearEvent(e);

			$clearText('uploadMessage' , 'uploadError' , 'uploadError1' , 'upload-progress');

			$clearText('percent' , 'uploadText');

			$setText('uploadMessage' , 'Photo is getting deleted. Please be patient and wait.' , 'inline');

			$setButton('delUpload' , true , 'disabled' , 'btn-danger');

			$removeImage($objectInfo.key);
 };

};

function $uploadImage(signedUrl , data) {

	$objectInfo.photo.url = `${signedUrl.data.url}/${signedUrl.data.fields.key}`;

	var $myFormData = new FormData();

	for (var key in signedUrl.data.fields) {

			$myFormData.append(key , signedUrl.data.fields[key]);
	}

	$myFormData.append('file' , data.photo);

$xhrUpload = new XMLHttpRequest();

$xhrUpload.upload.onprogress = function(evt) {
												
if (evt.lengthComputable) {
	
	var percentComplete = evt.loaded / evt.total;
	
			percentComplete = parseInt(percentComplete * 100);
	
	var progress = Math.round(percentComplete);

			$setText('percent' , `${progress}`  , 'inline-block');		}
};

$xhrUpload.upload.onload = function(res) {

};

$xhrUpload.upload.onerror = function(evt) {

			$setElement('photo' , false);
	
			$setButton('addUpload' , false , 'btn-primary' , 'disabled');
	
			$showButton('calUpload' , 'none');
	
			$clearText('uploadMessage' , 'percent' , 'uploadText' , 'upload-progress');
	
			$setText('uploadError' , 'An error has occured. Please try again.' , 'block');
};

$xhrUpload.upload.onabort = function(evt) {

		$setElement('photo' , false);

		$setButton('addUpload' , false , 'btn-primary' , 'disabled');

		$clearText('uploadMessage' , 'percent' , 'uploadText' , 'upload-progress');

		$setText('uploadMessage' , 'Photo upload cancelled. You can now upload another photo.' , 'inline');

};

$xhrUpload.upload.ontimeout = function(evt) {

		$setElement('photo' , false);
	
		$setButton('addUpload' , false , 'btn-primary' , 'disabled');
	
		$showButton('calUpload' , 'none');
	
		$clearText('uploadMessage' , 'percent' , 'uploadText' , 'upload-progress');
	
		$setText('uploadError' , 'File upload has has timed-out. Please try again.' , 'block');
};

$xhrUpload.onload = function(res) {

if (res.target.readyState == 4 && res.target.status == 201) {

			$showButton('addUpload' , 'none');
			
			$setButton('delUpload' , false , 'btn-danger' , 'disabled');
			
			$showButton('delUpload' , 'inline');
			
			$clearText('uploadMessage' , 'percent' , 'uploadText' , 'upload-progress');
			
			$setText('uploadText' , 'Photo successfully uploaded.' , 'block');
			
			$showButton('calUpload' , 'none');
			
			$setElement('calUpload' , false);

if ($rmethod == 'POST') {

		$setButton('formSubmit' , false , 'btn-primary' , 'disabled');			}

		var $subUpload = new XMLHttpRequest();

		$subUpload.open('POST' , '/api/upload/');

		$subBody = {	'Key' : $objectInfo.key 	};

		$subUpload.setRequestHeader('Content-Type' , 'application/json;charset=UTF-8');

		$subBody = JSON.stringify($subBody);

		$subUpload.send($subBody);

		$subUpload.onload = function(res) {

				console.log(res);		} 		

			return false;		}
};

$xhrUpload.open('POST' , signedUrl.data.url);

$xhrUpload.send($myFormData);

    };

var cancelBtn = document.getElementById('calUpload');

cancelBtn.onclick = function(e) {

			$clearEvent(e);

			$setElement('calUpload' , true);

			$xhrUpload.abort();

			$showButton('calUpload' , 'none');

			$setElement('calUpload' , false);
};


function $removeImage(key) {

	var $xhrRemove = new XMLHttpRequest();

	$xhrRemove.onload = function(res) {

			if (res.target.status == 200) {

				if ($rmethod == 'POST') {

						$setButton('formSubmit' , true , 'disabled' , 'btn-primary');		}

						$setElement('photo' , false);
						
						$setButton('addUpload' , false , 'btn-primary' , 'disabled');

						$showButton('delUpload' , 'none');
						
						$showButton('addUpload' , 'inline');
						
						$setText('uploadMessage' , 'Photo successfully deleted. You can now upload another photo.' , 'inline');

						return false;		}

				if (true) {

						$clearText('uploadMessage' , 'uploadError' , 'upload-progress');
						
						$setButton('delUpload' , false , 'btn-danger' , 'disabled');
						
						$setText('uploadError' , 'An error has occured. Please try again.' , 'block');

						return false;		}
	};

	$xhrRemove.ontimeout = function(e) {

						$clearText('uploadMessage' , 'uploadText' , 'uploadError' , 'upload-progress');
					
						$setButton('delUpload' , false , 'btn-danger' , 'disabled');
					
						$setText('uploadError' , 'An error has occured while removing image. Please try again.' , 'block');
	};

	$xhrRemove.open('DELETE' , '/api/photo/o/' + key);

	$xhrRemove.timeout = 12000;

}


/** Form Handling Section below **/ 


	$formProcess.onclick = function(e) {

				$clearEvent(e);

				$clearText('ajax');

				var $myData = {

'title' : document.getElementById('title').value , 'date' : document.getElementById('date').value , 'century' : document.getElementById('century').value , 'continent' : document.getElementById('continent').value , 

'country' : document.getElementById('country').value , 'region' : document.getElementById('region').value , 'genre' : document.getElementById('genre').value , 'artist' : document.getElementById('artist').value ,

'ethnic_group' : document.getElementById('ethnic_group').value , 'about' : document.getElementById('about').value , 'photo' : document.getElementById('photo').files[0] ,

'findspot' : document.getElementById('findspot').value , 'medium' : document.getElementById('medium').value , 'credit' : document.getElementById('credit').value , 

'dimension' : document.getElementById('dimension').value };

				if ($myData.photo) {

					var $photo_detail = {'location' : $objectInfo.photo.url , 'mimetype' : $myData.photo.type , 'size' : $myData.photo.size , 'encoding' : $myData.photo.type};

					$myData.photo_detail = $photo_detail;	}

				if ($rmethod == 'PUT') {

					function formValidity() {

								 $body = Boolean(

$myData.title && $myData.date && $myData.century && $myData.continent && $myData.country && $myData.region && $myData.genre && $myData.ethnic_group && $myData.about && $myData.title.length < 150 && 

$myData.date.length < 15 && $myData.century.length < 30 && $myData.genre.length < 30 && $myData.country.length < 30 && $myData.continent.length < 30 && $myData.region.length < 30 && $myData.about.length < 2000

&& $myData.ethnic_group.length < 30 && $myData.about.length > 10 && $myData.artist.length < 30 && $myData.findspot.length < 30 && $myData.medium.length < 30  && $myData.credit.length < 30 

&& $myData.dimension.length < 200 && $myData.date.length >= 4		);  	}		}

				if ($rmethod == 'POST') {

					function formValidity() {

							 $body = Boolean(

$myData.title && $myData.date && $myData.century && $myData.continent && $myData.country && $myData.region && $myData.genre && $myData.ethnic_group && $myData.about && $myData.title.length < 150 && 

$myData.date.length < 15 && $myData.century.length < 30 && $myData.genre.length < 30 && $myData.country.length < 30 && $myData.continent.length < 30 && $myData.region.length < 30 && $myData.about.length < 2000

&& $myData.ethnic_group.length < 30 && $myData.about.length > 10 && $myData.artist.length < 30 && $myData.findspot.length < 30 && $myData.medium.length < 30  && $myData.credit.length < 30 && $myData.photo

&& $myData.dimension.length < 200 && $myData.date.length >= 4		);		}			}

			formValidity();

				if(!$body) {

				var $valMessages = document.getElementById('ajax');

				$valMessages.style.display = 'block';

				$valMsg = document.createElement('li');

				$valMsg.textContent = 'Error processing the form. Please read the form guidelines and fill in the form as required.';

				$valMessages.appendChild($valMsg);

				$clearEvent(e);
							
							return false;   }

				$setButton('formSubmit' , true , 'disabled' , 'btn-primary');
				
				$setText('uploadMessage' , 'Form is processing. Please be patient and wait.' , 'inline');
																																													
				delete $myData.photo;

				if ($rmethod == 'PUT') {

						$updateUrl = document.getElementById('update').value;

						$links = $links + '/' + $updateUrl;

				}

$xhrForm = new XMLHttpRequest();

$xhrForm.open($rmethod , '/api/' + $links);

$xhrForm.setRequestHeader('Content-Type' , 'application/json');

$myData = JSON.stringify($myData);

$xhrForm.onload = function(res) {

	if (res.target.status == 200) {

			setTimeout(() =>  window.location = `/user/entry/${$link}` , 3000);

			return false;
	}

	if (res.target.status == 400) {

		console.log(res);

			errors = [];

			$valErrors = JSON.parse(res.target.responseText);


			if ($valErrors) {

			for (errMsg in $valErrors) {

					errors.push($valErrors[errMsg]['message']);
			}

				if (errors) {

			for(var item in errors) {

		var $valMessages = document.getElementById('ajax');

				$valMessages.style.display = 'block';

				$valMsg = document.createElement('li');

				$valMsg.textContent = item;

				$valMessages.appendChild($valMsg);
						
					}		}

				$clearText('uploadMessage' , 'uploadText' , 'uploadError' , 'upload-progress');

				$setButton('formSubmit' , false , 'btn-primary' , 'disabled');

				$setText('uploadMessage' , 'Error processing form. Please read the guidelines above.' , 'inline');	

				return false;		}		}

				$clearText('uploadMessage' , 'uploadText' , 'uploadError' , 'upload-progress');

				$setButton('formSubmit' , false , 'btn-primary' , 'disabled');

				$setText('uploadMessage' , 'Error processing form. Please read the guidelines above.' , 'inline');	
};

$xhrForm.send($myData);				}; 



function $showButton(ref , display) {

	var $el = document.getElementById(ref);
	
			$el.style.display = display;						}



function $formPost() {

			if ($rmethod == 'POST') {

			$setButton('formSubmit' , true , 'disabled' , 'btn-primary');

			$setButton('addUpload' , true , 'disabled' , 'btn-primary');		}		}



function $setButton(ref , attr , add = '' , remove = '') {

var $el = document.getElementById(ref);

		$el.disabled = attr;

		$arr = $el.className.split(' ');
 
		if ($arr.indexOf(add) == -1) {
		
				$el.className += ' ' + add;		}

var $remove = remove;

var $rm = new RegExp($remove, 'g');

			$el.className = $el.className.replace($rm , '');		}



function $setElement(ref , attr) {

var $el = document.getElementById(ref);
			
			$el.disabled = attr;		}


function $clearText(ref , ref1 = 'ref1' , ref2 = 'ref2' , ref3 = 'ref3') {

		var $el = document.getElementById(ref);

		var $el1 = document.getElementById(ref1);

		var $el2 = document.getElementById(ref2);

		var $el3 = document.getElementById(ref3);

		if ($el) {

				$el.textContent = '';
		}

		if ($el1) {

				$el1.textContent = '';
		}

		if ($el2) {

				$el2.textContent = '';
		}

		if ($el3) {

				$el3.textContent = '';
		}
}

function $setText(ref , text , display , ref2 , ref3) {

var $el = document.getElementById(ref);
		
		$el.style.display = display;

		$el.textContent = text;
}

function $checkImageSize($myFile) {

	if ($myFile) {
									if ($myFile.size > $fileSize) {
											
											$clearText('uploadMessage' , 'uploadError' , 'upload-progress');

											$setButton('addUpload' , true , 'disabled' , 'btn-primary');

											$setText('uploadError' , 'File is too large and will not be uploaded.' , 'block');

											$objectInfo.photo.size = true

																					return false;		}
								
								$clearText('uploadMessage' , 'uploadError' , 'upload-progress');

								$setButton('addUpload' , false , 'btn-primary' , 'disabled');

								$objectInfo.photo.size = false
			} else {

								$clearText('uploadMessage' , 'uploadError' , 'upload-progress');

								$setButton('addUpload' , true , 'disabled' , 'btn-primary');	}
	 }

function $checkImageType(file) {

	if (file) {

			if (file.type.indexOf('image') == -1) {

		$clearText('uploadMessage' , 'upload-progress');
	
		$setButton('addUpload' , true , 'disabled' , 'btn-primary');
	
		$setText('uploadError1' , 'Only Photo or Image is allowed to be uploaded in this field.' , 'block');
	
		$objectInfo.photo.type = true;

								return false;		}

					if (!$objectInfo.photo.size) {

							$clearText('uploadMessage' , 'uploadError' , 'uploadError1' , 'upload-progress');

							$setButton('addUpload' , false , 'btn-primary' , 'disabled');	}

						else {
												$clearText('uploadMessage' , 'uploadError1' , 'upload-progress');

												$setButton('addUpload' , true , 'disabled' , 'btn-primary');			}	}	
			else {
							$clearText('uploadMessage' , 'uploadError' , 'uploadError1' , 'upload-progress');		}
}

function $clearEvent($el) {

		$el.stopPropagation();

		$el.preventDefault();
}