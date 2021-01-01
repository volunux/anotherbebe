var formProcess = $('button') , links = $('#link').val() , $title = '' , data = {};

  formProcess.click(function(e) {

      $('ul.ajax').empty();

      e.stopPropagation();
      e.preventDefault();

        var data = {

              'title' : $('#title').val() ,

              'date' : $('#date').val() ,

              'century' : $('#century').val() ,

              'genre' : $('#genre').val() ,

              'country' : $('#country').val() ,

              'continent' : $('#continent').val() ,

              'region' : $('#region').val() ,

              'ethnic_group' : $('#ethnic_group').val() ,

              'about' : $('#about').val() ,

              'artist' : $('#artist').val() ,

              'findspot' : $('#findspot').val() ,

              'medium' : $('#medium').val() ,

              'credit' : $('#credit').val() ,

              'dimension' : $('#dimension').val() ,
        };

        function formValidity() {

            $title = Boolean(data.title && data.date && data.century && data.genre && data.country && data.continent && data.region && data.ethnic_group && data.about);

              console.log($title);

                    };

              formValidity();
        
        if(!$title) {
                      $('ul.ajax').css('display' , 'block').append('<li> Error processing the form. Please fill in the required fields.</li>');
                                                                                                                                                  return false;   }

          $.ajax({
                    'type' : 'POST' ,

                    'data' : data ,

                    'url' : `/api/${links}` ,

                    'dataType'  : 'json' , 

                    'success' : (data , status) => {

                        window.location = `/${links}/` + data.status.url

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

  

/*
var editor = $('form');

editor.on('DOMNodeInserted DOMNodeRemoved' , function() {

var editor = document.querySelector(".fr-element");

editor.addEventListener("input" , () => {

document.getElementById('pvalue').value = editor.innerText;    });	

})	

*/
