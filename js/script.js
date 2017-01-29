var xno = (function(){
  'use strict'

var currentPlayer;
var boxes = [[0,0,0],
             [0,0,0],
             [0,0,0]];
var counter = 0;

$("#board").hide();
$("#finish").hide();

//function that runs at the start of the game and
//randomly determines who will start the game.
function gameStart(){
  $("#player1").removeClass("active");
  $("#player2").removeClass("active");
  currentPlayer = Math.floor(Math.random() * 2);
  if(currentPlayer == 0){
    $("#player1").addClass("active");
  }else{
    $("#player2").addClass("active");
  }
};

//function that changes the active player as it is displayed.
function changeActive(){
  $("#player1").toggleClass("active");
  $("#player2").toggleClass("active");
}

//function handling the currentPlayer variable.
function player(){
  if(currentPlayer == 0){
    currentPlayer ++;
  }else{
    currentPlayer --;
  }
}

//function displaying the background img when the player hovers the mouse over a blank box.
function onHover(element){
  if(currentPlayer == 0){
    if(!$(element).hasClass("box-filled-1") && !$(element).hasClass("box-filled-2")){
      $(element).toggleClass("boxImg0");
    }
  }else{
    if(!$(element).hasClass("box-filled-1") && !$(element).hasClass("box-filled-2")){
      $(element).toggleClass("boxImg1");
    }
  }
}

//function that fills the box when clicked.
function onClick(x){
  if(currentPlayer == 0){
    if(!$(x).hasClass("box-filled-1") && !$(x).hasClass("box-filled-2")){
      $(x).addClass("box-filled-1");
      //console.log("1");
      changeActive();
    }
  }else {
    if(!$(x).hasClass("box-filled-1") && !$(x).hasClass("box-filled-2")){
      $(x).addClass("box-filled-2");
      //console.log("2");
      changeActive();
    }
  }
}

//function that manages the boxes array
function move(listItem){
  var index = 0;
  var counter = -1;
  if(currentPlayer == 0){
    index = $(".box").index(listItem);
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        counter ++;
        if(counter == index){
          boxes[i][j] = "o";
        }
      }
    }
  }else{
    index = $(".box").index(listItem);
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        counter ++;
        if(counter == index){
          boxes[i][j] = "x";
        }
      }
    }
  }
}

//function that checks if anyone has won.
function checkForWin(){
  for(var i = 0; i < 3; i++){
    if(boxes[i][0] == boxes[i][1] && boxes[i][1] == boxes[i][2] && boxes[i][0] != 0){
      return true;
    }
  }for(var j = 0; j < 3; j++){
    if(boxes[0][j] == boxes[1][j] && boxes[1][j] == boxes[2][j] && boxes[0][j] != 0){
      return true;
    }
  }if(boxes[0][0] == boxes[1][1] && boxes[1][1] == boxes[2][2] && boxes[0][0] != 0){
    return true;
  }if(boxes[0][2] == boxes[1][1] && boxes[1][1] == boxes[2][0] && boxes[1][1] != 0){
    return true;
  }
}

//function that displays the win/draw screen.
function showWin(){
  $("#board").hide();
  $("#finish").show();
}

//function that clears the board
function clearBoard(){
  $(".boxes li").each(function(){
    $(this).removeClass();
    $(this).addClass("box empty");
  });
}

function clearFinish(){
  $("#finish").removeClass();
  $("#finish").addClass("screen screen-win");
}

//function that handles the game.
function game(){
  gameStart();
  $(".box").hover(function(){
    onHover(this);
  });
  $(".box").click(function(){
    onClick(this);
    if($(this).hasClass("box-filled-1") || $(this).hasClass("box-filled-2")){
      move(this);
      player();
      counter ++;
      if(checkForWin()){
        //console.log("Winner!");
        if($(this).hasClass("box-filled-1")){
          $("#board").hide();
          $("#finish").show();
          $("#finish").addClass("screen-win-one");
          $(".message").text("Winner!");
        }else{
          $("#board").hide();
          $("#finish").show();
          $("#finish").addClass("screen-win-two");
          $(".message").text("Winner!");
        }
      }else if(counter == 9){
        $("#board").hide();
        $("#finish").show();
        $("#finish").addClass("screen-win-tie");
        $(".message").text("It's a tie!");
      }
    }
  });
}

//function that handles the game.
$(".button").click(function(){
  clearBoard();
  clearFinish();
  counter = 0;
  $("#finish").hide();
  $("#start").hide();
  $("#board").show();
  boxes = [[0,0,0],
          [0,0,0],
          [0,0,0]];
});

game();
}());
