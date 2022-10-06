var gameRunning = false; // On / Off switch
var playerName = null; // Players name
var playerGuess = null; // Players guess
var numberOfGuesses = 0; // Guess counter
var recordGuess = 0;  // Record low
var attemptsArray = []; // History of guesses
var playerHistory = []; // History of players

var playerName = prompt("Hello, What's your name? Is it?", "Jordan");
var playYesOrNo = prompt("Do you want to play a game? Yes or No");

function play(){
    //randomize numbers each play through
    var currentNumber = Math.floor(Math.random() * 100);
    //turns game on
    gameRunning = true;
    //reset number of guesses
    numberOfGuesses = 0;
    attemptsArray = [];

    while (gameRunning) {
        //gets guesses and increments amount of guesses
        playerGuess = Number(prompt("Guess a number from 0 - 100"));
        numberOfGuesses++;

        //checks if number is correct
        if (playerGuess > 100 || playerGuess < 0){
            alert("I said from 0 to 10")
        } else if (playerGuess === currentNumber){
            gameRunning = false;
        } else if (playerGuess > currentNumber){
            alert("Lower")
            attemptsArray.push(playerGuess);
        } else if (playerGuess < currentNumber){
            alert("Higher")
            attemptsArray.push(playerGuess);
        } else {
                alert("That's not what I asked")}
    }
    playerStorage(playerName, numberOfGuesses, currentNumber);
}
function playAgain(){
    
    var response;
    response = confirm("Do you want to keep playing?");

    if (response) {

        if(confirm("Do you want to change player?") == true){
            playerName = prompt("Who's playing now?");
            if(playerName === undefined){
                gameOutro();
            }
            play();
        } else {
            play();
        }
    }
    if (response === false){
            gameOutro();
        }
}
function playerStorage(currentNameOfPlayer, currentNumOfGuesses, goalNumber){  
    var playerSearch = playerHistory.findIndex(x => x.name === currentNameOfPlayer);   
    // New Players
    if(playerSearch === -1) {
        playerHistory.push({name: currentNameOfPlayer, record: currentNumOfGuesses})
        alert("Wow! " + currentNameOfPlayer + " you set a new record with " + currentNumOfGuesses + "\n these were your guesses " + attemptsArray + "," + goalNumber);
            return playAgain();
    }
    // Existing players
    if (playerHistory[playerSearch].name === currentNameOfPlayer){
        // players that beat record
        if (playerHistory[playerSearch].name === currentNameOfPlayer && playerHistory[playerSearch].record > currentNumOfGuesses){
            alert("Wow! " + currentNameOfPlayer + " you scored " + currentNumOfGuesses + " and beat your old record of " + playerHistory[playerSearch].record +"\n these were your guesses\n" + attemptsArray + "," + goalNumber)
            playerHistory[playerSearch].record = currentNumOfGuesses;
            return playAgain();
        // players that didnt beat record    
        } else {
            alert("It took you " + currentNumOfGuesses + " guesses your best score is " + playerHistory[playerSearch].record + "\n these were your guesses\n" + attemptsArray + "," + goalNumber);
            return playAgain();
        }
    }
}
function gameIntro(){
    if ( playYesOrNo.toLowerCase() === "yes" ) {
        play();
    } else {
        gameOutro();
    }
}
function gameOutro(){
    alert("Thank you for playing");
}
//Start Game
gameIntro();
