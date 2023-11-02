let currentPlayer = "X";
gameState = createGameState();
function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

document.addEventListener("DOMContentLoaded", function () {
  initializeGame();

  const boards = document.querySelectorAll(".board");
  boards.forEach((board, level) => {
    board.addEventListener("click", function (e) {
      const cell = e.target;
      const index = Array.from(board.children).indexOf(cell);
      if (cell.classList.contains("cell") && !cell.textContent) {
        cell.textContent = currentPlayer;
        updateGameState(gameState, level, index, currentPlayer);
        switchPlayer();
        // Additional logic for switching turns or handling the AI's turn
      }
    });
  });
});

function initializeGame() {
  const boards = document.querySelectorAll(".board");
  boards.forEach((board) => {
    for (let i = 0; i < 16; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      board.appendChild(cell);
    }
  });
}
function checkWin(gameState) {
  // Check horizontal and vertical lines in each board
  for (let level = 0; level < 3; level++) {
    let board = gameState.levels[level];
    for (let i = 0; i < 4; i++) {
      // Check rows and columns
      if (
        board[i * 4] === board[i * 4 + 1] &&
        board[i * 4 + 1] === board[i * 4 + 2] &&
        board[i * 4 + 2] === board[i * 4 + 3] &&
        board[i * 4] != null
      ) {
        return true; // Row win
      }
      if (
        board[i] === board[i + 4] &&
        board[i + 4] === board[i + 8] &&
        board[i + 8] === board[i + 12] &&
        board[i] != null
      ) {
        return true; // Column win
      }
    }
  }

  // TODO: Check vertical lines across levels, and all types of diagonals.

  return false;
}
function updateGameState(gameState, level, index, player) {
  gameState.levels[level][index] = player;

  if (checkWin(gameState)) {
    alert(`Player ${player} wins!`);
  } else if (isGameOver(gameState)) {
    alert("It's a draw!");
  }
}

function createGameState() {
  let gameState = { levels: [] };
  for (let i = 0; i < 3; i++) {
    gameState.levels.push(Array(16).fill(null));
  }
  return gameState;
}

function evaluateBoard(gameState) {
  return 0;
}

function isGameOver(gameState) {
  const allCellsFilled = gameState.levels.every((level) =>
    level.every((cell) => cell !== null)
  );

  return allCellsFilled || checkWin(gameState);
}

function getAvailableMoves(gameState) {
  let moves = [];
  gameState.levels.forEach((level, levelIndex) => {
    level.forEach((cell, cellIndex) => {
      if (cell === null) {
        moves.push({ level: levelIndex, index: cellIndex });
      }
    });
  });
  return moves;
}

function applyMove(gameState, move, player) {
  let newState = JSON.parse(JSON.stringify(gameState));
  newState.levels[move.level][move.index] = player;
  return newState;
}

function minimax(gameState, depth, alpha, beta, isMaximizingPlayer) {
  if (depth === 0 || isGameOver(gameState)) {
    return evaluateBoard(gameState);
  }

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    for (let move of getAvailableMoves(gameState)) {
      const evaluation = minimax(
        applyMove(gameState, move, "AI"),
        depth - 1,
        alpha,
        beta,
        false
      );
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of getAvailableMoves(gameState)) {
      const evaluation = minimax(
        applyMove(gameState, move, "Player"),
        depth - 1,
        alpha,
        beta,
        true
      );
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) {
        break;
      }
    }
    return minEval;
  }
}
