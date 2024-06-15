const board = document.getElementById("board"),
  elements = document.querySelectorAll(".btn-size"),
  gameOptions = document.getElementById("game-options"),
  playSection = document.getElementById("play"),
  retryBtn = document.getElementById("btn-retry");

// Player color variables
const black = "B";
const white = "W";

// Variable for the current player
let currentPlayer = black;

// Getting x to calculate the number of rows and columns
elements.forEach((element) => {
  element.addEventListener("click", (event) => {
    // The board will be drawn based on the first two characters of each button textContent
    let gettingX = parseInt(event.target.textContent.substring(0, 2));
    drawingBoard(gettingX); 
  });
});

// Drawing the board according to the players' preference
function drawingBoard(x) {
  // Calculate the total number of cells based on the board size
  let totalCells = x * x;
  // Create an array with the desired number of cells
  const cells = Array.from({ length: totalCells }, () => 0);

  // Set the board width and height based on the board size
  board.style.width = `${x * 50}px`;
  board.style.height = `${x * 50}px`;

  // Set the grid template according to x value
  board.style.gridTemplateColumns = `repeat(${x}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${x}, 1fr)`;
  
  // Clear the board before appending the new cells
  board.innerHTML = "";
  // // Iterating and creating divs with id and classes
  cells.map((_, index) => {
    const item = document.createElement("div");
    item.id = `cell-${index}`;
    item.className = "cell";
    item.textContent = "";
    board.appendChild(item);
    return item;
  });
  
  const cellsClass = document.querySelectorAll(".cell")

  // Once the player selects the board size the play section is activated
  gameOptions.style.display = "none";
  playSection.style.display = "flex";

  // Add click listeners to all cells and update the game status
  addClickListener(x, cellsClass);
  updateScore(cellsClass);
  updateMessage(x, cellsClass);
}

// Switch the color of the current player to the opposite color
function switchPlayer() {
  currentPlayer = currentPlayer === black ? white : black;
  return currentPlayer;
}

/* Add an event listener to each cell in the board to handle the click event. If the clicked cell is valid for 
placing a token of the current player color, place a token on that cell, switch the player color and update any other UI
elements such as score and message. */

function addClickListener(x, classes) {
  classes.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (isValid(x, cell)) {
        place(x, cell, currentPlayer);
        switchPlayer();
        updateScore(classes);
        updateMessage(x, classes);
      }
    });
  });

  // Place four tokens in the center of each board
  switch (x) {
    case 6:
      place(6, document.getElementById("cell-14"), white);
      place(6, document.getElementById("cell-15"), black);
      place(6, document.getElementById("cell-20"), black);
      place(6, document.getElementById("cell-21"), white);
      break;
    case 8:
      place(8, document.getElementById("cell-27"), white);
      place(8, document.getElementById("cell-28"), black);
      place(8, document.getElementById("cell-35"), black);
      place(8, document.getElementById("cell-36"), white);
      break;
    case 10:
      place(8, document.getElementById("cell-44"), white);
      place(8, document.getElementById("cell-45"), black);
      place(8, document.getElementById("cell-54"), black);
      place(8, document.getElementById("cell-55"), white);
    default:
      break;
  }
}

// Play again button
retryBtn.addEventListener("click", () => {
  playSection.style.display = "none";
  gameOptions.style.display = "flex";
});
