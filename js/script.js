// Global variables for tracking statistics
let playerName = '';
let keepPlaying = true;
let totalGames = 0;
let totalWins = 0;

// Welcome message and ask for player name once
function startSession() {
  if (!playerName) {
    playerName = prompt("Welcome to the Arcade! Please enter your name:");
    if (!playerName) {
      alert("Invalid input. Please enter your name.");
      return startSession();
    }
    alert(`Hello, ${playerName}! Let's start playing!`);
  }
}

// Guessing Game (Declaration Function)
function guessingGame() {
  startSession();
  while (keepPlaying) {
    totalGames++;
    const numberToGuess = Math.floor(Math.random() * 10) + 1;
    const guess = prompt(`${playerName}, guess a number between 1 and 10:`);

    if (parseInt(guess) === numberToGuess) {
      alert("Correct! You guessed the number!");
      totalWins++;
    } else {
      alert(`Wrong! The correct number was ${numberToGuess}.`);
    }

    keepPlaying = confirm(`${playerName}, would you like to keep playing this game?`);
  }
  endSession();
}

// Consult the Oracle (Expression Function)
const consultOracle = function () {
  startSession();
  while (keepPlaying) {
    totalGames++;
    const question = prompt(`${playerName}, ask the Oracle your question:`);
    const responses = ["Yes", "No", "Maybe", "Definitely", "I cannot say."];
    const answer = responses[Math.floor(Math.random() * responses.length)];
    alert(`The Oracle says: "${answer}"`);

    keepPlaying = confirm(`${playerName}, would you like to keep playing this game?`);
  }
  endSession();
};

// Bear, Ninja, Hunter (Arrow Function)
const bnh = () => {
  startSession();
  while (keepPlaying) {
    totalGames++;
    const choices = ["Bear", "Ninja", "Hunter"];
    const playerChoice = prompt(`${playerName}, choose Bear, Ninja, or Hunter:`).toLowerCase();
    const computerChoice = choices[Math.floor(Math.random() * choices.length)].toLowerCase();

    if (!choices.map(c => c.toLowerCase()).includes(playerChoice)) {
      alert("Invalid input. Please choose Bear, Ninja, or Hunter.");
      continue;
    }

    if (playerChoice === computerChoice) {
      alert(`It's a tie! You both chose ${computerChoice}.`);
    } else if (
      (playerChoice === "bear" && computerChoice === "hunter") ||
      (playerChoice === "ninja" && computerChoice === "bear") ||
      (playerChoice === "hunter" && computerChoice === "ninja")
    ) {
      alert(`You lose! ${computerChoice} beats ${playerChoice}.`);
    } else {
      alert(`You win! ${playerChoice} beats ${computerChoice}.`);
      totalWins++;
    }

    keepPlaying = confirm(`${playerName}, would you like to keep playing this game?`);
  }
  endSession();
};

// End session and display statistics
function endSession() {
  const playAnother = confirm(`${playerName}, would you like to pick another game to play?`);
  if (!playAnother) {
    document.getElementById("farewell").style.display = "block";

    const winPercentage = ((totalWins / totalGames) * 100).toFixed(2);

    document.getElementById("totalGames").textContent = totalGames;
    document.getElementById("totalWins").textContent = totalWins;
    document.getElementById("winPercentage").textContent = `${winPercentage}%`;
  } else {
    keepPlaying = true;
  }
}
