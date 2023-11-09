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
    for (let i = 0; i < 4; i++) {
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
    // Check all levels (2D boards) for wins
    for (let level = 0; level < 4; level++) {
      if (checkLevelWin(gameState.levels[level])) return true;
    }

    // Check verticals and diagonals that span levels
    return checkVerticalsAndDiagonals(gameState);
  }

  function checkLevelWin(board) {
    // Check rows and columns
    for (let i = 0; i < 4; i++) {
      if (
        checkLine(
          board[i * 4],
          board[i * 4 + 1],
          board[i * 4 + 2],
          board[i * 4 + 3]
        )
      )
        return true;
      if (checkLine(board[i], board[i + 4], board[i + 8], board[i + 12]))
        return true;
    }
    // Check diagonals within level
    if (checkLine(board[0], board[5], board[10], board[15])) return true;
    if (checkLine(board[3], board[6], board[9], board[12])) return true;

    return false;
  }

  function checkVerticalsAndDiagonals(gameState) {
    // Check verticals
    for (let i = 0; i < 16; i++) {
      if (
        checkLine(
          gameState.levels[0][i],
          gameState.levels[1][i],
          gameState.levels[2][i],
          gameState.levels[3][i]
        )
      ) {
        return true;
      }
    }

    // Check cube diagonals
    if (
      checkLine(
        gameState.levels[0][0],
        gameState.levels[1][1],
        gameState.levels[2][2],
        gameState.levels[3][3]
      )
    )
      return true;
    if (
      checkLine(
        gameState.levels[0][15],
        gameState.levels[1][14],
        gameState.levels[2][13],
        gameState.levels[3][12]
      )
    )
      return true;
    if (
      checkLine(
        gameState.levels[0][3],
        gameState.levels[1][2],
        gameState.levels[2][1],
        gameState.levels[3][0]
      )
    )
      return true;
    if (
      checkLine(
        gameState.levels[0][12],
        gameState.levels[1][13],
        gameState.levels[2][14],
        gameState.levels[3][15]
      )
    )
      return true;

    // Check additional cross-section diagonals
    if (
      checkLine(
        gameState.levels[0][0],
        gameState.levels[1][4],
        gameState.levels[2][8],
        gameState.levels[3][12]
      )
    )
      return true;
    if (
      checkLine(
        gameState.levels[0][3],
        gameState.levels[1][7],
        gameState.levels[2][11],
        gameState.levels[3][15]
      )
    )
      return true;
    if (
      checkLine(
        gameState.levels[0][12],
        gameState.levels[1][8],
        gameState.levels[2][4],
        gameState.levels[3][0]
      )
    )
      return true;
    if (
      checkLine(
        gameState.levels[0][15],
        gameState.levels[1][11],
        gameState.levels[2][7],
        gameState.levels[3][3]
      )
    )
      return true;

    return false;
  }

  function checkLine(a, b, c, d) {
    return a !== null && a === b && b === c && c === d;
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
