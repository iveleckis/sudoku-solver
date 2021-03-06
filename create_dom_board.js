const root = document.querySelector('#root');

(() => {
    const board_dom = document.createElement('div');
    board_dom.classList.add('board');
    for (let i in board) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j in board[i]) {
            const cel = document.createElement('div');
            cel.classList.add('cel');
            if ((i + 1) % 3 === 0 && i < 7) {
                cel.classList.add('border-b');
            }
            if ((j + 1) % 3 === 0 && j < 7) {
                cel.classList.add('border-r');
            }
            if (board[i][j] !== 0) {
                cel.innerHTML = board[i][j];
                cel.classList.add('gray');
            }
            row.appendChild(cel);
        }
        board_dom.appendChild(row);
    }
    root.appendChild(board_dom);

    const start_btn = document.createElement('button');
    start_btn.addEventListener('click', () => loop_board());
    start_btn.innerHTML = 'SOLVE !';

    root.appendChild(start_btn);
})();

const dom_board = document.querySelector('.board');
