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

    document.querySelectorAll('input[name="difficulty"]').forEach((elem) => {
      elem.addEventListener("change", function (event) {
        const difficulty = event.target.value;
        gameState.gameDepth = parseInt(difficulty);
      });
    });

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGame);
  }

  function createGameState() {
    let currentPlayer = "X";
    let gameOver = false;
    let gameDepth = parseInt(
      document.querySelector('input[name="difficulty"]:checked').value
    );
    let levels = [];
    for (let i = 0; i < 4; i++) {
      levels.push(new Array(16).fill(null));
    }
    return { levels, gameDepth, currentPlayer, gameOver };
  }

  function handleCellClick(move) {
    applyMove(move);
    if (!gameState.gameOver) AIMove();
  }

  function AIMove() {
    let bestScore = -Infinity;
    let bestMove = null;

    getAvailableMoves().forEach((move) => {
      // Apply a hypothetical move
      gameState.levels[move.level][move.index] = "O";
      let score = minimax(gameState.gameDepth, -Infinity, Infinity, false);

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
      applyMove(bestMove);
    }
  }

  function minimax(depth, alpha, beta, isMaximizingPlayer) {
    if (depth === 0 || isGameOver()) {
      return evaluateBoard();
    }

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      getAvailableMoves().forEach((move) => {
        gameState.levels[move.level][move.index] = "O";
        let evaluation = minimax(depth - 1, alpha, beta, false);
        gameState.levels[move.level][move.index] = null;
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
        gameState.levels[move.level][move.index] = "X";
        let evaluation = minimax(depth - 1, alpha, beta, true);
        gameState.levels[move.level][move.index] = null;
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) {
          return;
        }
      });
      return minEval;
    }
  }

  // Update checkLevelWin to track the winning positions
  function checkLevelWin(board, level) {
    let winPositions = null;

    // Check rows and columns
    for (let i = 0; i < 4; i++) {
      let rowPositions = [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3].map(
        (pos) => level * 16 + pos
      );
      winPositions = checkLine(
        board[i * 4],
        board[i * 4 + 1],
        board[i * 4 + 2],
        board[i * 4 + 3],
        rowPositions
      );
      if (winPositions) return winPositions;

      let colPositions = [i, i + 4, i + 8, i + 12].map(
        (pos) => level * 16 + pos
      );
      winPositions = checkLine(
        board[i],
        board[i + 4],
        board[i + 8],
        board[i + 12],
        colPositions
      );
      if (winPositions) return winPositions;
    }

    // Check diagonals within level
    let diag1Positions = [0, 5, 10, 15].map((pos) => level * 16 + pos);
    winPositions = checkLine(
      board[0],
      board[5],
      board[10],
      board[15],
      diag1Positions
    );
    if (winPositions) return winPositions;

    let diag2Positions = [3, 6, 9, 12].map((pos) => level * 16 + pos);
    winPositions = checkLine(
      board[3],
      board[6],
      board[9],
      board[12],
      diag2Positions
    );
    if (winPositions) return winPositions;

    return null; // Return null if no win is found
  }

  // Update checkVerticalsAndDiagonals to track the winning positions
  function checkVerticalsAndDiagonals() {
    let winPositions = null;

    // Check verticals
    for (let i = 0; i < 16; i++) {
      let vertPositions = [i, i + 16, i + 32, i + 48]; // Positions for each level
      winPositions = checkLine(
        gameState.levels[0][i],
        gameState.levels[1][i],
        gameState.levels[2][i],
        gameState.levels[3][i],
        vertPositions
      );
      if (winPositions) return winPositions;
    }

    // Define the positions for cube diagonals
    let cubeDiagonals = [
      [0, 17, 34, 51],
      [3, 18, 33, 48],
      [12, 25, 38, 51],
      [15, 26, 37, 48],
    ];

    // Check cube diagonals
    for (let diag of cubeDiagonals) {
      winPositions = checkLine(
        gameState.levels[0][diag[0]],
        gameState.levels[1][diag[1]],
        gameState.levels[2][diag[2]],
        gameState.levels[3][diag[3]],
        diag
      );
      if (winPositions) return winPositions;
    }

    return null; // Return null if no win is found
  }

  // Update checkWin to use the new checkLevelWin and checkVerticalsAndDiagonals
  function checkWin() {
    let winPositions = null;

    // Check all levels (2D boards) for wins
    for (let level = 0; level < 4; level++) {
      winPositions = checkLevelWin(gameState.levels[level], level);
      if (winPositions) return winPositions;
    }

    // Check verticals and diagonals that span levels
    winPositions = checkVerticalsAndDiagonals();
    if (winPositions) return winPositions;

    return null; // Return null if no win is found
  }

  function checkLine(a, b, c, d, positions) {
    if (a !== null && a === b && b === c && c === d) {
      return positions;
    }
    return null;
  }

  function isGameOver() {
    const allCellsFilled = gameState.levels.every((level) =>
      level.every((cell) => cell !== null)
    );

    return allCellsFilled;
  }

  function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
  }

  function highlightWinningCells(positions, winner) {
    if (positions) {
      // Check which player won
      positions.forEach((pos) => {
        const levelIndex = Math.floor(pos / 16);
        const cellIndex = pos % 16;
        const winningCell = boards[levelIndex].children[cellIndex];
        if (winner === "X") {
          winningCell.classList.add("winning-cell-x");
        } else {
          winningCell.classList.add("winning-cell-o");
        }
      });
    }
  }

  function endGame(winningPositions) {
    gameState.gameOver = true;
    const winner = gameState.currentPlayer;

    if (winningPositions) {
      highlightWinningCells(winningPositions, winner);
    }

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
      resetGame();
    });
  }

  function resetGame() {
    window.location.href = "index.html";
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

    const winningPositions = checkWin();
    if (winningPositions || isGameOver()) {
      endGame(winningPositions);
    } else {
      switchPlayer();
    }
  }

  function evaluateBoard() {
    let score = 0;

    // Iterate through each level and evaluate rows, columns, and diagonals
    for (let level = 0; level < 4; level++) {
      for (let i = 0; i < 4; i++) {
        // Rows and columns
        score += evaluateLine(
          gameState.levels[level],
          [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3],
          "O"
        );
        score -= evaluateLine(
          gameState.levels[level],
          [i * 4, i * 4 + 1, i * 4 + 2, i * 4 + 3],
          "X"
        );
        score += evaluateLine(
          gameState.levels[level],
          [i, i + 4, i + 8, i + 12],
          "O"
        );
        score -= evaluateLine(
          gameState.levels[level],
          [i, i + 4, i + 8, i + 12],
          "X"
        );
      }

      // Diagonals within a level
      score += evaluateLine(gameState.levels[level], [0, 5, 10, 15], "O");
      score -= evaluateLine(gameState.levels[level], [0, 5, 10, 15], "X");
      score += evaluateLine(gameState.levels[level], [3, 6, 9, 12], "O");
      score -= evaluateLine(gameState.levels[level], [3, 6, 9, 12], "X");
    }

    // Verticals across levels
    for (let i = 0; i < 16; i++) {
      let positions = [
        gameState.levels[0][i],
        gameState.levels[1][i],
        gameState.levels[2][i],
        gameState.levels[3][i],
      ];
      score += evaluateLine(positions, [0, 1, 2, 3], "O");
      score -= evaluateLine(positions, [0, 1, 2, 3], "X");
    }

    // Cube diagonals
    score += evaluateCubeDiagonals("O");
    score -= evaluateCubeDiagonals("X");

    return score;
  }

  function evaluateLine(board, positions, player) {
    let playerCount = 0,
      emptyCount = 0;

    positions.forEach((pos) => {
      if (board[pos] === player) {
        playerCount++;
      } else if (board[pos] === null) {
        emptyCount++;
      }
    });

    // Adjust the scoring based on playerCount and emptyCount
    if (playerCount === 4) {
      return 100; // Maximum score for winning line
    } else if (playerCount === 3 && emptyCount === 1) {
      return 10; // Score for potential win
    } else if (playerCount === 2 && emptyCount === 2) {
      return 5; // Lower score for less immediate threat
    }

    return 0;
  }

  function evaluateCubeDiagonals(player) {
    // This function evaluates the diagonals that span across levels
    let score = 0;

    // Define the positions for cube diagonals
    let cubeDiagonals = [
      [0, 21, 42, 63], // Diagonal from top left of level 0 to bottom right of level 3
      [15, 26, 37, 48], // Diagonal from top right of level 0 to bottom left of level 3
      // Add other cube diagonal positions as needed
    ];

    cubeDiagonals.forEach((diagonal) => {
      let line = diagonal.map((index) => {
        let level = Math.floor(index / 16);
        let position = index % 16;
        return gameState.levels[level][position];
      });

      score += evaluateLine(line, [0, 1, 2, 3], player);
    });

    return score;
  }

  return {
    initialize,
  };
})();

document.addEventListener("DOMContentLoaded", TicTacToeGame.initialize);
