//mert stuk//
const fruits = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍓", "🥝", "🍍", "🍑"];

let gameCards = [...fruits, ...fruits].sort(() => Math.random() - 0.5);

let currentPlayer = 1;
let scores = { 1: 0, 2: 0 };
let flippedCards = [];
let matchedCards = [];
const board = document.getElementById("game-board");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player1Score = document.getElementById("player1-score");
const player2Score = document.getElementById("player2-score");
const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");
const resultMessage = document.getElementById("result-message");
function setupBoard() {
  board.innerHTML = "";
  gameCards.forEach((fruit, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.index = index;
    card.dataset.fruit = fruit;
    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.textContent = fruit;
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}
function flipCard(event) {
  const card = event.currentTarget;
  if (card.classList.contains("flipped") || flippedCards.length === 2) return;
  card.classList.add("flipped");
  flippedCards.push(card);
  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}
// ------------------------------------------------------------------- //

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.fruit === card2.dataset.fruit) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedCards.push(card1, card2);
    scores[currentPlayer]++;
    updateScore();
    if (matchedCards.length === gameCards.length) {
      endGame();
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }
  flippedCards = [];
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  updateTurn();
}
function updateScore() {
  player1Score.textContent = scores[1];
  player2Score.textContent = scores[2];
}
function updateTurn() {
  player1.classList.toggle("active", currentPlayer === 1);
  player2.classList.toggle("active", currentPlayer === 2);
}
function endGame() {
  overlay.style.display = "block";
  popup.style.display = "block";
  const winner =
    scores[1] > scores[2]
      ? "Speler 1"
      : scores[2] > scores[1]
      ? "Speler 2"
      : "Gelijkspel";
  resultMessage.textContent =
    winner === "Gelijkspel"
      ? "Het is een gelijkspel!"
      : `${winner} heeft gewonnen!`;

  resultMessage.style.color = "black";
}
function restartGame() {
  scores = { 1: 0, 2: 0 };
  flippedCards = [];
  matchedCards = [];
  currentPlayer = 1;
  overlay.style.display = "none";
  popup.style.display = "none";
  gameCards = [...fruits, ...fruits].sort(() => Math.random() - 0.5);
  setupBoard();
  updateScore();
  updateTurn();
}
setupBoard();
