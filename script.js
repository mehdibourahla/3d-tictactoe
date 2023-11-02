document.addEventListener("DOMContentLoaded", function () {
  initializeGame();

  const boards = document.querySelectorAll(".board");
  boards.forEach((board) => {
    board.addEventListener("click", function (e) {
      const cell = e.target;
      if (cell.classList.contains("cell") && !cell.textContent) {
        cell.textContent = "X";
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
  return false;
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
