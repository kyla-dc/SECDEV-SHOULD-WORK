function validateForm(form){
    var username = $('.username').val();
    var firstName = $('.fname').val();
    var lastName = $('.lname').val();
    var phone = $('.phone').val();

    
    if (username != "" && firstName != "" && lastName != "" && phone != ""){
        $('.username').css('background-color', 'white');
        $('.firstName').css('background-color', 'white');
        $('.lastName').css('background-color', 'white');
        $('.phone').css('background-color', 'white');
        return true;
    }
    else {
        if (username == "") {
            $('.username').css('background-color', 'red');
        }

        if (firstName == "") {
            $('.firstName').css('background-color', 'red');
        }

        if (lname == "") {
            $('.lastName').css('background-color', 'red');
        }
        if(phone =""){
            $('.phone').css('background-color', 'red');
        }

        return false;
    }
}

function changeImage() {
    var username = $('#hiddenUsername').val();
    $.get('/getProfileAvatar/'+username, {username: username}, function (result) {
        document.getElementById("dp").src = result.avatar;
    })
}