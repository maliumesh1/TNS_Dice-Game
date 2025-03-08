// Variables to keep track of player scores and turns
let currentPlayer = 1;
let scores = [0, 0, 0, 0]; // Scores for 4 players

const currentPlayerElement = document.getElementById("currentPlayer");

// Function to roll a dice
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to update UI and switch to the next player
function updateGame(player, diceRoll) {
  const diceElement = document.getElementById(`dice${player}`);
  const scoreElement = document.getElementById(`score${player}`);

  // Update dice display
  diceElement.textContent = diceRoll;

  // Update player's score
  scores[player - 1] += diceRoll;
  scoreElement.textContent = scores[player - 1];

  // Send the updated score to the backend
  updateBackendScores();

  // Switch to the next player
  currentPlayer = currentPlayer === 4 ? 1 : currentPlayer + 1;
  currentPlayerElement.textContent = `Current Player: Player ${currentPlayer}`;
}

// Roll buttons event listeners
document.getElementById("rollPlayer1").addEventListener("click", () => {
  if (currentPlayer === 1) {
    const diceRoll = rollDice();
    updateGame(1, diceRoll);
  }
});

document.getElementById("rollPlayer2").addEventListener("click", () => {
  if (currentPlayer === 2) {
    const diceRoll = rollDice();
    updateGame(2, diceRoll);
  }
});

document.getElementById("rollPlayer3").addEventListener("click", () => {
  if (currentPlayer === 3) {
    const diceRoll = rollDice();
    updateGame(3, diceRoll);
  }
});

document.getElementById("rollPlayer4").addEventListener("click", () => {
  if (currentPlayer === 4) {
    const diceRoll = rollDice();
    updateGame(4, diceRoll);
  }
});

// Reset game
document.getElementById("newGame").addEventListener("click", () => {
  scores = [0, 0, 0, 0];
  ["dice1", "dice2", "dice3", "dice4"].forEach(id => {
    document.getElementById(id).textContent = "";
  });
  ["score1", "score2", "score3", "score4"].forEach(id => {
    document.getElementById(id).textContent = "0";
  });

  currentPlayer = 1;
  currentPlayerElement.textContent = "Current Player: Player 1";
});

// Backend API Call to update scores
function updateBackendScores() {
  fetch('/api/update-scores', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ scores }),
  });
}
