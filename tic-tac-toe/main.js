const area = document.querySelector('.area');
let move = 0;

area.addEventListener('click', addTicTacToe);
function addTicTacToe(event) {
    if (event.target.className = 'cell') {
        if (move % 2 == 0) {
            event.target.classList.add('cross');
        } else {
            event.target.classList.add('circle');
        }
        move++;
        check();
    }
}

function moveComputer() {}

function check() {
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
            console.log('win X')
        } else if (cells[win[i][0]].classList.contains('circle') && cells[win[i][1]].classList.contains('circle') && cells[win[i][2]].classList.contains('circle')) {
            console.log('win 0')
        } 
    }
}