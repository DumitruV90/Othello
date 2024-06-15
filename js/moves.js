/* Checking if a cell is valid for placing a token of any given color or not.
is the cell empty and adjacent to at least one token of a different color? if so, flip at least one token of the opposite color in any direction 
(horizontal, vertical or diagonal) */
function isValid(x, cell) {
  // A cell is empty?
  if (cell.textContent !== "") return false;

  // Get opposite color
  let oppositeColor = currentPlayer === black ? white : black;

  // Get row and column index from cell id
  let index = parseInt(cell.id.split("-")[1]);
  let row = Math.floor(index / x);
  let col = index % x;
  
  // Define directions as arrays of row and column offsets
  let directions = [
    [-1, -1], // up-left
    [0, -1], // up
    [1, -1], // up-right
    [-1, 0], // left
    [1, 0], // right
    [-1, 1], // down-left 
    [0, 1], // down
    [1, 1], // down-right
  ];

  // Check each direction for possible flips
  for (let i = 0; i < directions.length; i++) {
    let direction = directions[i];
    let dr = direction[0]; // row offset
    let dc = direction[1]; // column offset
    let r = row + dr; // next row
    let c = col + dc; // next column
    let flipped = false;
    
    while (r >= 0 && r < x && c >= 0 && c < x) {
      const nextCellId = `cell-${r * x + c}`;
      const nextCellContent = document.getElementById(nextCellId).textContent;
      
      if (nextCellContent === oppositeColor) {
        flipped = true;
        r += dr;
        c += dc;
      } else if (nextCellContent === currentPlayer && flipped) {
        return true;
      } else {
        break;
      }
    }
  }
  // If no valid cell is found in any direction, return false
  return false;
}

/* Place a token of a given color on a given cell and flip all tokens of the opposite color in any direction. 
Set the textContent property of the HTML element to the color value, and use nested loops to flip all
directions from a given cell. */
function place(x, cell, color) {
  // Set cell's content to color
  cell.textContent = color;

  // Set the cell's background to the color property
  if (color === "B") {
    cell.style.backgroundColor = "black";
  } else {
    cell.style.backgroundColor = "white";
    cell.style.color = "white";
  }

  // Get opposite color
  let oppositeColor = color === black ? white : black;

  // Get row and column index from cell id
  let index = parseInt(cell.id.split("-")[1]);
  let row = Math.floor(index / x);
  let col = index % x;
  
  // Define directions as arrays of row and column offsets
  let directions = [
    [-1, -1], // up-left
    [0, -1], // up
    [1, -1], // up-right
    [-1, 0], // left
    [1, 0], // right
    [-1, 1], // down-left 
    [0, 1], // down
    [1, 1], // down-right
  ];

  /* Flip each direction if possible. Is the next cell the opposite color?, 
  if so, keep moving in that direction until you find a cell of the same color or an empty cell. 
  Flip all the cells in between. An empty cell or reaching the edge of the board 
  means you have to stop an move to the next direction. */
  for (let i = 0; i < directions.length; i++) {
    let direction = directions[i];
    let dr = direction[0]; // row offset
    let dc = direction[1]; // column offset
    let r = row + dr; // next row
    let c = col + dc; // next column
    let flipped = []; // array to store flipped cells
    
    while (r >= 0 && r < x && c >= 0 && c < x) {
      const nextCellId = `cell-${r * x + c}`;
      const nextCellContent = document.getElementById(nextCellId).textContent;

      if (nextCellContent === oppositeColor) {
        flipped.push(nextCellId); // add cell id to flipped array
        r += dr;
        c += dc;
      } else if (nextCellContent === color && flipped.length > 0) {
        // flip all cells in flipped array
        for (let id of flipped) {
          let square = document.getElementById(id);
          square.textContent = color;
        
          // Set the cell's background and text to the color property
          square.style.backgroundColor = color === "B" ? "black" : "white";
          square.style.color = color === "B" ? "black" : "white";
        }
        break;
      } else {
        break;
      }
    }
  }
}
