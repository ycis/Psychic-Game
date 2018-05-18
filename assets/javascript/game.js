var strArr = ["Wins: ", "Losses: ","Guesses Left: ", "Your Guesses so far: "];
var pArr = [$("#winsDiv"),$("#lossesDiv"),$("#cntDiv"),$("#soFarDiv")];

// status W, L, Remaining, So Far String, Gane Over, Player Wins
var statusArr = [0, 0, 9, "", false, false];
var playerGuess = "";
var myLetter = "";

function resetGame() {
    myLetter = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
    if (statusArr[4]) {
        // console.log("My letter was: " + myLetter + "|You got it: " + statusArr[5]);
        if (statusArr[5]) {
            statusArr[0] = statusArr[0] + 1;
        } else {
            statusArr[1] = statusArr[1] + 1;
        };
        statusArr[2] = 9;
        statusArr[3] = "";
        statusArr[4] = false;
        statusArr[5] = false;
    }
}

function updateResults () {
    if (statusArr[4]) {
        resetGame();
        updateResults();
    } else {
        for (var i = 0; i < 4; i++) {
            pArr[i].html(strArr[i] + statusArr[i]);
        };
    };
};

document.onkeyup = function(event) {
    playerGuess = event.key.toLowerCase();
    if (playerGuess.charCodeAt(0) < 97 || playerGuess.charCodeAt(0) > 122) {
        // invalid key pressed, do nothing or alert
        // alert("You pressed an invalid key. Please only select a lettter between 'a' and 'z'");
    } else {
        // test if the letter has already been guessed
        if (statusArr[3].includes(playerGuess)) {
            // already guessed, do nothing or alert
            // alert(playerGuess + " was already guessed, please try again.");
            return;
        };
        
        if (playerGuess == myLetter) {
            statusArr[4] = true;
            statusArr[5] = true;
        } else if (statusArr[2] == 1) {
            statusArr[4] = true;
        } else {
            var soFarStr = statusArr[3];

            statusArr[2] = statusArr[2] - 1;

            if (soFarStr != "") {soFarStr = soFarStr + ", "};
            statusArr[3] = soFarStr + playerGuess;
        };
        updateResults();
    };
};