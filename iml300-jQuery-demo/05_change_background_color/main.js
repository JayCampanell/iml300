$(document).ready(function () {
    var colors = [
        "cyan",
        "blue",
        "yellow",
        "red",
        "limegreen"
    ];

    var counter = 0;
    
    $('button').click(function () {
        if (counter == colors.length) {
            counter = 0;
        }
        var currentColor = colors[counter];
        $('body').css("background", currentColor);
        counter++;
    });
});