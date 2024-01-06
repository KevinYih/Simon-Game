var level = 0;
var arrayClick = [];
var arrayGame = [];
var started = false;
var arrayColor = ["green", "red", "yellow", "blue"];

$(document).keydown(function () {
  if (!started) {
    nextLevel();
    started = true;
  }
});

$(".btn").click(function (event) {
  pressedKey(event.target.id);
  playSound(event.target.id);
  arrayClick.push(event.target.id);
  checkArray();
});

function pressedKey(color) {
  $("#" + color).addClass("pressed");

  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function nextLevel() {
  arrayClick = [];
  level++;
  $("h1").text("levle " + level);
  var keyRandom = Math.floor(Math.random() * 4);
  pressedKey(arrayColor[keyRandom]);
  playSound(arrayColor[keyRandom]);
  arrayGame.push(arrayColor[keyRandom]);
}

function checkArray() {
  var n = arrayClick.length - 1;
  if (arrayClick[n] === arrayGame[n]) {
    if (arrayClick.length === arrayGame.length) {
      setTimeout(() => {
        nextLevel();
        // gameWin();
      }, 1500);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");

  $("h1").text("Game Over, Press Any Key to Restart");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 100);
  started = false;
  arrayGame = [];
  level = 0;
}

function gameWin() {
  playSound("green");
  playSound("yellow");
  playSound("green");
  $("body").addClass("game-win");

  setTimeout(() => {
    $("body").removeClass("game-win");
  }, 100);
}
