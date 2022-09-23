"use strict";
const rollDice = document.querySelector(".btn--roll");
const holdDice = document.querySelector(".btn--hold");
const newGame = document.querySelector(".btn--new");
const dicePic = document.querySelector(".dice");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const score1 = document.querySelector("#score--0");
const score2 = document.querySelector("#score--1");
const currentScore1 = document.querySelector("#current--0");
const currentScore2 = document.querySelector("#current--1");
let points, playStatus, activePlayer, score;

// ---- function ----
const init = function () {
  score = [0, 0];
  activePlayer = 0;
  playStatus = true;
  points = 0;
  currentScore1.textContent = points;
  currentScore2.textContent = points;
  score1.textContent = points;
  score2.textContent = points;

  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  dicePic.classList.add("hidden");
};

const switchPlayer = function () {
  points = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = points;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

const winner = function (activePlayer) {
  document.querySelector(`#score--${activePlayer}`).textContent = 100;
  let player = activePlayer === 0 ? player1 : player2;
  player.classList.toggle("player--winner");
  dicePic.classList.toggle("hidden");
  playStatus = false;
};

// ---- initialize ----
init();

// ----- rolling ----
rollDice.addEventListener("click", () => {
  if (playStatus) {
    const randomDice = Math.trunc(Math.random() * 6 + 1);
    points += randomDice;

    dicePic.setAttribute("src", `./dice-${randomDice}.png`);
    dicePic.classList.remove("hidden");

    if (randomDice === 1) {
      switchPlayer();
    } else {
      document.querySelector(`#current--${activePlayer}`).textContent = points;
    }
  }
});

// ---- holding ---
holdDice.addEventListener("click", () => {
  if (playStatus) {
    // ---- use array to save the points ----
    score[activePlayer] += points;
    if (score[activePlayer] < 100) {
      document.querySelector(`#score--${activePlayer}`).textContent =
        score[activePlayer];
      switchPlayer();
    } else {
      winner(activePlayer);
    }
  }
});

// ---- restart ----
newGame.addEventListener("click", init);
