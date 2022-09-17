
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
//
var started = false;
var level = 0;
// to detect keypress
$(document).keypress(function() {
  getStarted();
});

$("h1").click(function() {
getStarted();
$("h1").fadeOut(100).fadeIn(100);
});
//
$(".btn").click(function() {
// this : to triggered the preesed button.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
//
  playSound(userChosenColour);
  animatePress(userChosenColour);
//
  checkAnswer(userClickedPattern.length-1);
});
//
function checkAnswer(currentLevel) {
//
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
//
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
//
//
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
//
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
//
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function getStarted(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
}
//
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
