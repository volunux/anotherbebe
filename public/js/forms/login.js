var formProcess = $('button') , $title = '' , data = {};

  formProcess.click(function(e) {

      $('ul.ajax').empty();

      e.stopPropagation();
      e.preventDefault();

        data = {

              'email_address' : $('#email_address').val() ,

              'password' : $('#password').val() ,

        };

        function formValidity() {   $title = Boolean(data.email_address || data.password)  };

              formValidity();

        
        if(!$title) {   $('ul.ajax').css('display' , 'block').append('<li> Error processing the form. Please fill in the required fields.</li>');
                                                                                                                                                  return false;   }

        if ($('#password').val().length < 8) {   $('ul.ajax').css('display' , 'block').append('<li> Password cannot be less than 8 characters in length.</li>');
                                                                                                                                                                  return false;  }

          $.ajax({
                    'type' : 'POST' ,

                    'data' : data ,

                    'url' : `/api/signin` ,

                    'dataType'  : 'json' , 

                    'success' : (data , status) => {

                        window.location = `/user/dashboard`;

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

