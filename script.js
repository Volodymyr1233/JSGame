'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const congratulationDiv = document.querySelector('.congratulations');
const congratulationText = document.querySelector('.congText');

let currentScore = 0;
let scores = [0, 0];
let activePlayer = 0;

const changeActivePlayer = function () {
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    activePlayer = activePlayer === 1 ? 0 : 1;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}

const clearCurrentScore = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
}


// Rolling dice functionality
const rollDice = function () {
    if (scores[activePlayer] < 100) {
        let diceNumber = Math.trunc(Math.random() * 6) + 1; // generate random number


        dice.src = `dice-${diceNumber}.png`; // select image for our random number
        dice.classList.remove('hidden'); // show the dice

        if (diceNumber !== 1) { // if dice !== 1 show current score and add more to it
            currentScore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        } else {
            clearCurrentScore();
            changeActivePlayer();
        }
    }
}


const holdScore = function () {
    if (scores[activePlayer] < 100) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        clearCurrentScore();

        if (scores[activePlayer] >= 100) {
            console.log('win!')
            congratulationText.textContent = `🥳 Congratulations!!! Player ${activePlayer + 1} win this game!`;
            congratulationDiv.classList.remove('hidden');
        } else {
            changeActivePlayer();
        }
    }

}

// write restart function (for new game button)

const restartGame = function () {
    currentScore = 0;
    document.querySelector(`.current-score`).textContent = currentScore;
    scores = [0, 0];
    for (let i = 0; i < 2; i++) { document.querySelector(`#score--${i}`).textContent = scores[i]; }
    activePlayer = 0;
    congratulationDiv.classList.add('hidden');
    dice.classList.add('hidden');
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

}

btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', restartGame);