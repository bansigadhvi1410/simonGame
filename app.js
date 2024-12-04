let gameSeq = [];
let userSeq = [];

let btns = ["crimson", "teal", "chocolate", "cornflowerblue"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let h4 = document.querySelector("h4");

document.addEventListener("keypress", function(){
    if(started == false){
        console.log("game is started!!");
        started = true;
        levelUP();
    }
});


// Adds a flash effect to a button
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);
}

// Progress to the next level
function levelUP(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

// Checks the user's answer and validates it
function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUP(), 1000);
        }
    }else{
        h2.innerHTML = `Game Over! Your score was ${level}.<br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        if(level >= highScore){
            highScore = level;
            printHighScore(highScore);
        }
        reset();
    }
}

function btnPress(){
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let btnAll = document.querySelectorAll(".block");
for(btn of btnAll){
    btn.addEventListener("click", btnPress);
}

// Resets game variables to restart
function reset(){
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}

//high score
function printHighScore(highScore){
    h4.innerText = `High Score : ${highScore}`;
}