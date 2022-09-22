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
let points = 0;

const switchPlayer = function (currentScore) {
  points = 0;
  currentScore.textContent = points;
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

const checkActive = function (player) {
  return player.classList.contains("player--active");
};

const restart = function () {
  points = 0;
  currentScore1.textContent = points;
  currentScore2.textContent = points;
  score1.textContent = points;
  score2.textContent = points;

  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  dicePic.classList.toggle("hidden");
};

const winner = function (player, score) {
  player.classList.toggle("player--winner");
  score.textContent = 100;
  dicePic.classList.toggle("hidden");
};

const scoreAdd = function (score, currentScore) {
  return Number(score.textContent) + Number(currentScore.textContent);
};

rollDice.addEventListener("click", () => {
  const randomDice = Math.trunc(Math.random() * 6 + 1);
  points += randomDice;

  dicePic.setAttribute("src", `./dice-${randomDice}.png`);
  if (randomDice === 1 && checkActive(player1)) {
    switchPlayer(currentScore1);
  } else if (randomDice === 1 && checkActive(player2)) {
    switchPlayer(currentScore2);
  } else if (checkActive(player1)) {
    currentScore1.textContent = points;
  } else {
    currentScore2.textContent = points;
  }
});

holdDice.addEventListener("click", () => {
  if (checkActive(player1) && scoreAdd(score1, currentScore1) >= 100) {
    winner(player1, score1);
  } else if (checkActive(player2) && scoreAdd(score2, currentScore2) >= 100) {
    winner(player2, score2);
  } else if (checkActive(player1)) {
    score1.textContent = scoreAdd(score1, currentScore1);
    switchPlayer(currentScore1);
  } else {
    score2.textContent = scoreAdd(score2, currentScore2);
    switchPlayer(currentScore2);
  }
});

newGame.addEventListener("click", restart);
