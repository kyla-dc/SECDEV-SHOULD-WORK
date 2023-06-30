$(document).ready(function () {
    $('#password').keyup(function () {
        var username = $('#username').val();
        var password = $('#password').val();

        var query = {
            username: username,
            password: password
        }

        $.get('/getPassword', query, function (result) {
            if(result) {
                $('#error').text('');
                $('#submit').prop('disabled', false);   
                $('#submit').css('color', 'white');
            }
            else if (password == '') {
                $('#error').text('');
                $('#submit').prop('disabled', false);   
                $('#submit').css('color', 'white');
            }
            else {
                $('#error').text('Account does not exist / Password not found');
                $('#submit').prop('disabled', true);
                $('#submit').css('color', 'grey');
            }
        });
    });
});
