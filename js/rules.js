document.getElementById("rulesButton").addEventListener("click", function () {
  document.getElementById("rulesDialog").classList.remove("hidden");
});

document
  .getElementById("closeRulesButton")
  .addEventListener("click", function () {
    document.getElementById("rulesDialog").classList.add("hidden");
  });
