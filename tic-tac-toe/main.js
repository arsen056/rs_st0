const area = document.querySelector('.area');
let move = 0;
area.addEventListener('click', addTicTacToe)

function addTicTacToe(event) {
    if (event.target.className = 'cell') {
        if (move % 2 == 0) {
            event.target.classList.add('cross');
        } else {
            event.target.classList.add('circle');
        }
        move++;
    }
}