$(document).ready(function() {
     // listen to register button
     $('#register').on('click', function(){
        register();
     });
     //listen to reset password button
     $('#resetPassword').on("click", function() {
        resetPassword();
     });
     //listen to login button
     $('#login').on('click', function() {
        login();
     });
});
// function to register a new user
function register() {
    var registFullName  = $('#registerFullName').val();
    var registUserName = $('#registerUsername').val();
    var registPassword = $('#registerPassword').val();
    var registConfirmPassword = $('#registerConfirmPassword').val();
    $.ajax({
        url : 'model/login/register.php',
        method : 'POST',
        data: {
            registFullName : registFullName,
            registUserName : registUserName,
            registPassword : registPassword,
            registConfirmPassword : registConfirmPassword,
        },
        success : function(data){
            $('#registerMessage').html(data);
        }
    });
}

// function to reset password
function resetPassword() {
    var resetUserName = $('#resetUserName').val();
    var resetPassword = $('#resetPassword').val();
    var resetConfirmPassword = $('resetConfirmPassword');

    $.ajax({
        url : 'model/login/resetPassword.php',
        method : 'POST',
        data : {
            resetUsername:resetUsername,
            resetPassword:resetPassword,
            resetConfirmPassword:resetConfirmPassword,
        },
        success : function(data) {
            $('#resetMessage').html(data);
        }
    });
}

// function to login a user
function login() {
    var loginUserName = $('#loginUserName').varl();
    var loginPassword = $('#loginPassword').val();

    $.ajax({
        url : 'model/login/checkingLogin.php',
        method : 'POST',
        data : {
            loginUserName : loginUserName,
            loginPassword : loginPassword,
        },
        success : function(data) {
            $('#loginMessage').html(data);

            if(data.indexOf('Redirecting') >= 0) {
                window.location = 'index.php';
            }
        }
    });
}