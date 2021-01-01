$formProcess.click(function(e) {

$clearEvent(e);

$('ul.ajax').empty();

var $myData = {

'title' : $('#title').val() ,

'definition' : $('#definition').val() ,

'morphology' : $('#morphology').val() ,

'gloss' : $('#gloss').val() ,

'alphabet' : $('#alphabet').val().toString() ,

'continent' : $('#continent').val().toString() ,

'region' : $('#region').val().toString() ,

'ethnic_group' : $('#ethnic_group').val().toString() ,

'gender' : $('#gender').val().toString() ,

'baby' : $('#baby').val().toString() ,

'specie' : $('#specie').val().toString() ,

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
$myData.dimension.length < 200 && $myData.date.length > 4               )  };

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
$myData.dimension.length < 200 && $myData.date.length > 4               )  };

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

function $clearEvent($el) {

                $el.stopPropagation();
                $el.preventDefault();
}