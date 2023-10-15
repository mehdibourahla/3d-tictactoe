document.addEventListener("DOMContentLoaded", function () {
  initializeGame();

  const boards = document.querySelectorAll(".board");
  boards.forEach((board) => {
    board.addEventListener("click", function (e) {
      const cell = e.target;
      if (cell.classList.contains("cell") && !cell.textContent) {
        cell.textContent = "X"; // For simplicity, the player is always 'X'
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
