var maxnum;
var numchoice;
var buttonset;
var buttonguess;
var feedback;
var numrange;
var numguess;
var low = 0;
var limit = 100;
var secretnum;
var numguesses = 0;

window.onload = function() {
    // Get DOM elements and set up listeners
    maxnum = document.querySelector("#maxnum");
    maxnum.addEventListener("input", checkNum);
    maxnum.addEventListener("keyup", checkMaxKey);
    buttonset = document.querySelector("#set");
    buttonset.addEventListener("click", setLimit);
    numchoice = document.querySelector("#numchoice");
    numchoice.addEventListener("keyup", checkChoiceKey);
    buttonguess = document.querySelector("#guess");
    buttonguess.addEventListener("click", processGuess);
    feedback = document.querySelector("#feedback");
    numrange = document.querySelector("#numrange");
    numguess = document.querySelector("#numguess");
}

function checkNum() {
    // Show visual validation on input
    if (maxnum.value >= 10 && maxnum.value <= 1000) {
        maxnum.style.backgroundColor = "lightgreen";
    } else {
        maxnum.style.backgroundColor = "pink";
    }
}

function setLimit() {
    // Enable guessing and reset values if limit is valid.
    if (maxnum.value >= 10 && maxnum.value <= 1000) {
        disableGuess(false);
        low = 0;
        limit = maxnum.value;
        resetGuess();
        secretnum = Math.round(Math.random() * limit);
        numguesses = 0;
        numguess.innerHTML = numguesses;
        feedback.innerHTML = "";
    } else {
        disableGuess(true);
    }
}

function processGuess() {
    numguesses += 1;
    // Check guess and set limits as needed
    if (Number(numchoice.value) < low || Number(numchoice.value) > limit) {
        feedback.innerHTML = "Not in current range!";
        // Not in range does not count as a guess
        numguesses -= 1;
        resetGuess();
    } else if (numchoice.value == secretnum) {
        feedback.innerHTML = "You Got It!";
        // When guessed disable guessing and give focus to limit input
        disableGuess(true);
        maxnum.focus();
    } else if (numchoice.value > secretnum) {
        feedback.innerHTML = "Lower!";
        limit = Number(numchoice.value) - 1;
        resetGuess();
    } else {
        feedback.innerHTML = "Higher!";
        low = Number(numchoice.value) + 1;
        resetGuess();
    }
    numguess.innerHTML = numguesses;
}

function disableGuess(bool) {
    numchoice.disabled = bool;
    buttonguess.disabled = bool;
}

function resetGuess() {
    // Set limits, clear guess and return focus to guess input
    numrange.innerHTML = String(low) + " to " + limit;
    numchoice.min = low;
    numchoice.max = limit;
    numchoice.value = "";
    numchoice.focus();
}

// These two functions allow pressing enter to submit value in inputs
function checkMaxKey(event) {
    if (event.keyCode === 13) {
        buttonset.click();
    }
}

function checkChoiceKey(event) {
    if (event.keyCode === 13) {
        buttonguess.click();
    }
}