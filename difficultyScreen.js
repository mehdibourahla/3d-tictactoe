const easyButton = document.getElementById("easyButton");
const difficultButton = document.getElementById("difficultButton");
const insaneButton = document.getElementById("insaneButton");
const rulesButton = document.getElementById("rulesButton");

easyButton.addEventListener("click", function (){
    window.location.href = 'index.html?difficulty=easy';
});
difficultButton.addEventListener("click", function (){
    window.location.href = 'index.html?difficulty=difficult';
});
insaneButton.addEventListener("click", function (){
    window.location.href = 'index.html?difficulty=insane';
});
rulesButton.addEventListener("click", function (){
    window.location.href = 'rules.html';
});
// //-----------------------------------------------------//
// function goToGame(depth){
//     window.location.href = 'index.html'
// }