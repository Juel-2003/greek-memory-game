const symbols = ["Α","Β","Γ","Δ","Ε","Ζ","Η","Θ"];
let cards, board, score, first, second, lock;

const scoreEl = document.getElementById("score");
const messageEl = document.getElementById("message");
const restartBtn = document.getElementById("restart");

function startGame() {
  board = document.getElementById("board");
  board.innerHTML = "";
  score = 100;
  scoreEl.innerText = score;
  messageEl.innerText = "";
  first = second = null;
  lock = false;

  cards = [...symbols, ...symbols];
  cards.sort(() => 0.5 - Math.random());

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.symbol = symbol;
    card.innerText = "?";

    card.onclick = () => handleCardClick(card);
    board.appendChild(card);
  });
}

function handleCardClick(card) {
  if (lock || card.classList.contains("flipped")) return;

  card.innerText = card.dataset.symbol;
  card.classList.add("flipped");

  if (!first) {
    first = card;
  } else {
    second = card;
    lock = true;

    if (first.dataset.symbol === second.dataset.symbol) {
      first = second = null;
      lock = false;
      checkWin();
    } else {
      score -= 4;
      scoreEl.innerText = score;

      setTimeout(() => {
        first.innerText = "?";
        second.innerText = "?";
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        first = second = null;
        lock = false;

        if (score <= 0) {
          messageEl.innerText = "Game Over! Score reached 0.";
          lock = true;
        }
      }, 800);
    }
  }
}

function checkWin() {
  if (document.querySelectorAll(".flipped").length === cards.length) {
    messageEl.innerText = "🎉 You matched all cards! Well done.";
  }
}

restartBtn.onclick = startGame;

startGame();
