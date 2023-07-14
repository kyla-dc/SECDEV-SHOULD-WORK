$(document).ready(function () {
    var flag1 = 0;
    var flag2 = 0;
    var flag3 = 0;
    var flag4 = 0;
    $('#username').keyup(function () {
        var username = $('#username').val();
        $.get('/getCheckUsername', {username: username}, function (result) {
            if(result.username == username) {
                $('#username').css('background-color', 'red');
                $('#same_Username').css("display", "block");
                $("#submit").prop("disabled", true);
                flag1=0;
            }
            else {
                $('#username').css('background-color', '#E3E3E3');
                $('#same_Username').css("display", "none");
                flag1=1;
                enableSubmitButton();
            }
        });
    });
    $("#password").keyup(function() 
    {
        var password = $("#password").val();
        var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

        if (passwordRegex.test(password)) {
            $.get('/getCheckPassword', {password: password}, function(result) {
                if(result.password == password) {
                    $("#password").css("background-color", "red");
                    $('#invalid_password').css("display", "block");
                    $("#submit").prop("disabled", true);
                    flag2=0;
                }
                else {
                    $("#password").css("background-color", "white");
                    $('#invalid_password').css("display", "none");
                    flag2 = 1;
                    enableSubmitButton();
                }
            });
        }else{
            $("#password").css("background-color", "red");
            $('#invalid_password').css("display", "block");
            $("#submit").prop("disabled", true);
            flag2=0;
        }
    });

    $('#email').keyup(function () {
        var email = $('#email').val();
        var emailRegex = /^([-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+\/-9=?A-Z^-~]+(\.[-!#-'*+\/-9=?A-Z^-~]+)*\.[A-Z]{2,})$/i;
     
        if(emailRegex.test(email)) {
            $('#email').css('background-color', '#E3E3E3');
            $('#wrong_email').css("display", "none");
            flag3 = 1;
            enableSubmitButton();
        }
        else {
            $('#email').css('background-color', 'red');
            $('#wrong_email').css("display", "block");
            $("#submit").prop("disabled", true);
            flag3 = 0;
        }
    });


    $('#phone').keyup(function () {
        var phone = $('#phone').val();
        var PhoneRegex = /^\+?[0-9]{1,3}-?[0-9]{1,14}$/

        if(PhoneRegex.test(phone)) {
            $('#phone').css('background-color', '#E3E3E3');
            $('#wrong_Phonenumber').css("display", "none");
            flag4 = 1;
            enableSubmitButton();
        }
        else {
            $('#phone').css('background-color', 'red');
            $('#wrong_Phonenumber').css("display", "block");
            $("#submit").prop("disabled", true);
            flag4 = 0;
        }
    });


    function enableSubmitButton() {
        if (flag1 === 1 && flag2 === 1 && flag3 ===1 && flag4 ===1 ) {
            $("#submit").prop("disabled", false);
        } else {
            $("#submit").prop("disabled", true);
        }
    }

});
