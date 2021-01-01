var $rmethod = document.getElementById('rmethod').value , $formFillGuide = document.getElementById('showFormGuide') , $formProcess = document.getElementById('formSubmit') , 

$links = document.getElementById('link').value , $link = document.getElementById('link').value , objectKey = '' , $body = '' , $data = {};

$formFillGuide.onclick = function() {

	var $guidelines = document.getElementById('guidelines');

	if ($guidelines.style.display == 'none') {
    	
    		$guidelines.style.display = 'block';	} 

	else {
  				$guidelines.style.display = 'none';	}		};

$formProcess.onclick = function(e) {

$clearEvent(e);

document.getElementById('ajax').textContent = '';

var $myData = {

'name' : document.getElementById('name').value , 'definition' : document.getElementById('definition').value , 'morphology' : document.getElementById('morphology').value , 

'gloss' : document.getElementById('gloss').value , 'alphabet' : document.getElementById('alphabet').value , 'ethnic_group' : document.getElementById('ethnic_group').value , 

'continent' : document.getElementById('continent').value , 'region' : document.getElementById('region').value , 'gender' : document.getElementById('gender').value , 

'specie' : document.getElementById('specie').value , 'baby' : document.getElementById('baby').value , 'ethnic' : document.getElementById('ethnic').value		};


if ($rmethod == 'PUT') {

function formValidity() { $body = Boolean(

$myData.name && $myData.definition && $myData.morphology && $myData.gloss && $myData.alphabet && $myData.ethnic_group && $myData.continent && $myData.region && $myData.gender && $myData.specie && $myData.baby && 

$myData.name.length < 36 && $myData.definition.length < 300 && $myData.morphology.length < 200 && $myData.gloss.length < 200 && $myData.alphabet.length < 3 && $myData.ethnic_group.length < 40 &&

$myData.continent.length < 40 && $myData.region.length < 40 && $myData.gender.length < 10 && $myData.specie.length < 10 && $myData.baby.length < 10     );  };		}



if ($rmethod == 'POST') {

function formValidity() { $body = Boolean(

$myData.name && $myData.definition && $myData.morphology && $myData.gloss && $myData.alphabet && $myData.ethnic_group && $myData.continent && $myData.region && $myData.gender && $myData.specie && $myData.baby && 

$myData.name.length < 36 && $myData.definition.length < 300 && $myData.morphology.length < 200 && $myData.gloss.length < 200 && $myData.alphabet.length < 3 && $myData.ethnic_group.length < 40 &&

$myData.continent.length < 40 && $myData.region.length < 40 && $myData.gender.length < 10 && $myData.specie.length < 10 && $myData.baby.length < 10     );  };			}


formValidity();


if(!$body) {
							var $valMessages = document.getElementById('ajax');

							$valMessages.style.display = 'block';

							$valMsg = document.createElement('li');

							$valMsg.textContent = 'Error processing the form. Please read the form guidelines and fill in the form as required.';

							$valMessages.appendChild($valMsg);

								// $clearEvent(e);
																return false;   }

$setButton('formSubmit' , true , 'disabled' , 'btn-primary');

$setText('text-message' , 'Form is processing. Please be patient and wait.' , 'inline');

if ($rmethod == 'PUT') {

	$updateUrl = document.getElementById('update').value;

	$links = $links + '/' + $updateUrl;

}

var oReq = new XMLHttpRequest();

oReq.onload = function(res) {

	if (res.target.status == 200 || res.target.status == 201) {

				var data = JSON.parse(res.target.responseText);

				var status = res.target.status;

								if (status == 200 && (data.specie == 'Human')) {

							return setTimeout(function() {	window.location = '/name/nation/' + data.ethnic_group + '/' + data.name; } , 3000)		}

				if (status == 200 && (data.specie == 'Animal')) {

							return setTimeout(function() {	window.location = '/name/animal/' + data.ethnic_group + '/' + data.name; } , 3000)		}

				if (status == 200 && (data.specie == 'Plant')) {

							return setTimeout(function() {	window.location = '/name/plant/' + data.ethnic_group + '/' + data.name; } , 3000)		}					}

						if (res.target.status == 400) {

									errors = [];

									$valErrors = JSON.parse(res.target.responseText);

									for (errMsg in $valErrors) {

											errors.push($valErrors[errMsg]['message']);			}

								if (errors) {

									for (var item in errors) {

								var $valMessages = document.getElementById('ajax');

										$valMessages.style.display = 'block';

										$valMsg = document.createElement('li');

										$valMsg.textContent = errors[item];

										$valMessages.appendChild($valMsg);		};			}


									$clearText('text-message');
									
									$setButton('formSubmit' , false , 'btn-primary' , 'disabled');
									
									$setText('text-message' , 'Error processing form. Please read the guidelines above.' , 'block');


							// setTimeout(() =>  window.location = `/user/entry/${$link}` , 3000)

							
						}

}



oReq.open($rmethod , '/api/' + $links);

oReq.setRequestHeader('Content-type', 'application/json; charset=utf-8');

$myData = JSON.stringify($myData);

oReq.send($myData);

}; 

function $clearEvent($el) {

		$el.stopPropagation();

		$el.preventDefault();			}


function $clearText(ref) {

var $el = document.getElementById(ref);

		$el.textContent = '';			}


function $setText(ref , text , display) {

var $el = document.getElementById(ref);

		$el.style.display = display;
		
		$el.textContent = text;		}


function $setButton(ref , attr , add = '' , remove = '') {

var $el = document.getElementById(ref);

		$el.disabled = attr;

		$arr = $el.className.split(' ');
 
  if ($arr.indexOf(add) == -1) {
  
  	  $el.className += ' ' + add;		}

var $remove = remove;

var $rm = new RegExp($remove, 'g');

			$el.className = $el.className.replace($rm , '');		}
