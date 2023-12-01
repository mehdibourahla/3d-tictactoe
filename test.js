//PLAYS MIN MOVE / O
const gameState = createGameState();
setGameState(gameState);
console.log(gameState)
best = AIMove(gameState, 1)
console.log(best)
// console.log(score)
function createGameState() {
    let levels = [];
    for (let i = 0; i < 4; i++) {
      levels.push(new Array(16).fill(null));
    }
    return { levels };
  }
function setGameState(gameState){
    // gameState.levels[0][0] = "X"
    // gameState.levels[0][1] = "O"
    // gameState.levels[0][4] = "X"
    // gameState.levels[0][2] = "O"
    // gameState.levels[0][8] = "X"
    // gameState.levels[0][7] = "O"

    // gameState.levels[0][0] = "O"
    // gameState.levels[0][1] = "X"
    // gameState.levels[0][4] = "O"
    // gameState.levels[0][2] = "X"
    // gameState.levels[0][8] = "O"
    // gameState.levels[0][7] = "X"

    // gameState.levels[0][4] = "O"
    // gameState.levels[0][1] = "X"
    // gameState.levels[0][5] = "O"
    // gameState.levels[0][3] = "X"
    // gameState.levels[0][6] = "O"
    // gameState.levels[0][8] = "X"

    gameState.levels[0][1] = "X"
    gameState.levels[0][5] = "X"
    gameState.levels[0][9] = "X"
    gameState.levels[0][2] = "O"
    gameState.levels[0][6] = "O"
    gameState.levels[0][10] = "O"
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
function isGameOver(gameState) {
    const allCellsFilled = gameState.levels.every((level) =>
      level.every((cell) => cell !== null)
    );
    
    return allCellsFilled || checkWin(gameState);
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
function isMinMaxGameOver(gameState) {
    const allCellsFilled = gameState.levels.every((level) =>
      level.every((cell) => cell !== null)
    );

    return allCellsFilled;
  }
function checkThreats(player, ps,  board){
    score = 0
    for (let level = 0; level < 4; level++) {
      for (let i = 0; i < 4; i++){
        let rowLine = [board.levels[level][i*4],board.levels[level][i*4 + 1], board.levels[level][i*4 + 2], board.levels[level][i*4 + 3]];
        let columnLine = [board.levels[level][i],board.levels[level][i + 4], board.levels[level][i + 8], board.levels[level][i + 12]];
        score += countInLine(player, ps, rowLine);
        score += countInLine(player, ps, columnLine);
        // console.log(score);
      }
      let diagonal1 = [board.levels[level][0],board.levels[level][5], board.levels[level][10], board.levels[level][15]];
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
function applyMove(gameState, move, player) {
    gameState.levels[move.level][move.index] = player;
    return gameState;
  }
function undoMove(gameState, move) {
    gameState.levels[move.level][move.index] = null;
    return gameState;
  }
function countInLine(player, ps, line){
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

    const count = line.filter(cell => cell === player || cell === ps).length;
    return Math.pow(2, count);
  }
function evaluateBoard(gameState) {
    // console.log(gameState)
    if (isWinner("X", gameState)) {
      return 1000;
    } else if (isWinner("O", gameState)){
      return -1000;
    } else if(isMinMaxGameOver(gameState)){
      return 0;
    } else {
      AIScore = checkThreats("X", "max", gameState)
      playerScore = checkThreats("O","min", gameState)
    //   console.log("AI Score: " + AIScore)
    //   console.log("Player Score: " + playerScore)
    //   console.log("Final Score: " + (AIScore - playerScore))
      return AIScore - playerScore
    }
  }
function minimax(gameState, depth, alpha, beta, isMaximizingPlayer) {
    if (depth === 0 ) {
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
function AIMove(gameState, difficultyLevel){
    let bestScore = -Infinity;
    let bestMove = null;
    // console.log(getAvailableMoves(gameState))
    for (let move of getAvailableMoves(gameState)) {
        // if (move.index)
      console.log(move)
      applyMove(gameState, move, "X")
      score = minimax(gameState, difficultyLevel,-Infinity, Infinity, false);
      undoMove(gameState, move, "X")
      console.log("Score: " + score);
      console.log("BestScore: " + bestScore);
      if (score > bestScore){
        bestScore = score;
        bestMove = move;
        console.log("New Best Mov: " + bestMove)
      }
    }
    console.log(bestScore);
    return bestMove;

  }