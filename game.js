let userClickPattern = [];
let buttoncolours = ["red", "blue", "green", "yellow"];
let gamepattern = [];
let levelNumber = 0;



function nextSequence() {
    userClickPattern=[];
    const randomNumber = Math.floor(Math.random() * 4);

    const randomChosenColour = buttoncolours[randomNumber];

    gamepattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playsound(randomChosenColour);

    levelNumber++;

    $("#level-title").html("Level-" + levelNumber);

    // console.log(randomChosenColour);
}



$(".btn").click(function (event) {

    const userChosenColor = this.id;

    userClickPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatepress(userChosenColor);

    checkAnswer(userClickPattern.length - 1);
});



function playsound(name) {
    const audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
}


function animatepress(currentColor) {
    const item = $("#" + currentColor)
    item.addClass("pressed");


    setTimeout(() => {
        item.removeClass("pressed")
    }, 100);
}

let keypressTime = 0;
$(document).keypress(function () {
    keypressTime++;
    if (keypressTime == 1) {

        nextSequence();

    }

});

function startover() {
    userClickPattern = [];

    gamepattern = [];
    levelNumber = 0;
    setTimeout(() => {
        nextSequence();
    }, 500);
}

function checkAnswer(currentLevel) {
    // console.log(currentLevel);
    if (userClickPattern[currentLevel] === gamepattern[currentLevel]) {
        // console.log('success');
        if (userClickPattern.length === gamepattern.length) {

            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // console.log('fail')
        playsound("wrong");

        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press any key to Restart");

        $(document).keypress(function () {
            startover();
        })
    }
}