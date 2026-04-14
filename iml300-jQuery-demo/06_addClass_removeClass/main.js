$(document).ready(function () {
    $('#on').click(function () {
        $('#square').addClass('rounded');
    });

    $('#off').click(function () {
        $('#square').removeClass('rounded');
    });
});