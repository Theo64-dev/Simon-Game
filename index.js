var levelNo = 1;
var wrongSound = new Audio("sounds/wrong.mp3");
var sequence = [];
var i = 0;
var colors = ["blue", "green", "red", "yellow"];


function buttonPlay(buttonColor){
    (new Audio("sounds/" + buttonColor + ".mp3")).play();
    var currentColor = $("#" + buttonColor);
    currentColor.addClass("pressed");
    setTimeout(function(){
    currentColor.removeClass("pressed");
    }, 100);
}

function randomColor(){
    var button = (Math.floor((Math.random()) * 4));
    var color = colors[button];
    (new Audio("sounds/" + color + ".mp3")).play();
    console.log("color is " + color);
    $("#" + color).fadeOut(100).fadeIn(100);
    sequence.push(color);
    console.log(sequence);
}

function levelStart(){
    console.log("level " + levelNo + " starts");
    $(document).off("keydown");
    $("h1").text("Level " + levelNo);
    randomColor();
    i = 0;
    console.log("before click eL set");
    $(".btn").click(function(){
        buttonPlay($(this).attr("id"));
        console.log("button is click");
        checkButton($(this).attr("id"));
        
    });
    console.log("after click eL set");
}

function checkButton(color){
    
    console.log("i is " + i + " for level " + levelNo);
    if(sequence[i] === color){
        console.log("i = " + i + " true for " + color);
        i++;
        if(i == levelNo){
            setTimeout(function (){
            levelNo++;
            $(".btn").off("click");
            levelStart();
            }, 800);
        }
    }
    else{
        console.log("i = " + i + " false for " + color);
        gameOver(); 
    }
}

function gameOver(){
    $("h1").text("Game Over, Press Any Key to Restart");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    }, 100);
    $(".btn").off("click");
    sequence = [];
    i = 0; 
    levelNo = 1;
    $(document).keydown(levelStart);
    console.log("game over");
}

$(document).keydown(levelStart);