const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", newGame);
const board = {
  a1: "",
  a2: "",
  a3: "",
  b1: "",
  b2: "",
  b3: "",
  c1: "",
  c2: "",
  c3: "",
};

function Player(name, symbol) {
  return { name, symbol };
}

function CreateBoard() {
  const gameArea = document.getElementById("game");
  gameArea.innerHTML = "";
  let i = 1;
  for ([key, value] of Object.entries(board)) {
    gameArea.innerHTML += `<div id="${key}" class="field ${
      i % 2 === 0 ? "even" : "odd"
    }"></div>`;
    i++;
  }
}
function MakeMove(e) {
  const symbol = game.player1move ? "X" : "O";
  if (board[e.target.id] != "" || game.isGameOver) {
    return;
  } else {
    board[e.target.id] = symbol;
    e.target.innerText = symbol;
    checkGame();
    game.player1move = !game.player1move;
  }
}

function checkGame() {
  if (
    (board.a1 != "" && board.a1 === board.a2 && board.a2 === board.a3) ||
    (board.b1 != "" && board.b1 === board.b2 && board.b2 === board.b3) ||
    (board.c1 != "" && board.c1 === board.c2 && board.c2 === board.c3) ||
    (board.a1 != "" && board.a1 === board.b2 && board.b2 === board.c3) ||
    (board.a3 != "" && board.a3 === board.b2 && board.b2 === board.c1) ||
    (board.a1 != "" && board.a1 === board.b1 && board.b1 === board.c1) ||
    (board.a2 != "" && board.a2 === board.b2 && board.b2 === board.c2) ||
    (board.a3 != "" && board.a3 === board.b3 && board.b3 === board.c3)
  ) {
    game.isGameOver = true;
    document.getElementById("result-text").innerText = `"Game Over! ${
      game.player1move ? game.player1.name : game.player2.name
    } won!"`;
  }
}

function Game(player1, player2, isGameOver = false, player1move = true) {
  CreateBoard();
  const fields = document.querySelectorAll(".field");
  for (let field of fields) {
    field.addEventListener("click", MakeMove);
  }
  const name1 = document.getElementById("player1-name").value || "Player 1";
  const name2 = document.getElementById("player2-name").value || "Player 2";

  player1 = Player(name1, "X");
  player2 = Player(name2, "O");

  return { player1, player2, isGameOver, player1move };
}

function newGame() {
  document.getElementById("result-text").innerText = "";
  document.getElementById("game").innerHTML = "";
  for ([key, value] of Object.entries(board)) {
    board[key] = "";
  }
  game = Game();
}
let game = Game();
