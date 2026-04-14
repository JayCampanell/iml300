$(document).ready(function () {
  var colors = ["green", "blue", "red"];
  var counter = 0;
  $(".flower").click(function () {
    $("#paragraph").toggle();
    if (counter == colors.length) {
      counter = 0;
    }
    var current_color = colors[counter];
    console.log(current_color);
    counter++;
    $("body").css("background", current_color);
  });

  $("#imgage1").click(function () {
    $(this).toggleClass("bigger");
  });
  $(function () {
    $(".flower").draggable();
  });

  $(function () {
    $("#imgage1").droppable();
  });


  $(window).scroll(function () {
    $("#hidden").toggleClass("show");
  });
});
