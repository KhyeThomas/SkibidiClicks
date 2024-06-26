const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');
const playBotButton = document.getElementById('playBotButton');
const playOnlineButton = document.getElementById('playOnlineButton');
const opponentCodeInput = document.getElementById('opponentCode');
const winnerMessage = document.getElementById('winner-message');
const winnerText = document.getElementById('winner-text');
const playerCodeElement = document.getElementById('code');
const careerStatsElement = document.getElementById('stats');

let circleTurn;
let playerCode = generatePlayerCode();
let careerStats = 0;

playerCodeElement.innerText = playerCode;
careerStatsElement.innerText = careerStats;

startGame();

restartButton.addEventListener('click', startGame);
playBotButton.addEventListener('click', playBot);
playOnlineButton.addEventListener('click', playOnline);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    winnerMessage.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        winnerText.innerText = 'Draw!';
    } else {
        winnerText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
        careerStats++;
        careerStatsElement.innerText = careerStats;
    }
    winnerMessage.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function generatePlayerCode() {
    return Math.random().toString(36).substr(2, 9);
}

function playBot() {
    // Simplified bot logic: Randomly choose an empty cell
    let emptyCells = [...cellElements].filter(cell => !cell.classList.contains(X_CLASS) && !cell.classList.contains(CIRCLE_CLASS));
    if (emptyCells.length === 0) return;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(randomCell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function playOnline() {
    const opponentCode = opponentCodeInput.value;
    if (!opponentCode) {
        alert('Please enter an opponent code.');
        return;
    }
    // Placeholder for online play logic
    alert(`Playing against opponent with code: ${opponentCode}`);
}
