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
};

rollDice.addEventListener("click", () => {
  const randomDice = Math.trunc(Math.random() * 6 + 1);
  points += randomDice;
  console.log(randomDice + "---thedice");
  console.log(points);
  dicePic.setAttribute("src", `./dice-${randomDice}.png`);
  if (randomDice === 1 && player1.classList.contains("player--active")) {
    switchPlayer(currentScore1);
  } else if (randomDice === 1 && player2.classList.contains("player--active")) {
    switchPlayer(currentScore2);
  } else if (player1.classList.contains("player--active")) {
    currentScore1.textContent = points;
  } else {
    currentScore2.textContent = points;
  }
});

holdDice.addEventListener("click", () => {
  if (
    player1.classList.contains("player--active") &&
    Number(score1.textContent) + Number(currentScore1.textContent) >= 100
  ) {
    player1.classList.toggle("player--winner");
    score1.textContent = 100;
  } else if (
    player2.classList.contains("player--active") &&
    Number(score2.textContent) + Number(currentScore2.textContent) >= 100
  ) {
    player2.classList.toggle("player--winner");
    score2.textContent = 100;
  } else if (player1.classList.contains("player--active")) {
    score1.textContent =
      Number(score1.textContent) + Number(currentScore1.textContent);
    switchPlayer(currentScore1);
  } else {
    score2.textContent =
      Number(score2.textContent) + Number(currentScore2.textContent);
    switchPlayer(currentScore2);
  }
});

newGame.addEventListener("click", restart);
