export const loopBoard = (boardForSolving) => {
    const square1 = () => {
        return [
            boardForSolving[0][0],
            boardForSolving[0][1],
            boardForSolving[0][2],
            boardForSolving[1][0],
            boardForSolving[1][1],
            boardForSolving[1][2],
            boardForSolving[2][0],
            boardForSolving[2][1],
            boardForSolving[2][2],
        ];
    };

    const square2 = () => {
        return [
            boardForSolving[0][3],
            boardForSolving[0][4],
            boardForSolving[0][5],
            boardForSolving[1][3],
            boardForSolving[1][4],
            boardForSolving[1][5],
            boardForSolving[2][3],
            boardForSolving[2][4],
            boardForSolving[2][5],
        ];
    };
    const square3 = () => {
        return [
            boardForSolving[0][6],
            boardForSolving[0][7],
            boardForSolving[0][8],
            boardForSolving[1][6],
            boardForSolving[1][7],
            boardForSolving[1][8],
            boardForSolving[2][6],
            boardForSolving[2][7],
            boardForSolving[2][8],
        ];
    };

    const square4 = () => {
        return [
            boardForSolving[3][0],
            boardForSolving[3][1],
            boardForSolving[3][2],
            boardForSolving[4][0],
            boardForSolving[4][1],
            boardForSolving[4][2],
            boardForSolving[5][0],
            boardForSolving[5][1],
            boardForSolving[5][2],
        ];
    };

    const square5 = () => {
        return [
            boardForSolving[3][3],
            boardForSolving[3][4],
            boardForSolving[3][5],
            boardForSolving[4][3],
            boardForSolving[4][4],
            boardForSolving[4][5],
            boardForSolving[5][3],
            boardForSolving[5][4],
            boardForSolving[5][5],
        ];
    };
    const square6 = () => {
        return [
            boardForSolving[3][6],
            boardForSolving[3][7],
            boardForSolving[3][8],
            boardForSolving[4][6],
            boardForSolving[4][7],
            boardForSolving[4][8],
            boardForSolving[5][6],
            boardForSolving[5][7],
            boardForSolving[5][8],
        ];
    };

    const square7 = () => {
        return [
            boardForSolving[6][0],
            boardForSolving[6][1],
            boardForSolving[6][2],
            boardForSolving[7][0],
            boardForSolving[7][1],
            boardForSolving[7][2],
            boardForSolving[8][0],
            boardForSolving[8][1],
            boardForSolving[8][2],
        ];
    };

    const square8 = () => {
        return [
            boardForSolving[6][3],
            boardForSolving[6][4],
            boardForSolving[6][5],
            boardForSolving[7][3],
            boardForSolving[7][4],
            boardForSolving[7][5],
            boardForSolving[8][3],
            boardForSolving[8][4],
            boardForSolving[8][5],
        ];
    };
    const square9 = () => {
        return [
            boardForSolving[6][6],
            boardForSolving[6][7],
            boardForSolving[6][8],
            boardForSolving[7][6],
            boardForSolving[7][7],
            boardForSolving[7][8],
            boardForSolving[8][6],
            boardForSolving[8][7],
            boardForSolving[8][8],
        ];
    };
    let stepsTaken = [];
    let avoid = [];
    const tryNumbers = (x, y) => {
        let atLeastOneValid = false;
        for (let z = 1; z < 10; z++) {
            const isValid = validateNumber(z, x, y);
            const whatImLookingFor = { x, y, value: z };
            let isAvoided;

            for (let i in avoid) {
                if (
                    avoid[i].x === whatImLookingFor.x &&
                    avoid[i].y === whatImLookingFor.y &&
                    avoid[i].value === whatImLookingFor.value
                ) {
                    isAvoided = true;
                    break;
                }
            }

            if (isValid && !isAvoided) {
                atLeastOneValid = true;
                boardForSolving[y][x] = z;
                stepsTaken.push({ x, y, value: z });
                break;
            }
        }
        if (!atLeastOneValid) {
            stepBack();
            return 'no-match';
        }
    };

    const validateNumber = (number, x, y) => {
        // checking x axis
        if (boardForSolving[y].includes(number)) {
            return false;
        }
        // y axis
        for (let i in boardForSolving) {
            if (boardForSolving[i][x] === number) {
                return false;
            }
        }
        // squares
        if (x <= 2) {
            if (y <= 2) {
                return !square1().includes(number);
            }
            if (y > 2 && y <= 5) {
                return !square4().includes(number);
            }
            if (y > 5) {
                return !square7().includes(number);
            }
        }
        if (x > 2 && x <= 5) {
            if (y <= 2) {
                return !square2().includes(number);
            }
            if (y > 2 && y <= 5) {
                return !square5().includes(number);
            }
            if (y > 5) {
                return !square8().includes(number);
            }
        }
        if (x > 5) {
            if (y <= 2) {
                return !square3().includes(number);
            }
            if (y > 2 && y <= 5) {
                return !square6().includes(number);
            }
            if (y > 5) {
                return !square9().includes(number);
            }
        }
        return true;
    };

    const stepBack = () => {
        const last_step = stepsTaken[stepsTaken.length - 1];

        stepsTaken.pop();

        boardForSolving[last_step.y][last_step.x] = 0;

        avoid.push(last_step);

        avoid = avoid.filter((item) => {
            if (
                item &&
                (item.y < last_step.y ||
                    (item.y === last_step.y && item.x <= last_step.x))
            ) {
                return item;
            } else return null;
        });
    };

    let solved = false;
    while (!solved) {
        let stop;
        for (let i in boardForSolving) {
            for (let j in boardForSolving[i]) {
                if (boardForSolving[i][j] === 0) {
                    const isThereAMatch = tryNumbers(j, i);
                    if (isThereAMatch === 'no-match') {
                        stop = true;
                        break;
                    }
                }
            }
            if (stop) {
                break;
            }
        }
        if (!stop) {
            solved = true;
            return boardForSolving;
        }
    }
};
