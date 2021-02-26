const maxVal = 140;
const characterCounter = function () {
  const counter = $("#tweet-text").val().length;

  $(".counter").text(maxVal - counter);
  $(".counter").text() < 0
    ? $(".counter").addClass("invalid")
    : $(".counter").removeClass("invalid");
  $(".errorMessage").slideUp("slow");
};

$(document).ready(function () {
  $("#tweet-text").on("input", characterCounter);
});
