const numRows = 6;
const numCols = 7;
const player1 = "X";
const player2 = "O";
let gameIsOver = false;
let cellNumbers = 0;
const gameBoard = Array.from({ length: numRows }, () =>
  Array(numCols).fill(null)
);
let currentPlayer = player1;
const boardElement = document.getElementById("board");

document.getElementById("resetButton").addEventListener("click", () => {
  resetGame();
});

function initializeGameBoard() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      boardElement.appendChild(cell);
    }
  }
}

function resetGame() {
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      gameBoard[row][col] = null;
      const cell = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      cell.textContent = "";
      cell.classList.remove("player1", "player2");
    }
  }
  currentPlayer = player1;
  updateMessage("Player X's Turn");
  gameIsOver = false;
}

function updateMessage(message) {
  document.getElementById("message").textContent = message;
}

function checkWin(row, col) {
  const directions = [
    [1, 0],
    [0, 1],
    [1, 1],
    [1, -1],
  ];
  for (const [dx, dy] of directions) {
    let count = 1;
    for (let i = 1; i < 4; i++) {
      const nextRow = row + i * dx;
      const nextCol = col + i * dy;

      if (
        nextRow >= 0 &&
        nextRow < numRows &&
        nextCol >= 0 &&
        nextCol < numCols &&
        gameBoard[nextRow][nextCol] === currentPlayer
      ) {
        count++;
      } else {
        break;
      }
    }
    for (let i = 1; i < 4; i++) {
      const nextRow = row - i * dx;
      const nextCol = col - i * dy;

      if (
        nextRow >= 0 &&
        nextRow < numRows &&
        nextCol >= 0 &&
        nextCol < numCols &&
        gameBoard[nextRow][nextCol] === currentPlayer
      ) {
        count++;
      } else {
        break;
      }
    }

    if (count >= 4) {
      return true;
    }
  }
}

function makeMove(col) {
  if (cellNumbers == numCols * numRows) {
    updateMessage("Game Over");
    resetGame();
  }
  for (let row = numRows - 1; row >= 0; row--) {
    if (gameBoard[row][col] === null) {
      gameBoard[row][col] = currentPlayer;
      cellNumbers++;
      return row;
    }
  }
  return -1;
}

boardElement.addEventListener("click", (event) => {
  if (gameIsOver) return;
  const cell = event.target;
  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if (gameBoard[row][col] === null) {
    const nextRow = makeMove(col);
    if (nextRow !== -1) {
      const newCell = document.querySelector(
        `[data-row="${nextRow}"][data-col="${col}"]`
      );
      newCell.textContent = currentPlayer;
      newCell.classList.add(currentPlayer === player1 ? "player1" : "player2");
      if (checkWin(nextRow, col)) {
        gameIsOver = true;
        updateMessage(`Player ${currentPlayer} wins!`);
      } else {
        switchPlayer();
        updateMessage(`Player ${currentPlayer}'s Turn`);
      }
    }
  }
});

function switchPlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
}

initializeGameBoard();
