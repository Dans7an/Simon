//Array of available colors in our document
var buttonColours = ["red","blue","green","yellow"];
//Empty arrays to store values for both the game pattern and the user clicked buttins
var gamePattern = [];
var userClickedPattern = [];
//Starting level
var level = 0;
//function the dictates the game pattern
function nextSequence(){
  //We need a random color so we use random number to select it out the Array
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
//We push the random color into the game pattern array and store it there
gamePattern.push(randomChosenColour);
//Animate the button chosen by CPU for an effect
$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
//We add sound to the button chosen by CPU button
playSound(randomChosenColour);
//Increasing the level each time the function nextSequence is called
level ++;
$("#level-title").text("level "+ level);
}
//Store the user clicked button in a variable
var gotClicked = $(".btn").click(function(){
  var userChosenColour = ($(this).attr("id"));
  //push and store the clicked button in an array called userClickedPattern
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);//add sound to clicked button
animatePress(userChosenColour); // animate and add effected whenever a button is clicked
//Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
checkAnswer(userClickedPattern.length-1);
});
//Creating the sound function
function playSound(name){
  var audio = new Audio("sounds/"+name+ ".mp3");
  audio.play();
}
//Animation function for whenever a button is pressed to change colours
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
setTimeout(function(){
  $("#"+currentColour).removeClass("pressed")}, 100);
}
//Storing a variable of whether a game has started in a boolean
var gameBegann = false;
// When any key on the keyboard is pressed, it sound trigger thr game to begin
    $(document).keypress(function(){
      if (!gameBegann){
      $("#level-title").text("level "+ level);
// When a key is pressed, trigger the next value in the sequence to be called
      nextSequence();
// When the game begins, this function gets terminated
      gameBegann = true;
    }
  });
//verifying the right click
function checkAnswer(currentLevel){
//An if statement  to check if the most recent clicked button is the same as the game pattern.
if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
//If it is the right answer, then they have finished, reset array for the next level
  if (gamePattern.length===userClickedPattern.length){
    setTimeout(function(){nextSequence()}, 1000);
        userClickedPattern=[];
  }
}else {//if the user gives the wrong answer
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();//sound effects for the wrong click
  $("body").addClass("game-over");//Change the h1 to game-over
  setTimeout(function(){$("body").removeClass("game-over")},200);
  $("#level-title").text( "Game Over, Press Any Key to Restart");
//Calling restart function
  startOver();
}

}
//Restart function resets the whole game back to the first level
function startOver(){
  level = 0;
  gameBegann = false;
  gamePattern = [];
  userClickedPattern = [];
}
