// TicTacToeGame module
const TicTacToeGame = (() => {
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
        const move = { level, index };
        if (cell.classList.contains("cell") && !cell.textContent) {
          handleCellClick(move);
        }
      });
    });

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGame);
  }

  function createGameState() {
    let currentPlayer = "X";
    const gameDepth = getDifficulty();
    let levels = [];
    for (let i = 0; i < 4; i++) {
      levels.push(new Array(16).fill(null));
    }
    return { levels, gameDepth, currentPlayer };
  }

  function handleCellClick(move) {
    applyMove(move);
    AIMove();
  }

  function AIMove() {
    let bestScore = -Infinity;
    let bestMove = null;

    getAvailableMoves().forEach((move) => {
      // Apply a hypothetical move
      gameState.levels[move.level][move.index] = "O";
      let score = minimax(
        gameState,
        gameState.gameDepth,
        -Infinity,
        Infinity,
        true
      );

      // Undo the hypothetical move
      gameState.levels[move.level][move.index] = null;

      // Update bestScore and bestMove based on the score
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    });

    // Apply the best move
    if (bestMove != null) {
      // console.log("The best move is: ", bestMove);
      applyMove(bestMove);
    }
  }

  function minimax(gameState, depth, alpha, beta, isMaximizingPlayer) {
    if (depth === 0 || isGameOver()) {
      return evaluateBoard(gameState);
    }

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      getAvailableMoves().forEach((move) => {
        gameState.levels[move.level][move.index] = "O"; // Assuming AI is "O"
        let evaluation = minimax(gameState, depth - 1, alpha, beta, false);
        gameState.levels[move.level][move.index] = null; // Undo the move
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) {
          return;
        }
      });
      return maxEval;
    } else {
      let minEval = Infinity;
      getAvailableMoves().forEach((move) => {
        gameState.levels[move.level][move.index] = "X"; // Assuming player is "X"
        let evaluation = minimax(gameState, depth - 1, alpha, beta, true);
        gameState.levels[move.level][move.index] = null; // Undo the move
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) {
          return;
        }
      });
      return minEval;
    }
  }

  function checkWin() {
    // Check all levels (2D boards) for wins
    for (let level = 0; level < 4; level++) {
      if (checkLevelWin(gameState.levels[level])) return true;
    }

    // Check verticals and diagonals that span levels
    return checkVerticalsAndDiagonals();
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

  function checkVerticalsAndDiagonals() {
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

  function getDifficulty() {
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("difficulty")) {
      const difficulty = urlParams.get("difficulty");

      if (difficulty === "easy") {
        return 2;
      } else if (difficulty === "difficult") {
        return 3;
      } else if (difficulty === "insane") {
        return 4;
      }
    }
    return 2;
  }

  function isGameOver() {
    const allCellsFilled = gameState.levels.every((level) =>
      level.every((cell) => cell !== null)
    );

    return allCellsFilled || checkWin();
  }

  function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
  }

  function endGame() {
    const winner = gameState.currentPlayer;
    // Disable all cells to prevent further moves
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.removeEventListener("click", handleCellClick);
      cell.classList.add("disabled");
    });

    const gameEndDialog = document.getElementById("gameEndDialog");
    const gameEndMessage = document.getElementById("gameEndMessage");
    const restartButton = document.getElementById("restartButton");

    // Update the dialog message based on game outcome
    gameEndMessage.textContent = winner
      ? `Player ${winner} wins!`
      : "It's a draw!";

    // Show the dialog
    gameEndDialog.classList.remove("hidden");

    // Handle the restart button click
    restartButton.addEventListener("click", function () {
      restartGame();
    });
  }

  function restartGame() {
    // Refresh the page
    window.location.href = "index.html";
  }

  function resetGame() {
    window.location.href = "difficultyScreen.html";
  }

  function getAvailableMoves() {
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

  function applyMove(move) {
    const player = gameState.currentPlayer;
    gameState.levels[move.level][move.index] = player;

    // Update UI to reflect move
    const board = boards[move.level];
    const cell = board.children[move.index];
    cell.textContent = player;

    if (checkWin() || isGameOver()) {
      endGame();
    } else switchPlayer();
  }

  function evaluateBoard() {
    return 0;
  }

  return {
    initialize,
  };
})();

document.addEventListener("DOMContentLoaded", TicTacToeGame.initialize);
