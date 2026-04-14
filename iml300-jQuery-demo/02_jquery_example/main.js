// SELECTORS & EFFECTS

// 1: Add Document ready function

$(document).ready(function () {

    // 2: Hover the red div and the blue div hides

    $('.red').hover(function () {
        $('.blue').hide();
    });
    
    // 3: Hover the red div and the blue div hides, hover out the red div and blue div shows
    
//    $('.red').hover(function () {
//        $('.blue').hide();
//    }, function () {
//        $('.blue').show();
//    });
//    
    // 4: Hover the red div and the blue div fade in & out out slowly
    
//    $('.red').hover(function () {
//        $('.blue').fadeOut();
//    }, function () {
//        $('.blue').fadeIn();
//    });

    // 5: Select the blue div and fade it out slowly,
    // then wait 3 seconds and fade it back in.

//     $('.blue').fadeOut('slow').delay(1000).fadeIn();    

    // EVENTS

    // 1: Create an click event that toggles the blue div
    // when you click the red div

//     $('.red').click(function(){
//        $('.blue').toggle();
//     });

    // 2: When the user scrolls fade out the red and blue divs

//     $(window).scroll(function(){
//        $('.red, .blue').fadeOut();
//     });

    // CSS

    // 1: When the user clicks the green div add a 
    // background color of orange to the body

//    $('.green').click(function(){
//        $('body').css('background', 'limegreen');
//    });

    // HTML

    // 1: When the user mouses over the green div
    // change the title to "FINISHED!"

//    $('.green').hover(function(){
//        $('h1').html('FINISHED!');
//      }, function() {
//        $('h1').html('jQuery Examples');
//    });

});
