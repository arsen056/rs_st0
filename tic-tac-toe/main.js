const area = document.querySelector('.area');
const overlay = document.querySelector('.overlay'),
    modal = document.querySelector('.modal'),
    winnerText = document.querySelector('.modal-text'),
    reset = document.querySelector('.reset');
    rating = document.querySelector('.rating');
let move = 0;
let countMoveX = 0;
let countMove0 = 0;
let countWinX = 0;
let countWin0 = 0;
let countGame = 0;
let winners = [];

area.addEventListener('click', addTicTacToe);
function addTicTacToe(event) {
    if (event.target.className === 'cell') {
        if (move % 2 === 0) {
            event.target.classList.add('cross');
            countMoveX++;
        } else {
            event.target.classList.add('circle');
            countMove0++;
        }        
        check();
        move++;        
    }
}

function check() {
    let result = 'Ничья!';
    const cells = document.querySelectorAll('.cell');
    const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < win.length; i++) {
        if (cells[win[i][0]].classList.contains('cross') && cells[win[i][1]].classList.contains('cross') && cells[win[i][2]].classList.contains('cross')) {
            result = `Победили крестики! Количетство ходов: ${countMoveX}`;
            winners.push('X');
            countWinX++;
            countGame++;
            checkCountWin(winners);
            showModal(result);
        } else if (cells[win[i][0]].classList.contains('circle') && cells[win[i][1]].classList.contains('circle') && cells[win[i][2]].classList.contains('circle')) {
            result = `Победили нолики! Количетство ходов: ${countMove0}`;
            winners.push('O');
            countWin0++;
            countGame++;
            checkCountWin(winners);
            showModal(result);           
        } else if (move === 8) {            
            winners.push('Ничья');
            checkCountWin(winners);
            showModal(result);
            break;
        }
    }        
}

function checkCountWin(winners) {
    if (winners.length > 10) {
        winners.shift();
    }
}

function showModal(winner) {    
    overlay.classList.add('overlay-open');
    modal.classList.add('modal-open');
    winnerText.innerHTML = winner;
    console.log(winners);
    showRating(winners);
}

function showRating(winners) {
    const game = document.querySelector('.game');
    const winner = document.querySelector('.winner');
    game.innerHTML = "";
    winner.innerHTML = "";
    for (let i = 0; i < winners.length; i++) {   
        game.innerHTML += `<td>${i + 1}</td>`;
        winner.innerHTML += `<td>${winners[i]}</td>`;       
    }
}

reset.addEventListener('click', closeModal);
function closeModal() {
    area.innerHTML = `
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
    `
    overlay.classList.remove('overlay-open');
    modal.classList.remove('modal-open');
    move = 0;
    countMoveX = 0;
    countMove0 = 0;
}

function setWinners(wins) {
    winners = wins;
}

function setLocalStorage() {
    localStorage.setItem('countWinX', countWinX);
    localStorage.setItem('countWin0', countWin0);
    localStorage.setItem('countGame', countGame);
    localStorage.setItem('winners', winners);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    const winnersStorage = localStorage.getItem('winners');
    if (winnersStorage === null) {
        console.log('Игр не сыграно');
    } else if (winnersStorage.length === 0) {
        console.log("Игр не сыграно");
    } else {
        setWinners(winnersStorage.split(','));
    }

}
window.addEventListener('load', getLocalStorage);