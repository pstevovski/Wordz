// Global variables
const displayedWord = document.getElementById("wordDisplay");
const wordInput = document.getElementById("wordInput");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("time");
const message = document.getElementById("message");
const seconds = document.getElementById("seconds");
const getReadyContainer = document.querySelector(".getReady");
const getReady = document.getElementById("getReady");
const intro = document.querySelector(".intro");
const notification = document.getElementById("notification");

// Container variables
const gameWindow = document.querySelector(".game");
const buttons = document.querySelector(".levels");

// Array of words to be used.
const words = ["route","soil","cotton","beer","association","tolerate","rib","organ","save","sleeve","ask","deserve","activity","bike","absorption","take","restaurant","closed","cross","prefer","singer","intervention","establish","affect","paper","pottery","restless","ash","sound","census","feign","ethnic","flight","hate","master","army","overcharge","heavy","character","manufacturer","tin","formal","bless","bomb","bag","domestic","green","look","vacuum","global","behave","captivate","experience","emotion","operational","transparent","tape","hike","dead","highlight","Koran","pension","expertise","laborer","illustrate","adjust","portion","hunter","manufacture","manager","state","wheat","easy","officer","productive","fragment","dine","articulate","kettle","operation","undress","rumor","customer","bet","kitchen","belong","sunshine","cool","recycle","ton","annual","ridge","throw","debut","essay","bait","waste","shadow","electronics","rabbit","liberty","unfair","pedestrian","load","fund","custody","detail","Bible","duck","orthodox","watch","culture","able","compliance","domination","division","chimney","wage","bang","professional","insure","mystery","pour","hypothesis","conceive","coincidence","faithful","role","depressed","oak","survival","minor","nightmare","sex","technology","inch","norm","anniversary","boot","radical","urine","recession","limited","rescue","disclose","innovation","classify","rank","lonely","outlook","threshold","bundle","dentist","goalkeeper","radio","partnership","temple","still","infection","pump","ignite","dream","pillow","simplicity","remedy","river","organisation","ancestor","ice cream","extension","advantage","abuse","oppose","negative","skate","assembly","site","tank","partner","quantity","scrape","nut","exit","card","explode","helmet","tenant","trend","picture","herb","rifle","base","predict","investigation","fix","scenario","prescription","prisoner","sphere"]

// Time of the level
let currentLevel;

// Easy level
document.getElementById("easy").addEventListener("click", ()=>{
    // Hid the buttons for level selection and show the game window.
    gameWindow.style.display = "block";
    buttons.style.display = "none";

    currentLevel = levels.easy;
    seconds.innerHTML = currentLevel;
    time = currentLevel;
    init();
})

// Medium level
document.getElementById("medium").addEventListener("click", ()=>{
    // Hid the buttons for level selection and show the game window.
    gameWindow.style.display = "block";
    buttons.style.display = "none";

    currentLevel = levels.medium;
    seconds.innerHTML = currentLevel;
    time = currentLevel;
    init();
})
// Hard level
document.getElementById("hard").addEventListener("click", ()=>{
    // Hid the buttons for level selection and show the game window.
    gameWindow.style.display = "block";
    buttons.style.display = "none";

    currentLevel = levels.hard;
    seconds.innerHTML = currentLevel;
    time = currentLevel;
    init();
})

// Levels
const levels = {
    easy: 8,
    medium: 5,
    hard: 2
}

// Game data
let time = currentLevel;
let score = 0;
let isPlaying;
let getReadyTimer = 5;

// Initialize
function init(){
    // Disable the input field so the user cant start typing before the game started.
    wordInput.disabled = true;
    
    // Display the word that needs to be matched.
    showWord(words)

    // Display the timer
    timerDisplay.innerHTML = time;

    // Display the starting score (0)
    scoreDisplay.innerHTML = score;

    // Pre-countdowns from 5 to 0 so the player can get prepared.
    getReady.innerHTML = getReadyTimer;

    // Display elements.
    getReadyContainer.style.display = "block";
    intro.style.display = "block";

    // Get ready countdown.
    setInterval(()=>{
        getReady.classList.add("active");
        if(getReadyTimer > 0){
            getReadyTimer--;
            getReady.innerHTML = getReadyTimer;
        }
    }, 1000)

    // Starts the countdown.
    setTimeout(() => {
        // Hid the get ready text.
        getReadyContainer.style.display = "none";
        // Reset the get ready timer to 5.
        getReadyTimer = 5;
        // Start the game.
        start();
    }, 6000);
}
function start(){
    // Enable the input field so the user can start typing.
    wordInput.disabled = false;
    // Autofocus on the input field.
    wordInput.focus();
    // Countdown
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
    // Start the game on input.
    wordInput.addEventListener("input", startGame)
}

// Show random words that need to be matched from the length of the words array.
function showWord(words){
    displayedWord.innerHTML = words[Math.floor(Math.random() * words.length)];
};

function countdown(){
    // If the time is more than 0, decrement.
    if ( time > 0) {
        time--;
    } else if ( time === 0) {
        message.style.color = "#e1302a";
        message.innerHTML = "GAME OVER !"
        isPlaying = false;
    }
    // Display the timer.
    timerDisplay.innerHTML = time;
};

function startGame(){
    // If the word is matched.
    if( wordMatch() ) {
        isPlaying = true;
        showWord(words);
        // Reset the timer. (plus 1 second to implement the time it takes for reload)
        time = currentLevel + 1;
        // Clear the input field
        wordInput.value = "";
        // Increase the score by 1
        score++;
    }
    scoreDisplay.innerHTML = score;
};

function wordMatch(){
    // Check if the typed word is matching the displayed word.
    if ( wordInput.value === displayedWord.innerHTML) {
        message.innerHTML = "Correct !"
        return true;
    } else {
        message.innerHTML = " ";
        return false;
    }
};

// Check the status of the game (if the user is actually playing or not)
function checkStatus(){
    if( !isPlaying && time === 0) {
        // Display message that game is over and disable input field
        message.style.color = "#e1302a";
        message.innerHTML = "GAME OVER !";
        wordInput.disabled = true;

        // After 1 second launch game over function.
        setTimeout(() => {
            gameOver();
        }, 1000);
    }
};

function gameOver(){
    // Hide game.
    gameWindow.style.display = "none";
    displayedWord.style.display = "none";
    intro.style.display = "none";

    // Store the highscore in local storage IF its bigger than the score achieved during last game.
    let highscore = localStorage.getItem("highscore");
    if( score > highscore) {
        localStorage.setItem("highscore", score);
        document.getElementById("highscore").innerHTML = highscore;        
    }

    // Display game over menu.
    document.querySelector(".gameOver").style.display = "block";
    
    // Delete highscore.
    document.getElementById("deleteHighscore").addEventListener("click", ()=>{
        // Remove the local storage item for highscore.
        localStorage.removeItem("highscore");
        // Display the change
        highscore = 0
        document.getElementById("highscore").innerHTML = highscore;        
    })
    
    // Display current score.
    document.getElementById("yourScore").innerHTML = score;
    // Display the highscore if it has not changed during last game.
    document.getElementById("highscore").innerHTML = highscore;
    // Display play again button.
    document.getElementById("again").addEventListener("click", ()=>{
        location.reload();
    })
}

// Info button
document.getElementById("infoButton").addEventListener("click", ()=>{
    const infoBox = document.querySelector(".infoBox");
    infoBox.classList.toggle("infoBoxActive");
})