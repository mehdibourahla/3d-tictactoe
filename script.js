// TicTacToeGame module
const TicTacToeGame = (() => {
  let currentPlayer = "X"; //User player
  gameDepth = getDifficulty();
  const gameState = createGameState();
  const boards = document.querySelectorAll(".board");
  function initialize() {
    boards.forEach((board, level) => {
      for (let i = 0; i < 16; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = "L" + level + "I" + i;
        board.appendChild(cell);
      }
      board.addEventListener("click", (e) => {
        const cell = e.target;
        const index = Array.from(board.children).indexOf(cell);
        if (cell.classList.contains("cell") && !cell.textContent) {
          handleCellClick(cell, level, index, gameDepth);
        }
      });
    });

    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", resetGame);
  }
  function getDifficulty(){ //return the game depth based on the difficulty 
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Check if the 'difficulty' parameter is present in the URL
    if (urlParams.has('difficulty')) {
        // Retrieve the value of the 'difficulty' parameter
        const difficulty = urlParams.get('difficulty');
        //return the depth based on the difficulty level
        if (difficulty == "easy") {
          return 2;
        } else if (difficulty == "difficult"){
          return 4;
        } else if (difficulty = "insane"){
          return 6;
        }

        
}
  }

  function createGameState() {
    let levels = [];
    for (let i = 0; i < 4; i++) {
      levels.push(new Array(16).fill(null));
    }
    return { levels };
  }

  function handleCellClick(cell, level, index, depth) { //handle click of the user/player
    cell.textContent = currentPlayer;
    gameState.levels[level][index] = currentPlayer;
    isMaximizingPlayer = isMaxPlayer(currentPlayer)
    if (checkWin(gameState) || isGameOver(gameState)) {
      setWinner(currentPlayer);
      endGame(currentPlayer);
    } else {
      //Handle the AIMove to call the MinMax function
      move = AIMove(gameState, depth) 
      // Get Cell ID
      cellID = "L" + move.level + "I" + move.index;
      switchPlayer();
      //Simulate AI player move
      simulateAIClick(cellID, currentPlayer, move.level, move.index);
      switchPlayer();
    }
  }
  function simulateAIClick(cellID, player, level, index){ //play the computer move
    const cell = document.getElementById(cellID);
    if (cell) {
      cell.textContent = player;
      gameState.levels[level][index] = player;
    }
    }

  function checkWin(gameState) { //check if the game has a winner
    // Check all levels (3D boards) for wins
    for (let level = 0; level < 4; level++) {
      if (checkLevelWin(gameState.levels[level])) return true;
    }

    // Check verticals and diagonals that span levels
    return checkVerticalsAndDiagonals(gameState);
  }
  function setWinner(player){
    winner = player;
  }

  function isMaxPlayer(currentPlayer){
    if (currentPlayer === "O"){
      return false;
    }else if (currentPlayer === "X"){
      return true;
    }
  }

  function checkLevelWin(board) { //check if the level has a winner
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

  function checkVerticalsAndDiagonals(gameState) { //check vertical and diagonals for 4 in a row
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

  function checkLine(a, b, c, d) { //check game for 4 in a row
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

  function endGame(winner) {
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

  function getAvailableMoves(gameState) { //Get moves that are null
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

  function applyMove(gameState, move, player) { //Apply move
    gameState.levels[move.level][move.index] = player;
    return gameState;
  }
  function undoMove(gameState, move) { //Undo move
    gameState.levels[move.level][move.index] = null;
    return gameState;
  }

  function countInLine(player, ps, line){//score the desirability of the line for the minimax alg
    // If there is an opposite player in the line, there is no benefit of playing a move in that line
    if (player == "X"){
      if (line.includes("O")){
        return 0;
      }
      else if (line.includes("min")){
        return 0;
      }
    }else{
      if (line.includes("X")){
        return 0;
      }
      else if (line.includes("max")){
        return 0;
      }
    }
    //Get the number of players in that line, return a number to the power of 2
    const count = line.filter(cell => cell === player || cell === ps).length;
    return Math.pow(2, count);
  }

  function checkThreats(player, ps,  board){//Iterate through all levels and return a score
    score = 0
    // Check layers
    for (let level = 0; level < 4; level++) {
      for (let i = 0; i < 4; i++){
        let rowLine = [board.levels[level][i*4],board.levels[level][i*4 + 1], board.levels[level][i*4 + 2], board.levels[level][i*4 + 3]];
        let columnLine = [board.levels[level][i],board.levels[level][i + 4], board.levels[level][i + 5], board.levels[level][i + 6]];
        score += countInLine(player, ps, rowLine);
        score += countInLine(player, ps, columnLine);
      }
      //Check diagonals
      let diagonal1 = [board.levels[level][0],board.levels[level][5], board.levels[level][10], board.levels[level][10]];
      let diagonal2 = [board.levels[level][3],board.levels[level][6], board.levels[level][9], board.levels[level][12]];
      score += countInLine(player, ps, diagonal1);
      score += countInLine(player, ps, diagonal2);

    }
    return score

  }
  function checkMinMaxVerticalsAndDiagonals(player, ps, gameState) { //check the verticals and diagonals for the minimax alg
    // Check verticals
    for (let i = 0; i < 16; i++) {
      if (
        checkMinMaxLine(
          gameState.levels[0][i],
          gameState.levels[1][i],
          gameState.levels[2][i],
          gameState.levels[3][i],
          ps, player
        )
      ) {
        return true;
      }
    }

    // Check cube diagonals
    if (
      checkMinMaxLine(
        gameState.levels[0][0],
        gameState.levels[1][1],
        gameState.levels[2][2],
        gameState.levels[3][3],
        ps, player
      )
    )
      return true;
    if (
      checkMinMaxLine(
        gameState.levels[0][15],
        gameState.levels[1][14],
        gameState.levels[2][13],
        gameState.levels[3][12],
        ps, player
      )
    )
      return true;
    if (
      checkMinMaxLine(
        gameState.levels[0][3],
        gameState.levels[1][2],
        gameState.levels[2][1],
        gameState.levels[3][0],
        ps, player
      )
    )
      return true;
    if (
      checkMinMaxLine(
        gameState.levels[0][12],
        gameState.levels[1][13],
        gameState.levels[2][14],
        gameState.levels[3][15],
        ps, player
      )
    )
      return true;

    // Check additional cross-section diagonals
    if (
      checkMinMaxLine(
        gameState.levels[0][0],
        gameState.levels[1][4],
        gameState.levels[2][8],
        gameState.levels[3][12],
        ps, player
      )
    )
      return true;
    if (
      checkMinMaxLine(
        gameState.levels[0][3],
        gameState.levels[1][7],
        gameState.levels[2][11],
        gameState.levels[3][15],
        ps, player
      )
    )
      return true;
    if (
      checkMinMaxLine(
        gameState.levels[0][12],
        gameState.levels[1][8],
        gameState.levels[2][4],
        gameState.levels[3][0],
        ps, player
      )
    )
      return true;
    if (
      checkMinMaxLine(
        gameState.levels[0][15],
        gameState.levels[1][11],
        gameState.levels[2][7],
        gameState.levels[3][3],
        ps, player
      )
    )
      return true;

    return false;
  }
  function checkMinMaxLine(a, b, c, d, playerString, player) { //Check if there is 4 in a row for the minimax alg
    return (a === player || a === playerString) && (b === player || b === playerString) && (c === player || c === playerString) && (d === player || d === playerString);
  }
  function checkMinMaxLevelWin(player, ps, board) { //check if the player won during the minimax algorithm for a specific level
    // Check rows and columns
    for (let i = 0; i < 4; i++) {
      if (
        checkMinMaxLine(
          board[i * 4],
          board[i * 4 + 1],
          board[i * 4 + 2],
          board[i * 4 + 3],
          ps, player
        )
      )
        return true;
      if (checkMinMaxLine(board[i], board[i + 4], board[i + 8], board[i + 12], ps, player))
        return true;
    }
    // Check diagonals within level
    if (checkMinMaxLine(board[0], board[5], board[10], board[15], ps, player)) return true;
    if (checkMinMaxLine(board[3], board[6], board[9], board[12], ps, player)) return true;

    return false;
  }
  function checkMinMaxWin(player, ps, gameState) { //check if the player won when the minimax algorithm is called
    // Check all levels (2D boards) for wins
    for (let level = 0; level < 4; level++) {
      if (checkMinMaxLevelWin(player, ps, gameState.levels[level])) return true;
    }

    // Check verticals and diagonals that span levels
    return checkMinMaxVerticalsAndDiagonals(player, ps, gameState);
  }
  function isWinner(player, board) { //is the player a winner
    
    if (player === "X"){
      playerString = "max";
    } else {
      playerString = "min";
    } 
    //Check if the player won the game
    if (checkMinMaxWin(player, playerString, board)){
      return true;
    } else {
      return false;
    }
  }
  function isMinMaxGameOver(gameState) { //is the game over when minimax is applied
    const allCellsFilled = gameState.levels.every((level) =>
      level.every((cell) => cell !== null)
    );

    return allCellsFilled;
  }

  function evaluateBoard(gameState) { //evaluate board when at terminal node
    if (isWinner("X", gameState)) {
      return 1000;
    } else if (isWinner("O", gameState)){
      return -1000;
    } else if(isMinMaxGameOver(gameState)){
      return 0;
    } else {
      AIScore = checkThreats("X", "max", gameState)
      playerScore = checkThreats("O","min", gameState)
      return AIScore - playerScore
    }
  }
  
 function minimax(gameState, depth, alpha, beta, isMaximizingPlayer) { //minimax algorithm for computer
    // Evaluate at terminal node
    if (depth === 0 || isGameOver(gameState)) {
      ev = evaluateBoard(gameState)
      return ev;
    }

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (let move of getAvailableMoves(gameState)) {
        const evaluation = minimax(
          applyMove(gameState, move, "max"),
          depth - 1,
          alpha,
          beta,
          false
        );
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        gameState = undoMove(gameState, move)
        if (beta <= alpha) {
          break;
        }
        
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let move of getAvailableMoves(gameState)) {
        const evaluation = minimax(
          applyMove(gameState, move, "min"),
          depth - 1,
          alpha,
          beta,
          true
        );
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        gameState = undoMove(gameState, move)
        if (beta <= alpha) {
          break;
        }
      }
      return minEval;
    }
  }
  function AIMove(gameState, difficultyLevel){ //Get the best move for the computer
    let bestScore = -Infinity;
    let bestMove = null;
    for (let move of getAvailableMoves(gameState)) {
      applyMove(gameState, move, "X")
      score = minimax(gameState, difficultyLevel,-Infinity, Infinity, false);
      undoMove(gameState, move, "X")
      if (score > bestScore){
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;

  }

  return {
    initialize,
  };
})();

document.addEventListener("DOMContentLoaded", TicTacToeGame.initialize);
