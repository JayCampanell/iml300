$(document).ready(function () {   
    $('button').click(function () {
      $('.announcement').toggle();
    });
    
     $('#imgage1').click(function () {
//        $('.infopanel').toggle(2000);     
        $(this).toggleClass("bigger");
    });
    
});
