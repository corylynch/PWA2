$(document).ready(function(){

    var signUp = $('#sign-up-button');
    var cancel = $('#cancel-pic');

    signUp.next().css({
        opacity: 0
    });


    signUp.on('click', function(e){
        $(this).next().animate({
            top: '80px',
            opacity: 1
        });
        $(this).next().show();
    });

    cancel.on('click', function(e){
        $(signUp).next().css({
                top: '-100px',
                display: 'none',
                opacity: 0
            });

    })

});