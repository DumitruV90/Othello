/* Update each player's score by counting the number of tokens of each color on the board, and use a loop to 
iterate over the array of cells and increment the score variable accordingly. Set the textContent property of some 
HTML elements that display the score.*/
function updateScore(classes) {
  let blackScore = 0;
  let whiteScore = 0;

  classes.forEach((cell) => {
    if (cell.textContent === black) blackScore++;
    if (cell.textContent === white) whiteScore++;
  });

  const blackScoreElement = document.getElementById("black-score");
  const whiteScoreElement = document.getElementById("white-score");

  blackScoreElement.textContent = `${blackScore}`;
  whiteScoreElement.textContent = `${whiteScore}`;
}

// Change the background color of each valid spot available for the current player to green
function availableSpots(classes, array) {
  const hintSpots = [];
  array.forEach((val, index) => {
    if (val) {
      hintSpots.push(`cell-${index}`);
    }
  });
  // Reset the background color of all cells
  classes.forEach((cell) => {
    if (cell.textContent === "B") {
      cell.style.backgroundColor = "black";
    } else if (cell.textContent === "W") {
      cell.style.backgroundColor = "white";
    } else {
      cell.style.backgroundColor = "#3e92cc";
    }
  });

  // Change the background color of valid cells to green
  for (let i = 0; i < hintSpots.length; i++) {
    const element = document.getElementById(hintSpots[i]);
    element.style.backgroundColor = "#40916c";
  }
}

/* Update the message that shows which player it is or if the game is over. Also check if there are
valid moves for either player, and if not, declare the winner based on the score. Set the textContent
property of some HTML elements that display the message. */

function updateMessage(x, classes) {
  // Getting score elements and their values
  const blackScore = parseInt(
    document.getElementById("black-score").textContent
  );
  const whiteScore = parseInt(
    document.getElementById("white-score").textContent
  );

  // Array to store available player's moves
  const availableMoves = [];

  // Pushing valid cells to the previous array and showing the winner
  classes.forEach((cell) => availableMoves.push(isValid(x, cell)));

  // Updating the game status
  let message = "";
  if (!availableMoves.includes(true)) {
    message =
      blackScore > whiteScore
        ? "Black wins!"
        : whiteScore > blackScore
        ? "White wins!"
        : "It's a tie!";
    availableMoves.length = 0;
    classes.forEach((cell) => {
      if (cell.textContent === "") {
        cell.textContent = "T";
        cell.style.color = "#3e92cc";
      }
    });
  } else {
    message =
      currentPlayer === black ? "Black player's turn" : "White player's turn";
  }
  // Update message element
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;

  // Call for showing hints to the players. "Where shoukd I move next?"
  availableSpots(classes, availableMoves);
}
