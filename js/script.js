// Global variables to track session statistics
let playerName = '';
let totalGames = 0;
let totalWins = 0;
let keepPlaying = true;

// Welcome message and ask for player name once
function startSession() {
  if (!playerName) {
    playerName = prompt("Welcome to Arcade 3! Please enter your name:");
    if (!playerName) {
      alert("Invalid input. Please enter your name.");
      return startSession();
    }
    alert(`Hello, ${playerName}! Let's start playing!`);
  }
}

// Badge determination using switch
function determineBadge(winPercentage) {
  let badge;
  switch (true) {
    case winPercentage <= 25:
      badge = "Stone";
      break;
    case winPercentage <= 50:
      badge = "Bronze";
      break;
    case winPercentage <= 75:
      badge = "Iron";
      break;
    case winPercentage <= 100:
      badge = "Silicon";
      break;
  }
  return badge;
}

// Display session statistics
function displaySessionSummary() {
  const winPercentage = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;
  const badge = determineBadge(winPercentage);
  
  document.getElementById("stats").innerHTML = `
    <tr>
      <td>${totalGames}</td>
      <td>${totalWins}</td>
      <td>${winPercentage}%</td>
      <td>${badge}</td>
    </tr>
  `;
  document.getElementById("farewell").style.display = "block";
}

// Guessing Game
function guessingGame() {
  startSession();
  while (keepPlaying) {
    totalGames++;
    const numberToGuess = Math.floor(Math.random() * 10) + 1;
    const guess = prompt(`${playerName}, guess a number between 1 and 10:`);

    if (parseInt(guess) === numberToGuess) {
      totalWins++;
      alert("Correct! You guessed the number!");
    } else {
      alert(`Wrong! The correct number was ${numberToGuess}.`);
    }

    keepPlaying = confirm(`${playerName}, would you like to keep playing this game?`);
  }
  endSession();
}

// Consult the Oracle
const consultOracle = function () {
  startSession();
  while (keepPlaying) {
    totalGames++;
    const question = prompt(`${playerName}, ask the Oracle your question:`);
    const responses = ["Yes", "No", "Maybe", "Definitely", "I cannot say."];
    const answer = responses[Math.floor(Math.random() * responses.length)];
    alert(`The Oracle says: "${answer}"`);

    const win = confirm("Did the Oracle's answer satisfy you?");
    if (win) totalWins++;

    keepPlaying = confirm(`${playerName}, would you like to keep playing this game?`);
  }
  endSession();
};

// Bear, Ninja, Hunter
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
      totalWins++;
      alert(`You win! ${playerChoice} beats ${computerChoice}.`);
    }

    keepPlaying = confirm(`${playerName}, would you like to keep playing this game?`);
  }
  endSession();
};

// End session
function endSession() {
  const playAnother = confirm(`${playerName}, would you like to pick another game to play?`);
  if (!playAnother) {
    displaySessionSummary();
  } else {
    keepPlaying = true;
  }
}
