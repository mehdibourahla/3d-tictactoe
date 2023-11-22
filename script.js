// TicTacToeGame module
const TicTacToeGame = (() => {
  let winner = "n/a"
  let currentPlayer = "X";
  let aiBoard = "n/a"
  // const ameState = createGameState();
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
        console.log("Board: " + e);
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
    console.log(cell)
    cell.textContent = currentPlayer;
    gameState.levels[level][index] = currentPlayer;
    isMaximizingPlayer = isMaxPlayer(currentPlayer)
    // console.log(isMaximizingPlayer)
    // tryy = minimax(gameState, 0, -100, 100, isMaximizingPlayer)
    // console.log("onclick")
    // console.log(gameState)
    // console.log(isMaximizingPlayer)

    // console.log(tryy)
    if (checkWin(gameState) || isGameOver(gameState)) {
      setWinner(currentPlayer);
      endGame(currentPlayer);
    } else {
      move = AIMove(gameState, 2)
      cellID = "L" + move.level + "I" + move.index;
      // console.log(cellID);
      // console.log(move.level)
      switchPlayer();
      simulateAIClick(cellID, currentPlayer, move.level, move.index);
      switchPlayer();
      console.log(move);
      
      // tryy = minimax(gameState, 2, -100, 100, isMaximizingPlayer)
    }
  }
  function simulateAIClick(cellID, player, level, index){
    const cell = document.getElementById(cellID);
    if (cell) {
      cell.textContent = player;
      gameState.levels[level][index] = player;
    }
    }

  

  function checkWin(gameState) {
    // Check all levels (2D boards) for wins
    //DONT FORGET: CHANGE BACK TO CHECK ALL 4 LEVELS
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
    if (currentPlayer === "X"){
      return false;
    }else if (currentPlayer === "O"){
      return true;
    }
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
  // function checkLineAI(a,b,c,d){
  //   if (a === "X"){
  //     a === "AI"
  //   } else if (a === "O"){
  //     a === "Player"
  //   }
  //   if (b === "X"){
  //     b === "AI"
  //   } else if (b === "O"){
  //     b === "Player"
  //   }
  //   if (c === "X"){
  //     c === "AI"
  //   } else if (c === "O"){
  //     c === "Player"
  //   }
  //   if (d === "X"){
  //     d === "AI"
  //   } else if (d === "O"){
  //     d === "Player"
  //   }
  //   return a !== null && a === b && b === c && c === d;
  // }

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
    // console.log(newState)
    // console.log("New State ^^")
    return newState;
  }
  function undoMove(gameState, move) {
    let newState = JSON.parse(JSON.stringify(gameState));
    newState.levels[move.level][move.index] = null;
    // console.log(newState)
    // console.log("New State ^^")
    return newState;
  }

  function countInLine(player, ps, line){
    const count = line.filter(cell => cell === player || cell === ps).length;
    return Math.pow(2, count);
  }

  function checkThreats(player, ps,  board){
    score = 0
    for (let level = 0; level < 4; level++) {
      for (let i = 0; i < 4; i++){
        let rowLine = [board.levels[level][i*4],board.levels[level][i*4 + 1], board.levels[level][i*4 + 2], board.levels[level][i*4 + 3]];
        let columnLine = [board.levels[level][i],board.levels[level][i + 4], board.levels[level][i + 5], board.levels[level][i + 6]];
        score += countInLine(player, ps, rowLine);
        score += countInLine(player, ps, columnLine);
      }
      let diagonal1 = [board.levels[level][0],board.levels[level][5], board.levels[level][10], board.levels[level][10]];
      let diagonal2 = [board.levels[level][3],board.levels[level][6], board.levels[level][9], board.levels[level][12]];
      score += countInLine(player, ps, diagonal1);
      score += countInLine(player, ps, diagonal2);

      // if (checkMinMaxLevelWin(player, ps, gameState.levels[level])) return true;
    }
   
    // //Check layers
    // for (let i = 0; i < 4; i++){
    //   score += countInLine(player, board.map(row => row.map(cell => cell[i])));
    // }
    // //Check diagonals in 3d space
    // score += countInLine(player, board.map((row, index) => row[index][index]));
    // score += countInLine(player, board.map((row, index) => row[index][3-index]));
    return score

    // for i = 0 in range(4):

  }
  function checkMinMaxVerticalsAndDiagonals(player, ps, gameState) {
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
  function checkMinMaxLine(a, b, c, d, playerString, player) {
    return (a === player || a === playerString) && (b === player || b === playerString) && (c === player || c === playerString) && (d === player || d === playerString);
  }
  function checkMinMaxLevelWin(player, ps, board) {
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
  function checkMinMaxWin(player, ps, gameState) {
    // Check all levels (2D boards) for wins
    for (let level = 0; level < 4; level++) {
      if (checkMinMaxLevelWin(player, ps, gameState.levels[level])) return true;
    }

    // Check verticals and diagonals that span levels
    return checkMinMaxVerticalsAndDiagonals(player, ps, gameState);
  }
  function isWinner(player, board) {
    if (player === "X"){
      playerString = "max";
    } else {
      playerString = "min";
    } 
    if (checkMinMaxWin(player, playerString, board)){
      return true;
    } else {
      return false;
    }
  }
  function isMinMaxGameOver(gameState) {
    const allCellsFilled = gameState.levels.every((level) =>
      level.every((cell) => cell !== null)
    );

    return allCellsFilled;
  }
  // / Check rows and columns
    // for (let i = 0; i < 4; i++) {
    //   if (
    //     checkMinMaxLine(
    //       board[i * 4],
    //       board[i * 4 + 1],
    //       board[i * 4 + 2],
    //       board[i * 4 + 3],
    //       playerString
    //     )
    //   )
    //     return true;
    //   if (checkMinMaxLine(board[i], board[i + 4], board[i + 8], board[i + 12], playerString))
    //     return true;
    // }
    // // tempBoard = board
    // // console.log(tempBoard.levels[0])
    // // console.log(board.levels[0][1])
    // // // console.log(board[0])
    // // // console.log(board[1])
    // // for(let i = 0; i < 4; i++){
    // //   console.log(board.levels[i])
    // //   for (let j = 0; j < 4; j++){
    // //     if (board.levels[i*3]){

    // //     }
    // //   }
    //   //Check rows and columns wins
    //   if(board[i].every(cell => cell === player || cell === playerString) || board.every(row => row[i] === player || row[i] === playerString)){
    //     return true;
    //   }
    //   //Check diagonals wins
    //   if (board.every((row,index) => row[index] === player) || board.every((row, index) => row[3 - index] === player || row[3 - index] === playerString)){
    //     return true;
    //   }
    
    //   //Check layers
    //   for (let i = 0; i < 4; i++){
    //     if(board.every(row => row.every(cell=> cell[i] === player || cell[i] === playerString))){
    //       return true;
    //     }
    //   }
    //   //check diagonals in 3d space
    //   if(board.every((row, index) => row[index][index] === player || row[index][index] === playerString) || board.every((row, index) => row[index][3-index] === player || row[index][3-index] === playerString) ){
    //     return true
    //   }
    //   return false
    
    // }

  function evaluateBoard(gameState) {
    // console.log(gameState)
    if (isWinner("X", gameState)) {
      //TODO: find out who one the game, the previous method using the current player, but that method will not work
      // console.log("Here!! X won")
      return 1000;
    } else if (isWinner("O", gameState)){
      // console.log("Here!! O Won")
      return -1000;
    } else if(isMinMaxGameOver(gameState)){
      return 0;
    } else {
      AIScore = checkThreats("X", "max", gameState)
      playerScore = checkThreats("O","min", gameState)
      return AIScore - playerScore
      // if(AIScore > playerScore){
      //   return 5;
      // } else if (AIScore < playerScore){
      //   return -5;
      // } else{
      //   return 0;
      // }
      // return AIScore - playerScore
    }
    // }
    // return 50
  }
//Steps to evaluate: Step through minimaxif max vs if min functionality, isWinner functionality, check threats functionality, checkInLine functionality, evaluate functionality
  function minimax(gameState, depth, alpha, beta, isMaximizingPlayer) {
    // gameState
    // console.log(aiBoard)
    // console.log("---")
    // console.log(gameState)
    if (depth === 0 || isGameOver(gameState)) {
      ev = evaluateBoard(gameState)
      // console.log("Depth0Eval:" + ev)
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
      // console.log("Max Eval: " + maxEval);
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
      // console.log("Min Eval: " + minEval);
      return minEval;
    }
  }
  function AIMove(gameState, difficultyLevel){
    let bestScore = -Infinity;
    // let bestMove = null;
    console.log(getAvailableMoves(gameState))
    for (let move of getAvailableMoves(gameState)) {
      score = minimax(gameState, difficultyLevel,-Infinity, Infinity, false);
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
