export const validateBoard = (board) => {
    const square1 = () => {
        return [
            board[0][0],
            board[0][1],
            board[0][2],
            board[1][0],
            board[1][1],
            board[1][2],
            board[2][0],
            board[2][1],
            board[2][2],
        ];
    };

    const square2 = () => {
        return [
            board[0][3],
            board[0][4],
            board[0][5],
            board[1][3],
            board[1][4],
            board[1][5],
            board[2][3],
            board[2][4],
            board[2][5],
        ];
    };
    const square3 = () => {
        return [
            board[0][6],
            board[0][7],
            board[0][8],
            board[1][6],
            board[1][7],
            board[1][8],
            board[2][6],
            board[2][7],
            board[2][8],
        ];
    };

    const square4 = () => {
        return [
            board[3][0],
            board[3][1],
            board[3][2],
            board[4][0],
            board[4][1],
            board[4][2],
            board[5][0],
            board[5][1],
            board[5][2],
        ];
    };

    const square5 = () => {
        return [
            board[3][3],
            board[3][4],
            board[3][5],
            board[4][3],
            board[4][4],
            board[4][5],
            board[5][3],
            board[5][4],
            board[5][5],
        ];
    };
    const square6 = () => {
        return [
            board[3][6],
            board[3][7],
            board[3][8],
            board[4][6],
            board[4][7],
            board[4][8],
            board[5][6],
            board[5][7],
            board[5][8],
        ];
    };

    const square7 = () => {
        return [
            board[6][0],
            board[6][1],
            board[6][2],
            board[7][0],
            board[7][1],
            board[7][2],
            board[8][0],
            board[8][1],
            board[8][2],
        ];
    };

    const square8 = () => {
        return [
            board[6][3],
            board[6][4],
            board[6][5],
            board[7][3],
            board[7][4],
            board[7][5],
            board[8][3],
            board[8][4],
            board[8][5],
        ];
    };
    const square9 = () => {
        return [
            board[6][6],
            board[6][7],
            board[6][8],
            board[7][6],
            board[7][7],
            board[7][8],
            board[8][6],
            board[8][7],
            board[8][8],
        ];
    };

    // validate all x axis
    for (let i in board) {
        const duplicates = [];
        for (let j in board[i]) {
            if (board[i][j] !== 0) {
                if (!duplicates.includes(board[i][j])) {
                    duplicates.push(board[i][j]);
                } else {
                    return false;
                }
            }
        }
    }

    // validate all y axis
    for (let z = 0; z < 9; z++) {
        const duplicates = [];
        for (let i in board) {
            if (board[i][z] !== 0) {
                if (!duplicates.includes(board[i][z])) {
                    duplicates.push(board[i][z]);
                } else {
                    return false;
                }
            }
        }
    }

    // validate all sq

    for (let i = 1; i < 10; i++) {
        if (i === 1) {
            const square = square1();
            const duplicates = [];
            for (let j in square) {
                if (square[j] !== 0) {
                    if (!duplicates.includes(square[j])) {
                        duplicates.push(square[j]);
                    } else {
                        return false;
                    }
                }
            }
        }

        if (i === 2) {
            const square = square2();
            const duplicates = [];
            for (let j in square) {
                if (square[j] !== 0) {
                    if (!duplicates.includes(square[j])) {
                        duplicates.push(square[j]);
                    } else {
                        return false;
                    }
                }
            }
        }

        if (i === 3) {
            const square = square3();
            const duplicates = [];
            for (let j in square) {
                if (square[j] !== 0) {
                    if (!duplicates.includes(square[j])) {
                        duplicates.push(square[j]);
                    } else {
                        return false;
                    }
                }
            }
        }

        if (i === 4) {
            const square = square4();
            const duplicates = [];
            for (let j in square) {
                if (square[j] !== 0) {
                    if (!duplicates.includes(square[j])) {
                        duplicates.push(square[j]);
                    } else {
                        return false;
                    }
                }
            }
        }

        if (i === 5) {
            const square = square5();
            const duplicates = [];
            for (let j in square) {
                if (square[j] !== 0) {
                    if (!duplicates.includes(square[j])) {
                        duplicates.push(square[j]);
                    } else {
                        return false;
                    }
                }
            }
        }

        if (i === 6) {
            const square = square6();
            const duplicates = [];
            for (let j in square) {
                if (square[j] !== 0) {
                    if (!duplicates.includes(square[j])) {
                        duplicates.push(square[j]);
                    } else {
                        return false;
                    }
                }
            }
        }

        if (i === 7) {
            const square = square7();
            const duplicates = [];
            for (let j in square) {
                if (square[j] !== 0) {
                    if (!duplicates.includes(square[j])) {
                        duplicates.push(square[j]);
                    } else {
                        return false;
                    }
                }
            }
        }

        if (i === 8) {
            const square = square8();
            const duplicates = [];
            for (let j in square) {
                if (square[j] !== 0) {
                    if (!duplicates.includes(square[j])) {
                        duplicates.push(square[j]);
                    } else {
                        return false;
                    }
                }
            }
        }

        if (i === 9) {
            const square = square9();
            const duplicates = [];
            for (let j in square) {
                if (square[j] !== 0) {
                    if (!duplicates.includes(square[j])) {
                        duplicates.push(square[j]);
                    } else {
                        return false;
                    }
                }
            }
        }
    }

    return true;
};
