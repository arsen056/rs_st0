console.log(`
    Вёрстка +10
    При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10
    Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10
    По окончанию игры выводится её результат - выигравшая фигура и количество ходов от начала игры до её завершения +10
    Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10
    Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10 - Щелчок при нажатии
    Итого 60 баллов
    `);

const area = document.querySelector('.area'),
    overlay = document.querySelector('.overlay'),
    modal = document.querySelector('.modal'),
    winnerText = document.querySelector('.modal-text'),
    reset = document.querySelector('.reset');
    resetRating = document.querySelector('.reset-rating'),
    audioX = document.querySelector('.audio-x'),
    audio0 = document.querySelector('.audio-0'),
    player = document.querySelector('.player');
    playerX = 'X';
    player0 = 'O';
let move = 0,
    countMoveX = 0,
    countMove0 = 0,
    countWinX = 0,
    countWin0 = 0,
    countGame = 0,
    winners = [];

area.addEventListener('click', addTicTacToe);
function addTicTacToe(event) {
    if (event.target.className === 'cell') {
        if (move % 2 === 0) {
            event.target.classList.add('cross');
            player.innerHTML = player0;
            countMoveX++;
            audioX.play();            
        } else {
            event.target.classList.add('circle');
            player.innerHTML = playerX; 
            countMove0++;
            audio0.play();            
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
    showRating(winners);
}

function showRating(winners) {
    const game = document.querySelector('.game');
    const winner = document.querySelector('.winner');
    const total = document.querySelector('.total');
    game.innerHTML = "<td>Игра</td>";
    winner.innerHTML = "<td>Победитель</td>";
    total.innerHTML = '';
    for (let i = winners.length - 1; i > -1; i--) {   
        if ((i + 1) === winners.length) {
            game.innerHTML += `<td>Текущая</td>`;
        } else {
            game.innerHTML += `<td>${i + 1}</td>`;
        }        
        winner.innerHTML += `<td>${winners[i]}</td>`;       
    }
    total.innerHTML = `Всего игр: ${winners.length}. Крестики победили ${countWinX} раз, нолики ${countWin0}.`;
}

resetRating.addEventListener('click', resetStat);
function resetStat() {
    closeModal();
    winners = [];
    countWinX = 0;
    countWin0 = 0; 
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
    player.innerHTML = playerX;
}

function setWinners(wins, winX, win0) {
    winners = wins;
    countWinX = winX;
    countWin0 = win0;
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
    const winX = localStorage.getItem('countWinX'),
          win0 = localStorage.getItem('countWin0');
    if (winnersStorage === null) {
        console.log('Игр не сыграно');
    } else if (winnersStorage.length === 0) {
        console.log("Игр не сыграно");
    } else {
        setWinners(winnersStorage.split(','), winX, win0);
    }

}
window.addEventListener('load', getLocalStorage);