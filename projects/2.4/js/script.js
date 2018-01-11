let wordList = ["gloomy", "skull", "reaper", "bones", "skeleton", "dark",
    "dusky", "black", "sepulchral", "desolate", "graveyard", "tombstone",
    "grim", "shadowy", "dreary", "cranium", "scalp", "cenotaph", "death",
    "terminate", "demise", "extinction", "necrosis", "tomb", "coffin"];
let messageList = ["Good work but Death is Inevitable!",
    "I will have your Soul. It's a matter of time.",
    "You think you're good? I'm better!", "You can not escape death!"];
let startGameBtn, scoreText, levelText, score, level;
let gameStarted = false, currentWordDiv, timerDiv, inputArea, messageArea;
let timeUp = false, currentTime, currentWord, completedWords;

window.onload = init;

function init() {
    startGameBtn = document.querySelector("#startGameBtn");
    startGameBtn.addEventListener("click", startGame);
    gameArea = document.querySelector("#gameArea");
}

function startGame() {
    if (!gameStarted) {
        clearSplash();
        drawMain();
        gameStarted = true;
    }
    startGameBtn.style.visibility = "hidden";
    score = 0;
    setScoreText();
    level = 1;
    setLevelText();
    completedWords = 0;
    currentTime = 10;
    messageArea.innerHTML = "";
    inputArea.value = "";
    newWord();
}

function clearSplash() {
    document.querySelector("h2").remove();
    document.querySelectorAll(".skull").forEach(e => e.remove());
    startGameBtn.removeEventListener("click", startGame);
    startGameBtn.remove();
}

function drawMain() {
    let title = document.createElement("h2");
    title.innerHTML = "Type The Following Words Or Die";
    gameArea.appendChild(title);
    scoreText = document.createElement("div");
    scoreText.id = "scoreText";
    gameArea.appendChild(scoreText);
    levelText = document.createElement("div");
    levelText.id = "levelText";
    gameArea.appendChild(levelText);
    timerDiv = document.createElement("div");
    timerDiv.id = "timerDiv";
    timerDiv.addEventListener("animationend", endGame);
    gameArea.appendChild(timerDiv);
    currentWordDiv = document.createElement("div");
    currentWordDiv.id = "currentWordDiv";
    currentWordDiv.innerHTML = "placeholder";
    gameArea.appendChild(currentWordDiv);
    inputArea = document.createElement("input");
    inputArea.id = "inputArea";
    inputArea.addEventListener("input", checkWord);
    gameArea.appendChild(inputArea);
    messageArea = document.createElement("p");
    messageArea.id = "messageArea";
    gameArea.appendChild(messageArea);
    startGameBtn = document.createElement("button");
    startGameBtn.id = "startGameBtn";
    startGameBtn.innerHTML = "Click If You Dare";
    gameArea.appendChild(startGameBtn);
}

function newWord() {
    resetAnimation();
    timerDiv.style.animationDuration = String(currentTime) + "s";
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    currentWordDiv.innerHTML = currentWord;
    inputArea.focus();
}

function checkWord() {
    if (inputArea.value == currentWord) {
        score += 5 * currentWord.length * level;
        setScoreText();
        completedWords++;
        if (completedWords % 5 == 0) {
            level++;
            setLevelText();
            if (currentTime > 0.3) {
                currentTime-=0.3;
            }
        }
        inputArea.value = "";
        messageArea.innerHTML = messageList[Math.floor(Math.random() * messageList.length)];
        newWord();
    }
}

function setScoreText() {
    scoreText.innerHTML = "Score: " + score;
}

function setLevelText() {
    levelText.innerHTML = "Level: " + level;
}

function endGame() {
    messageArea.innerHTML = "Time's up! You're DEAD!";
    startGameBtn.style.visibility = "visible";
    startGameBtn.addEventListener("click", startGame);
}

function resetAnimation() {
    timerDiv.style.animation = "none";
    timerDiv.offsetHeight;
    timerDiv.style.animation = null;
}