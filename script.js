// TicTacToeGame module
const TicTacToeGame = (() => {
  let currentPlayer = "X";
  const gameState = createGameState();
  const boards = document.querySelectorAll(".board");
  function initialize() {
    boards.forEach((board, level) => {
      for (let i = 0; i < 16; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
      }
      board.addEventListener("click", (e) => {
        const cell = e.target;
        const index = Array.from(board.children).indexOf(cell);
        if (cell.classList.contains("cell") && !cell.textContent) {
          handleCellClick(cell, level, index);
        }
      });
    });

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGame);
  }

  function createGameState() {
    let levels = [];
    for (let i = 0; i < 3; i++) {
      levels.push(new Array(16).fill(null));
    }
    return { levels };
  }

  function handleCellClick(cell, level, index) {
    cell.textContent = currentPlayer;
    gameState.levels[level][index] = currentPlayer;
    if (checkWin(gameState) || isGameOver(gameState)) {
      endGame();
    } else {
      switchPlayer();
    }
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
      if (
        board[0] === board[5] &&
        board[5] === board[11] &&
        board[11] === board[15] &&
        board[0] != null
      ) {
        return true;
      }
      if (
        board[3] === board[6] &&
        board[6] === board[9] &&
        board[9] === board[12] &&
        board[3] != null
      ) {
        return true;
      }
    }
    return false;
  }

  function isGameOver(gameState) {
    const allCellsFilled = gameState.levels.every((level) =>
      level.every((cell) => cell !== null)
    );

    return allCellsFilled || checkWin(gameState);
  }

  function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }

  function endGame() {
    // Implement end game logic
    alert(`Game Over! Player ${currentPlayer} wins!`);
    // Add any additional end game handling here
  }

  function resetGame() {
    window.location.href = "difficultyScreen.html";
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

  function evaluateBoard(gameState) {
    return 0;
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

  return {
    initialize,
  };
})();

document.addEventListener("DOMContentLoaded", TicTacToeGame.initialize);
