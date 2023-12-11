# 3D Tic-Tac-Toe

Web app link: https://tictactoe-3d.netlify.app/

## Introduction

3D Tic-Tac-Toe is a web-based version of the classic Tic-Tac-Toe game with a 3D twist. This project is designed to provide an interactive and engaging gaming experience.

## Features

- 3D game interface.
- Interactive user experience.
- Custom-designed styles and layouts.

## Project Structure

```bash
tic-tac-toe-3d/
├── README.md           # This file.
├── index.html          # Main entry point for the web application
├── css/                # Directory for CSS files
│   ├── style.css       # CSS for styling the web application
├── js/                 # Directory for JavaScript files
│   ├── script.js       # Contains game rules or logic
│   ├── rules.js        # Main JavaScript functionality
```

## Getting Started

To run the game locally:

- Clone the repository to your local machine.
- Open index.html in a web browser.

## Built With

- HTML
- CSS
- JavaScript

## Authors

- Mohamed Mehdi Bourahla
- Rachel Blanding

## How to Play

- The game is played on a 4x4x4 board.
- It is played by two players, X and O, who take turns marking the spaces in a 4x4x4 grid.
- X always goes first and is the human player.
- O is the computer player. The computer player is an AI that uses the minimax algorithm to determine the best move. The AI has 3 levels of difficulty: easy, medium, and hard. This difficulty level can be selected by the user and can be changed at any time during the game. The default difficulty level is Easy.
- The player who succeeds in placing four of their marks in a horizontal, vertical, or diagonal row wins the game.
- If the board fills up before either player wins, then the game is a draw.
- The game can be reset at any time by clicking the Reset button.
- Good luck and have fun!

## Functionality Overview

In this section, we provide an overview of some of the core functions implemented in the JavaScript file (script.js).

### Game Initialization

- initialize()
  - Description: Initializes the game by creating the game state, setting up the game boards, and attaching event listeners to handle player interactions.
  - Usage: Called once on page load.
  - Parameters: None.

### Game State Management

- createGameState()
  - Description: Creates and returns the initial game state.
  - Usage: Called during initialization.
  - Parameters: None.
- resetGame()
  - Description: Resets the game to its initial state.
  - Usage: Triggered by the "Reset" button click.
  - Parameters: None.

### Player Moves

- handleCellClick(move)
  - Description: Handles player clicks on game cells, applies the move, and triggers the AI's move.
  - Usage: Called when a player clicks on a cell.
  - Parameters: (move: An object with properties level and index representing the selected cell's location)
- applyMove(move)
  - Description: Applies a player's move to the game state and updates the UI.
  - Usage: Called by handleCellClick and AIMove.
  - Parameters: (move: An object with properties level and index representing the selected cell's location.)
- switchPlayer()
  - Description: Switches the current player between "X" and "O."
  - Usage: Called after each player move.

### AI Moves

- AIMove()
  - Description: Initiates the AI's move by selecting the best move using the minimax algorithm.
  - Usage: Called after a player's move.
- minimax(depth, alpha, beta, isMaximizingPlayer)
  - Description: Implements the minimax algorithm to evaluate possible moves and determine the best move for the AI.
  - Usage: Called recursively by AIMove.
- evaluateBoard()
  - Description: Evaluates the current game state and returns a score based on the positions of player pieces.
  - Usage: Called by minimax.
  - Returns: A numerical score representing the advantage or disadvantage of the current board state.
- evaluateLine(board, positions, player)
  - Description: Evaluates a line (row, column, or diagonal) on the game board and assigns a score based on the positions of player pieces.
  - Usage: Called by evaluateBoard.
  - Parameters: (board: An array representing a row, column, or diagonal on the game board. positions: An array of indices indicating the positions to evaluate. player: The player ("O" or "X") for whom the evaluation is performed.)
  - Returns: A numerical score based on the evaluation.
- evaluateCubeDiagonals(player)
  - Description: Evaluates cube diagonals (spanning across levels) and assigns a score based on the positions of player pieces.
  - Usage: Called by evaluateBoard.
  - Parameters: (player: The player ("O" or "X") for whom the evaluation is performed.)
  - Returns: A numerical score based on the evaluation.

### Game Outcome

- checkWin()
  - Description: Checks if either player has won the game.
  - Usage: Called after each move.
  - Returns: true if a player has won, false otherwise.
- checkLevelWin(board)
  - Description: Checks if a player has won on a specific level.
  - Usage: Called by checkWin.
  - Parameters: (board: An array representing a level on the game board.)
  - Returns: true if a player has won on the level, false otherwise.
- checkVerticalsAndDiagonals()
  - Description: Checks for vertical and diagonal wins across levels.
  - Usage: Called by checkWin.
  - Returns: true if a player has won vertically or diagonally across levels, false otherwise.
- checkLine(a, b, c, d)
  - Description: Checks if four positions on the board form a winning line for a player.
  - Usage: Called by checkLevelWin and checkVerticalsAndDiagonals.
  - Parameters: (a, b, c, d: Positions on the game board.)
  - Returns: true if the positions form a winning line for a player, false otherwise.
- isGameOver()
  - Description: Checks if the game has reached a draw (all cells filled).
  - Usage: Called after each move.
  - Returns: true if the game is a draw, false otherwise.
- endGame()
  - Description: Ends the game, disables cells, and displays the game outcome in a dialog.
  - Usage: Called when the game is won or ends in a draw.
- isMaxPlayer(currentPlayer)
  - Description: Determines if the current player is the maximizing player in the minimax algorithm.
  - Usage: Called by minimax.
  - Parameters: (currentPlayer: The current player ("O" or "X").)
  - Returns: true if the current player is "O" (maximizing player), false otherwise.
- difficultyChangeHandler(event)
  - Description: Handles changes to the difficulty level selected by the user.
  - Usage: Called when the user changes the difficulty level.
  - Parameters: (event: The change event object.)

### UI Interaction

- initialize()
  - Description: Sets up the game boards, attaches event listeners, and initializes the game state.
  - Usage: Called once on page load.
  - Parameters: None.

### Evaluate board method

- Create the score for the moves of the board. Is returned to the minimax function
  - Iteration through Levels: The function iterates through each level of the 4x4x4 game board, evaluating rows, columns, and diagonals within each level.
  - Evaluate Line Function: A helper function, evaluateLine, is used to calculate the score for a given line (row, column, or diagonal) on the game board. It counts the number of player pieces and empty spaces in the specified positions.
  - Diagonals Within a Level: Diagonals within a level are considered, contributing to the overall score.
  - Verticals Across Levels: Vertical alignments across levels are assessed, adding to the score.
  - Cube Diagonals: Cube diagonals are evaluated for both players ("O" and "X"), influencing the final score.

### Minimax method

- Parameters:
  - depth (type: number): The current depth in the minimax search tree. It represents how many moves ahead the algorithm should explore.
  - alpha (type: number): The alpha value for alpha-beta pruning. It represents the best (maximum) value that the maximizing player can guarantee at the current level or above.
  - beta (type: number): The beta value for alpha-beta pruning. It represents the best (minimum) value that the minimizing player can guarantee at the current level or above.
  - isMaximizingPlayer (type: boolean): A boolean indicating whether the current player is the maximizing player ("O") or the minimizing player ("X").
- Return Value

  - (type: number): The evaluation score for the current state of the game board. The score represents the advantage or disadvantage of the board position for the maximizing player.

- Base Cases:

  - If the depth parameter is 0 or the game is over, the function returns the result of the evaluateBoard function for the current board state.

- Maximizing Player (AI, "O"):
  If isMaximizingPlayer is true, the function initializes maxEval to negative infinity.
  It iterates over all available moves, applying each move hypothetically and recursively calling minimax with reduced depth for the minimizing player.
  The best move and score are updated based on the maximum of the current score and maxEval.
  The alpha value is updated to the maximum of the current score and the alpha value.
  If beta is less than or equal to alpha, pruning occurs, and the loop is terminated.

- Minimizing Player (Human, "X"):
  If isMaximizingPlayer is false, the function initializes minEval to positive infinity.
  It iterates over all available moves, applying each move hypothetically and recursively calling minimax with reduced depth for the maximizing player.
  The best move and score are updated based on the minimum of the current score and minEval.
  The beta value is updated to the minimum of the current score and the beta value.
  If beta is less than or equal to alpha, pruning occurs, and the loop is terminated.

- Final Outcome:
  The function returns the maximum score (maxEval) if the current player is the maximizing player; otherwise, it returns the minimum score (minEval) for the minimizing player.
